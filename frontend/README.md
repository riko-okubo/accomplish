##　必要な API

### GET

- ログイン中ユーザーのフォルダ一覧：folders/?type=received
- 選択したファイル内の task 一覧：task/folder_id=<folder_id>
- 選択した task：task/<task_id>

### POST

- フォルダ作成：folders/
- task 作成：task/

### PATCH

- フォルダ名修正：
- task 名修正：
- task の中身修正：
- task の status 変更：task/<task_id>

### DELETE

- フォルダ削除
- task 削除
