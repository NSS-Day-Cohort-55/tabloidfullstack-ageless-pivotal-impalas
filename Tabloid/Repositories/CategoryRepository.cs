using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            var conn = Connection;
            {
                conn.Open();
                {
                    var cmd = conn.CreateCommand();
                    cmd.CommandText = @"SELECT Id, Name FROM Category ORDER BY Name";
                    var reader = cmd.ExecuteReader();

                    List<Category> catList = new();
                    while (reader.Read())
                    {
                        Category cat = new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        };
                        catList.Add(cat);
                    }
                    return catList;
                }
            }
        }

        public void Add(string name) 
        {
            var conn = Connection;
            {
                conn.Open();
                {
                    var cmd = conn.CreateCommand();
                    cmd.CommandText = @"INSERT INTO
                                        Category(Name)
                                        VALUES (@Name)";
                    cmd.Parameters.AddWithValue("Name", name);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            var conn = Connection;
            {
                conn.Open();
                {
                    var cmd = conn.CreateCommand();
                    cmd.CommandText = @"DELETE FROM Category WHERE Id = @id";
                    cmd.Parameters.AddWithValue("Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(int id, string name)
        {
            var conn = Connection;
            {
                conn.Open();
                {
                    var cmd = conn.CreateCommand();
                    cmd.CommandText = @"UPDATE Category
                                        SET Name = @Name
                                        WHERE id = @Id";
                    cmd.Parameters.AddWithValue("Name", name);
                    cmd.Parameters.AddWithValue("Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
