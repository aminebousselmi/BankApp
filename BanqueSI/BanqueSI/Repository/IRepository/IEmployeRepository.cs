using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface IEmployeRepository : IDisposable
    {
        Personne SaveEmploye(Employe e);
        List<Employe> ListEmploye();
        Employe GetEmployeByUsername(String username);
        void Save();
    }
}
