using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface IChangeRepository : IDisposable
    {
        Change AchatVenteDevise(Change c);
        double ConvertisseurDevise(double montant);
        double ConvertisseurDeviseR(double montant);
        void Save();
    }
}
