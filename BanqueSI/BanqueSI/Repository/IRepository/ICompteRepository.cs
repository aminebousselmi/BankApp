using BanqueSI.DTO;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface ICompteRepository : IDisposable
    {
        //-- DAO
        Compte SaveCompte(Compte cp);
        Compte GetCompte(String code);
        int GetCountAccountByAgency(int idAgence);
        void Save();
    }
}
