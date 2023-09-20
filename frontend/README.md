##　必要な API

### GET

- ログイン中ユーザーのフォルダ一覧：subordinates/
- 選択したフォルダ内のファイル覧：folders/?type=received
- 選択したファイル内の todo 一覧：task/folder_id=<folder_id>
- 選択した todo：task/<task_id>

### POST

- フォルダ作成：
- ファイル作成：folders/
- todo 作成：task/

### PATCH

- フォルダ名修正：
- ファイル名修正：
- todo 名修正：
- todo の中身修正：
- todo の status 変更：task/<task_id>

### DELETE

- フォルダ削除
- ファイル削除
- todo 削除
