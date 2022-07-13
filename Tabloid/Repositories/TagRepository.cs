using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration){ }

        public List<Tag> GetAllTags()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select Id,Name from Tag ORDER BY name asc";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Tag> tags = new List<Tag>();
                        while (reader.Read())
                        {
                            Tag tag = new Tag
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            };
                            tags.Add(tag);
                        }
                        return tags; ;
                    }

                }
            }


        }


        public void Add(Tag tag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT Into Tag(Name)
	                   OUTPUT INSERTED.ID values(@Name)";
                    DbUtils.AddParameter(cmd, "@name", tag.Name);

                    tag.Id = (int)cmd.ExecuteScalar();
                };

            }
        }




        public Tag GetTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name 
                                        FROM tag
                                        WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Tag tag = null;
                        if (reader.Read())
                        {
                            tag = new Tag()
                            {
                                Id = id,
                                Name = DbUtils.GetString(reader, "Name"),
                            };
                        }
                        return tag;
                    }
                }


            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Delete from Tag Where id=@id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}