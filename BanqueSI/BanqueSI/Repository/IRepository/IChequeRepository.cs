using BanqueSI.Model.DTO;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface IChequeRepository : IDisposable
    {
        Cheque VersementCheque(PaymentCheckDTO c);
        List<Cheque> GetListCheckByEmploye(int idEmploye);
        Cheque GetCheque(int idC);
        StatisticalCheckOperations GetStatisticalCheckOperationsByEmploye(int idEmploye);
        List<List<StatisticalLineCheckDTO>> GetStatisticalLineCheckByEmploye(int idEmploye);
        void Save();
    }
}
