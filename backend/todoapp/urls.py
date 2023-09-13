from django.urls import path
from .views import signup_view, signin_view, signout_view
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, FolderViewSet, check_token

router = DefaultRouter()
router.register(r"task", TaskViewSet)
router.register(r"folders", FolderViewSet)

urlpatterns = [
    path("signup/", signup_view, name="signup"),
    path("signin/", signin_view, name="signin"),
    path("signout/", signout_view, name="signout"),
    path("check_token/", check_token, name="check_token"),
] + router.urls
