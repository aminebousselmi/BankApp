using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface IChequeRepository : IDisposable
    {
        Cheque VersementCheque(Cheque c);
        Cheque GetCheque(int idC);
        void Save();
    }
}
