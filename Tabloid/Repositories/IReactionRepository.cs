using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface IReactionRepository
    {
        List<Reaction> GetAll();
        void Add(Reaction reaction);
    }
}