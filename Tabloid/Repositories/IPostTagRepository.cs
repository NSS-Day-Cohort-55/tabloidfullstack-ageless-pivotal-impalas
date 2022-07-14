using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        List<Tag> GetAllTagsByPostId(int id);
        void Add(PostTag pt);
        bool CheckIfExists(PostTag pt);
    }
}