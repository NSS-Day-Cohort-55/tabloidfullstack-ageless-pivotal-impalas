using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        void Add(string name);
        void Delete(int id);
        void Update(int id, string name);
    }
}