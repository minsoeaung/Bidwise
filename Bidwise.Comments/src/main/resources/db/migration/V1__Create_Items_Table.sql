CREATE TABLE Comments (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    ItemId INT NOT NULL,
    UserId INT NOT NULL,
    UserName VARCHAR(255) NOT NULL,
    CommentText TEXT NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL
)

CREATE INDEX IX_Comments_ItemId_UserId ON Comments (ItemId, UserId);