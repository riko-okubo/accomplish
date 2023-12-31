from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Comment, CustomUser, Emotion, Folder, Position, Relation, Task
from .serializers import (
    CommentSerializer,
    EmotionSerializer,
    FolderSerializer,
    LoginSerializer,
    RelationSerializer,
    SignUpSerializer,
    TaskSerializer,
    UserInfoSerializer,
    RelationCreateSerializer,
)


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def signup_view(request):
    if request.method == "GET":
        return Response({"message": "Signup page"}, status=status.HTTP_200_OK)
    elif request.method == "POST":
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data["password"])
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query_type = self.request.query_params.get("type", None)
        status = self.request.query_params.get("status", None)
        receiver_id = self.request.query_params.get("receiver_id", None)
        queryset = Folder.objects.all()
        if status:
            queryset = queryset.filter(status=status)
        if query_type == "received":
            queryset = queryset.filter(receiver_id=self.request.user).order_by(
                "-created_at"
            )
        elif query_type == "sent":
            queryset = queryset.filter(sender_id=self.request.user).order_by(
                "-created_at"
            )
        if receiver_id:
            queryset = queryset.filter(sender_id=self.request.user).filter(
                receiver_id=receiver_id
            )
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = FolderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        folder = serializer.save(sender_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get_queryset(self):
        # リクエストパラメータで指定したタスクのコメントのみ返す。
        task_id = self.request.query_params.get("task_id")
        queryset = Comment.objects.filter(task_id=task_id).order_by("-created_at")
        return queryset

    def create(self, request, *args, **kwargs):
        # user が指定したタスクにコメントを残す。
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save(sender_id=request.user)
        self.request.user.count_comment += 1
        self.request.user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EmotionViewSet(viewsets.ModelViewSet):
    queryset = Emotion.objects.all()
    serializer_class = EmotionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        task_id = self.request.query_params.get("task_id", None)
        queryset = Emotion.objects.none()
        if task_id:
            queryset = Emotion.objects.filter(task_id=task_id)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = EmotionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        emotion = serializer.save(sender_id=request.user)
        self.request.user.count_emotions += 1
        self.request.user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sender_id = self.request.query_params.get("sent", None)
        receiver_id = self.request.query_params.get("received", None)
        folder_id = self.request.query_params.get("folder_id", None)
        status = self.request.query_params.get("status", None)
        queryset = Task.objects.all()
        if sender_id:
            if sender_id == "me":
                queryset = queryset.filter(sender_id=self.request.user)
            else:
                queryset = queryset.filter(sender_id=sender_id)
        if receiver_id:
            if receiver_id == "me":
                queryset = queryset.filter(receiver_id=self.request.user)
            else:
                queryset = queryset.filter(receiver_id=receiver_id)
        if folder_id:
            queryset = queryset.filter(folder_id=folder_id)
        if status:
            queryset = queryset.filter(status=status)
        queryset = queryset.order_by("-created_at")
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        task = serializer.save(sender_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def signin_view(request):
    serializer = LoginSerializer(data=request.data)
    is_valid = serializer.is_valid(raise_exception=True)
    email = serializer.validated_data.get("email")
    password = serializer.validated_data.get("password")
    user = authenticate(request, email=email, password=password)
    if user is None:
        return JsonResponse(
            data={"msg": "either email or password is incorrect"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    else:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)

        return JsonResponse(
            data={"url": "redirect to succcess page", "token": token.key},
            status=status.HTTP_200_OK,
        )


@permission_classes([AllowAny])
def signout_view(request):
    logout(request)
    return JsonResponse(
        data={"role": "none"},
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_subordinates(request):
    subordinate_ids = Relation.objects.filter(boss_id=request.user).values_list(
        "subordinate_id", flat=True
    )
    subordinates = CustomUser.objects.filter(id__in=subordinate_ids)

    serializer = RelationSerializer(subordinates, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def check_token(request):
    user = request.user
    user_serializer = UserInfoSerializer(user)
    return Response(user_serializer.data, status=status.HTTP_200_OK)


# relation に関する API の viewset
class RelationViewSet(viewsets.ModelViewSet):
    queryset = Relation.objects.all()
    serializer_class = RelationCreateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = RelationCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        relation = serializer.save(boss_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
