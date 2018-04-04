using BanqueSI.Model.DTO;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;

namespace BanqueSI.Repository.IRepository
{
    public interface IChequeRepository : IDisposable
    {
        Cheque VersementCheque(PaymentCheckDTO c);
        List<PaymentCheckDTO> GetListCheckByEmploye(int idEmploye);
        StatisticalCheckOperationsDTO GetStatisticalCheckOperationsByEmploye(int idEmploye);
        List<List<StatisticalLineCheckDTO>> GetStatisticalLineCheckByEmploye(int idEmploye);
        void Save();
    }
}
