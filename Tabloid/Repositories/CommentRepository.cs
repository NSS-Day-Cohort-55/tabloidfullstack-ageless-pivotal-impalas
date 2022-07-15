using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetAllPostComments(int postId)
        {
            var conn = Connection;
            {
                conn.Open();
                {
                    var cmd = conn.CreateCommand();
                    cmd.CommandText = @"SELECT Comment.Id, PostId, UserProfileId, UserProfile.DisplayName as CommenterName, Subject, Content, Comment.CreateDateTime as CommentDate
FROM Comment JOIN UserProfile on Comment.UserProfileId = UserProfile.Id
WHERE PostId = @id";
                    cmd.Parameters.AddWithValue("id", postId);
                    var reader = cmd.ExecuteReader();

                    List<Comment> commentList = new();
                    while (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Commenter = new()
                            {
                                DisplayName = reader.GetString(reader.GetOrdinal("CommenterName"))
                            },
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CommentDate")),
                        };

                        commentList.Add(comment);
                    }
                    return commentList;
                }
            }
        }


    }
}
