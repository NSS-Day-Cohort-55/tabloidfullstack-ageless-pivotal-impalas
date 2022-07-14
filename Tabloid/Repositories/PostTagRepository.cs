using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAllTagsByPostId(int id)
        {
            var conn = Connection;
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"select name from PostTag join tag on TagId = tag.id where PostId = @id";
                    cmd.Parameters.AddWithValue("id", id);
                    var reader = cmd.ExecuteReader();
                    var tags = new List<Tag>();
                    while (reader.Read())
                    {
                        Tag tag = new()
                        {
                            Name = reader.GetString(reader.GetOrdinal("name"))
                        };
                        tags.Add(tag);
                    }
                    return tags;
                }
            }
        }

        public void Add(PostTag pt)
        {
            var conn = Connection;
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"INSERT INTO PostTag(PostId, TagId) VALUES (@postId, @tagId)";
                    cmd.Parameters.AddWithValue("postId", pt.PostId);
                    cmd.Parameters.AddWithValue("tagId", pt.TagId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public bool CheckIfExists(PostTag pt)
        {
            var conn = Connection;
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT COUNT(1) as PtCount from posttag where PostId = @postId and TagId = @tagId";
                    cmd.Parameters.AddWithValue("postId", pt.PostId);
                    cmd.Parameters.AddWithValue("tagId", pt.TagId);

                    int count = (int)cmd.ExecuteScalar();

                    if (count > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }
    }
}
