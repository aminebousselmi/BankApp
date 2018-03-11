using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface IClientRepository : IDisposable
    {
        int GetCountClientByAgence(int idAgence);
        void Save();
    }
}
