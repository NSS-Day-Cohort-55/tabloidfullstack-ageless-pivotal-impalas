using System.Collections.Generic;
using Tabloid.Models;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();

        void Add(Tag tag);
        Tag GetTagById(int id);

        void Delete(int id);
        List<Post> GetAllPostsByTag(int tagId);
    }
}