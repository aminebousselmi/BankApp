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
        Operation Verser(String code, double montant, int codeEmp);
        Operation Retirer(String code, double montant, int codeEmp);
        Operation Virement(String cp1, String cp2, double montant, int codeEmp);
        //-- END OPERATIONS FUNCTIONS

        //-- ANALYTIC FUNCTIONS
        IEnumerable<Operation> GetOperations();
        int GetCountOperationsByEmploye(int codeEmploye);
        int GetCountTransferByEmploye(int codeEmploye);
        double GetLatestTransactionByEmploye(int codeEmploye);
        int GetCountActiveAccount();
        int GetCountVersementByEmploye(int codeEmploye);
        int GetCountRetraitByEmploye(int codeEmploye);
        List<Operation> GetOperationsByEmploye(int codeEmploye);
        //-- END ANALYTIC FUNCTIONS

        //-- COMMITING FUNCTION
        void Save();
        //-- END COMMITING FUNCTION
    }
}
