using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface IAgenceRepository : IDisposable
    {
        Agence SaveAgence(Agence a);
        Agence GetAgence(int codeAgence);
        void Save();
    }
}
