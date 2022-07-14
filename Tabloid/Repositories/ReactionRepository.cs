using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Reaction> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, ImageLocation
                                        FROM Reaction";

                    var reader = cmd.ExecuteReader();
                    List<Reaction> reactions = new List<Reaction>();
                    while (reader.Read())
                    {
                        var reaction = new Reaction
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                        };
                        reactions.Add(reaction);
                    }
                    reader.Close();
                    return reactions;
                }
            }
        }


        public void Add(Reaction reaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Reaction (Name, ImageLocation)
                                        OUTPUT INSERTED.ID
                                        Values (@name, @imageLocation)";
                    DbUtils.AddParameter(cmd, "@name", reaction.Name);
                    DbUtils.AddParameter(cmd, "@imageLocation", reaction.ImageLocation);

                    reaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
