using BanqueSI.Model.DTO;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface IChangeRepository : IDisposable
    {
        Change AchatVenteDevise(ChangeDTO c);
        List<ChangeDTO> GetListChangesByEmploye(int idEmploye);
        List<ChangeDetailedStatDTO> GetDetailedStatisticalChartByIdEmploye(int idEmploye);
        TotalBuySellDTO TotalBuySellDeviseByEmploye(int idEmploye);
        void Save();
    }
}
