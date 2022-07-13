using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();

        void Add(Tag tag);
        Tag GetTagById(int id);

        void Delete(int id);
    }
}