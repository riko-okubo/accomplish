```mermaid
erDiagram
    User ||--o{Folder: "user_id"

    User ||--o{Task: "user_id"
    Folder ||--o{Task: "folder_id"

    User {
        Char name
        Password password
        Email email
        DateTime date_joined
    }

    Folder {
        ForeignKey user_id
        Char title
        Text vision
        Enum status
        DateTime created_at
        DateTime updated_at
        DateTime finished_at
    }

    Task {
        ForeignKey user_id
        ForeignKey folder_id
        Char title
        Text content
        Text memo
        Enum status
        DateTime deadline
        DateTime created_at
        DateTime updated_at
        DateTime finished_at
    }
```
