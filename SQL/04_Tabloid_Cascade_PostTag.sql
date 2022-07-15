﻿ALTER TABLE PostTag
DROP CONSTRAINT FK_PostTag_Post;

ALTER TABLE PostTag
ADD CONSTRAINT FK_PostTag_Post
FOREIGN KEY (PostId)
REFERENCES Post(Id)
ON DELETE CASCADE;