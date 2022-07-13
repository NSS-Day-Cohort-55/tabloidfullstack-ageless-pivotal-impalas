using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        void Edit(Post post);
        List<Post> GetAll();
        Post GetById(int id);
        List<Post> GetAllByUserId(int id);
    }
}