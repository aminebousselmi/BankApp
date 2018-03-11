using BanqueSI.DTO;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface IOperationRepository : IDisposable
    {
        //-- OPERATIONS FUNCTIONS
        Operation Verser(String code, double montant, String codeEmp);
        Operation Retirer(String code, double montant, String codeEmp);
        Operation Virement(String cp1, String cp2, double montant, String codeEmp);
        //-- END OPERATIONS FUNCTIONS

        //-- ANALYTIC FUNCTIONS
        IEnumerable<Operation> GetOperations();
        int GetCountOperationsByEmploye(String codeEmploye);
        int GetCountTransferByEmploye(String codeEmploye);
        double GetLatestTransactionByEmploye(String codeEmploye);
        int GetCountActiveAccount();
        int GetCountVersementByEmploye(String codeEmploye);
        int GetCountRetraitByEmploye(String codeEmploye);
        List<Operation> GetOperationsByEmploye(String codeEmploye);
        //-- END ANALYTIC FUNCTIONS

        //-- COMMITING FUNCTION
        void Save();
        //-- END COMMITING FUNCTION
    }
}
