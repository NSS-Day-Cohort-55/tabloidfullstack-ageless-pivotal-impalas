using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }


        //Gets the all posts which are approved, and which were published before today.
        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, Title, Content, p.ImageLocation, 
                                               p.CreateDateTime, PublishDateTime, IsApproved, 
                                               CategoryId, UserProfileId, up.DisplayName,
                                               c.Name AS CategoryName
                                          FROM Post p
                                     LEFT JOIN Userprofile up ON p.UserProfileId = up.Id
                                     LEFT JOIN Category c on p.CategoryId = c.Id
                                         WHERE IsApproved = 'TRUE'
                                           AND PublishDateTime < GETDATE()
                                      ORDER BY PublishDateTime DESC";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var posts = new List<Post>();
                        while (reader.Read())
                        {
                            posts.Add(new Post()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "Content"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                Category = new Category()
                                {
                                    Name = DbUtils.GetString(reader, "CategoryName")
                                }
                            });
                        }
                        return posts;
                    }
                }
            }
        }

        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, Title, Content, p.ImageLocation, 
                                               p.CreateDateTime, PublishDateTime, IsApproved, 
                                               CategoryId, UserProfileId, up.DisplayName, c.Name AS CategoryName
                                          FROM Post p
                                     LEFT JOIN Userprofile up ON p.UserProfileId = up.Id
                                     LEFT JOIN Category c on p.CategoryId = c.Id
                                         WHERE p.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    Post post = null;
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "CategoryName")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }

                        };
                    }
                    return post;
                }
            }
        }

        public void AddPostReaction(PostReaction postReaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostReaction (PostId, ReactionId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@postId, @reactionId, @userProfileId)";
                    DbUtils.AddParameter(cmd, "@postId", postReaction.PostId);
                    DbUtils.AddParameter(cmd, "@reactionId", postReaction.ReactionId);
                    DbUtils.AddParameter(cmd, "@userProfileId", postReaction.UserProfileId);

                    postReaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public List<PostReaction> GetPostReactions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, ReactionId, PostId, UserProfileId 
                                        FROM PostReaction";
                    var reader = cmd.ExecuteReader();
                    List<PostReaction> postReactions = new List<PostReaction>();
                    while (reader.Read())
                    {
                        PostReaction postReaction = new PostReaction
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            ReactionId = DbUtils.GetInt(reader, "ReactionId"),
                            PostId = DbUtils.GetInt(reader, "PostId")
                        };
                        postReactions.Add(postReaction);
                    }
                    conn.Close();
                    return postReactions;
                }
            }
        }


        public List<Post> GetAllByUserId(int id)
        {
            var conn = Connection;
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT Post.Id, Title, Content, ImageLocation, CreateDateTime, 
                                        PublishDateTime, IsApproved, CategoryId, UserProfileId, Name
                                        FROM Post
                                        JOIN Category on Post.CategoryId = Category.Id
                                        WHERE UserProfileId = 1";
                    cmd.Parameters.AddWithValue("Id", id);
                    var reader = cmd.ExecuteReader();

                    List<Post> postList = new();
                    while (reader.Read())
                    {
                        Post post = new()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),

                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDatetime")),
                            IsApproved = true,
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            }
                        };

                        postList.Add(post);
                    }
                    return postList;
                }
            }
        }
        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Post (Title, Content, ImageLocation, 
                                                          CreateDateTime, PublishDateTime, IsApproved,
                                                          CategoryId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@title, @content, @imagelocation, @createDateTime, @publishDateTime,
                                                @isApproved, @categoryId, @userProfileId)";
                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@content", post.Content);
                    DbUtils.AddParameter(cmd, "@imagelocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@createDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@publishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@isApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@userProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Post post)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
