using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.DTO;
using BanqueSI.Model;
using BanqueSI.Model.Entities;

namespace BanqueSI.Repository
{
    //-- BUSINESS LOGIC OPERATION
    public class OperationRepository : IDisposable, IRepository.IOperationRepository
    {
        //-- ATTRIBUTS
        private STBDbContext _context;
        private bool disposed = false;
        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public OperationRepository(STBDbContext _context)
        {
            this._context = _context;
        }
        //--END CONSTRUCTOR

        //-- METHODES

        //-- WITHDRAWAL OPERATION
        public Operation Retirer(string code, double montant, int codeEmp)
        {

            if (code == null || montant == 0 || codeEmp == 0)
            {
                throw new NullReferenceException("AMOUNT EMPTY");
            }

            if(_context.Comptes.Find(code).CodeCompte == null)
            {
                throw new NullReferenceException("ACCOUNT NOT FOUND");
            }

            //-- LOADING ACCOUNT FROM DATABASE
            Compte cp = _context.Comptes.Find(code);
            //-- END LOADING ACCOUNT FROM DATABASE

            Operation operation = new Operation();

            if(_context.Employes.Find(codeEmp).CodePersonne == 0)
            {
                throw new NullReferenceException("EMPLOYE NOT FOUND");
            }

            //-- LOADING EMPLOYE FROM DATABASE
            Employe employe = _context.Employes.Find(codeEmp);
            //-- END LOADING DATABASE FROM DATABASE

            //-- EXCEPTION
            if (cp.Solde < montant)
            {
                throw new NullReferenceException("You Must Withdrawal an amount inferior than "+cp.Solde);
            }
            //-- END EXCEPTION

            //-- RECEIVING OPERATION DATA
            operation.Compte = cp;
            operation.DateOperation = DateTime.Now;
            operation.Employe = employe;
            operation.Montant = montant;
            operation.TypeO = OperationType.R;
            cp.Solde -= montant;
            //-- END RECEIVING OPERATION DATA

            //-- ADDING DATA IN DATABASE
            if(operation == null)
            {
                throw new NullReferenceException("OPERATION NOT ADD");
            }
            _context.Operations.Add(operation);
            //-- END ADDING DATA IN DATABASE

            //-- COMMITING
            Save();
            //-- END COMMITING
            
            return operation;
        }
        //-- END WITHDRAWAL OPERATION

        //-- PAYMENT OPERATION
        public Operation Verser(string code, double montant, int codeEmp)
        {
            //-- EXCEPTION 
            if (code == null || montant == 0 || codeEmp == 0)
            {
                throw new NullReferenceException("AMOUNT EMPTY");
            }

            if (_context.Comptes.Find(code).CodeCompte == null)
            {
                throw new NullReferenceException("ACCOUNT NOT FOUND");
            }
            //-- END EXCEPTION 

            //-- GET ACCOUNT BY CODE
            Compte cp = _context.Comptes.Find(code);
            //-- END GET ACCOUNT BY CODE
            Operation operation = new Operation();

            //-- EXCEPTION 
            if (_context.Employes.Find(codeEmp).CodePersonne == 0)
            {
                throw new NullReferenceException("EMPLOYE NOT FOUND");
            }
            //-- END EXCEPTION

            //-- GET EMPLOYE BY ID
            Employe employe = _context.Employes.Find(codeEmp);
            //-- END GET EMPLOYE BY ID

            //-- PUTTING DATA
            operation.Compte = cp;
            operation.DateOperation = DateTime.Now;
            operation.Employe = employe;
            operation.Montant = montant;
            operation.TypeO = OperationType.V;
            cp.Solde += montant;

            //-- EXCEPTION 
            if (operation == null)
            {
                throw new NullReferenceException("ERROR WHILE LOADING DATA");
            }
            //-- END EXCEPTION 

            _context.Operations.Add(operation);
            //-- END PUTTING DATA
            
            //-- COMMIT
            Save();
            //-- END COMMIT

            return operation;
        }
        //-- END PAYMENT OPERATION

        //-- TRANSFER OPERATION
        public Operation Virement(string cp1, string cp2, double montant, int codeEmp)
        {
            //-- EXCEPTION
            if(cp1 == null || cp2 == null ||montant == 0 ||codeEmp == 0)
            {
                throw new NullReferenceException("ACCOUNT OR AMOUNT EMPTY");
            }

            Operation operation = new Operation();

            if (_context.Comptes.Find(cp1).CodeCompte == null)
            {
                throw new NullReferenceException("ACCOUNT NOT FOUND");
            }
            //-- END EXCEPTION

            //-- GETTING DATA 
            Compte compte1 = _context.Comptes.Find(cp1);
            //-- END GETTING DATA
            compte1.Solde -= montant;
            //-- EXCEPTION
            if (_context.Comptes.Find(cp2).CodeCompte == null)
            {
                throw new NullReferenceException("ACCOUNT NOT FOUND");
            }
            //-- END EXCEPTION

            //-- GETTING DATA
            Compte compte2 = _context.Comptes.Find(cp2);
            //-- END GETTING DATA
            compte2.Solde += montant;

            //-- EXCEPTION
            if(_context.Employes.Find(codeEmp).CodePersonne == 0)
            {
                throw new NullReferenceException("EMPLOYE NOT FOUND");
            }
            if (compte1.Solde < montant)
            {
                throw new NullReferenceException("You Must Tranfer an amount inferior than " + compte1.Solde);
            }
            //-- END EXCEPTION

            //-- GETTING DATA
            Employe employe = _context.Employes.Find(codeEmp);
            //-- END GETTING DATA

            //-- LOADING DATA
            operation.Compte = compte1;
            operation.DateOperation = DateTime.Now;
            operation.Employe = employe;
            operation.Montant = montant;
            operation.TypeO = OperationType.VI;
            //-- END LOADING DATA

            //--  EXCEPTION
            if (operation == null)
            {
                throw new NullReferenceException("OPERATION NOT FOUND");
            }
            //-- END EXCEPTION

            //-- PUTTING DATA IN DATABASE
            _context.Operations.Add(operation);
            //-- END PUTTING DATA IN DATABASE
            
            //-- COMMIT
            Save();
            //-- END COMMIT
            return operation;
        }
        //-- END TRANSFER OPERATION

        //-- GET COUNT PAYMENT BY ID EMPLOYE //
        public int GetCountVersementByEmploye(int codeEmploye)
        {
            //-- EXCEPTION
            if (codeEmploye == 0)
            {
                throw new NullReferenceException("EMPLOYE ID NOT FOUND");
            }

            if (_context.Operations.Where(x => x.Employe.CodePersonne == codeEmploye && x.TypeO == OperationType.V).ToList().Count == 0)
            {
                throw new NullReferenceException("No Payment Operation Found");
            }
            //-- END EXCEPTION

            //-- GETTING COUNT VERSEMENTS FROM DATABASE
            List<Operation> countVersements  = _context.Operations.Where(x => x.Employe.CodePersonne == codeEmploye && x.TypeO == OperationType.V).ToList();
            //-- END GETTING COUNT VERSEMENTS FROM DATABASE

            return countVersements.Count;
        }
        //-- END GET COUNT PAYMENT BY ID EMPLOYE //

        //-- GET COUNT WITHDRAWAL BY ID EMPLOYE //
        public int GetCountRetraitByEmploye(int codeEmploye)
        {
            //-- EXCEPTION
            if (codeEmploye == 0)
            {
                throw new NullReferenceException("EMPLOYE ID NOT FOUND");
            }

            if (_context.Operations.Where(x => x.Employe.CodePersonne == codeEmploye && x.TypeO == OperationType.R).ToList().Count == 0)
            {
                throw new NullReferenceException("No Withdrawal Operation Found");
            }
            //-- END EXCEPTION

            //-- GETTING COUNT RETRAIT FROM DATABASE
            List<Operation> countVersements = _context.Operations.Where(x => x.Employe.CodePersonne == codeEmploye && x.TypeO == OperationType.R).ToList();
            //-- END GETTING COUNT RETRAIT FROM DATABASE

            return countVersements.Count;
        }
        //-- END GET COUNT WITHDRAWAL BY ID EMPLOYE //

        //-- GET COUNT OPERATIONS BY ID EMPLOYE //
        public int GetCountOperationsByEmploye(int codeEmploye)
        {
            //-- EXCEPTION
            if (codeEmploye == 0)
            {
                throw new NullReferenceException("EMPLOYE ID NOT FOUND");
            }

            if (_context.Operations.Where(o => o.Employe.CodePersonne == codeEmploye).Cast<Operation>().ToList().Count == 0)
            {
                throw new NullReferenceException("No Operations Found");
            }
            //-- END EXCEPTION

            //-- GETTING COUNT OPERATIONS FROM DATABASE
            List<Operation> operations = _context.Operations.Where(o => o.Employe.CodePersonne== codeEmploye).Cast<Operation>().ToList();
            //- END GETTING COUNT OPERATIONS FROM DATABASE

            return operations.Count;
        }
        //-- END GET COUNT OPERATIONS BY ID EMPLOYE //

        //-- Get Count Transfer By Employe
        public int GetCountTransferByEmploye(int codeEmploye)
        {
            //-- EXCEPTION
            if (codeEmploye == 0)
            {
                throw new NullReferenceException("EMPLOYE ID NOT FOUND");
            }
            if (_context.Operations.Where(o => o.Employe.CodePersonne == codeEmploye && o.TypeO == OperationType.VI).Cast<Operation>().ToList().Count == 0)
            {
                throw new NullReferenceException("NO EMPLOYE WITH THIS ID WAS FOUND");
            }
            //-- END EXCEPTION

            //-- GETTING COUNT TRANSFER FROM DATABSE
            List<Operation> operations = _context.Operations.Where(o => o.Employe.CodePersonne== codeEmploye && o.TypeO == OperationType.VI).Cast<Operation>().ToList();
            //-- END GETTING COUNT TRANSFER FROM DATABSE

            return operations.Count;
        }
        //-- END Get Count Transfer By Employe

        //-- GET LATEST TRANSFER BY ID EMPLOYE //
        public double GetLatestTransactionByEmploye(int codeEmploye)
        {
            //-- EXCEPTION
            if (codeEmploye == 0)
            {
                throw new NullReferenceException("EMPLOYE ID NOT FOUND");
            }

            if(_context.Operations.Where(x => x.Employe.CodePersonne == codeEmploye && x.TypeO == OperationType.VI).OrderByDescending(x => x.DateOperation).FirstOrDefault().Montant == 0)
            {
                throw new NullReferenceException("No Transaction Was Found");
            }
            //-- END EXCEPTION

            return _context.Operations.Where(x => x.Employe.CodePersonne== codeEmploye && x.TypeO == OperationType.VI ).OrderByDescending(x => x.DateOperation).FirstOrDefault().Montant;
        }
        //-- GET LATEST TRANSFER BY ID EMPLOYE //

        //-- GET COUNT ACTIVE ACCOUNT BY ID EMPLOYE //
        public int GetCountActiveAccount()
        {
            //-- LOCAL ATTRIBUTS
            int CountActiveAccount = 0;
            int CountNombreOperation = 0;
            List<int> CountNumberOperations = new List<int>();
            //-- END LOCAL ATTRIBUTS

            //-- FETCHING ACCOUNT
            foreach (Compte compte in _context.Comptes.ToList())
            {
                CountNombreOperation = 0;
                //-- FETCHING OPERATIONS
                foreach (Operation operation in _context.Operations.ToList())
                {
                    if (compte.CodeCompte == operation.Compte.CodeCompte)
                    {       
                        CountNombreOperation += 1;
                    }
                }
                CountNumberOperations.Add(CountNombreOperation);
                
            }

            for (int i = 0 ; i< CountNumberOperations.Count; i++)
            {
                if(CountNumberOperations[i] >= 10)
                {
                    CountActiveAccount += 1; 
                }
            }

            //-- EXCEPTION
            if (CountActiveAccount == 0)
            {
                throw new NullReferenceException("No Active Account Was Found");
            }
            //-- END EXCEPTION

            return CountActiveAccount;
        }
        //-- END GET COUNT ACTIVE ACCOUNT BY ID EMPLOYE //

        //-- GET ALL OPERATIONS //
        public IEnumerable<Operation> GetOperations()
        {
            //-- EXCEPTION
            if (_context.Operations.ToList<Operation>().Count == 0)
            {
                throw new NullReferenceException("No Operation WAS FOUND");
            }
            //-- END EXCEPTION

            return _context.Operations.ToList<Operation>();
        }
        //-- END GET ALL OPERATIONS //

        //-- GETTING OPERATIONS BY EMPLOYE //
        public List<Operation> GetOperationsByEmploye(int codeEmploye)
        {
            //-- EXCEPTION
            if (codeEmploye == 0)
            {
                throw new NullReferenceException("Invalid Employe");
            }
            if(_context.Operations.Where(u => u.Employe.CodePersonne == codeEmploye).ToList<Operation>().Count == 0)
            {
                throw new NullReferenceException("No Operation Was Found");
            }
            //-- END EXCEPTION

            return _context.Operations
                .Where(u => u.Employe.CodePersonne == codeEmploye)
                .ToList<Operation>();
        }
        //-- END GETTING OPERATIONS BY EMPLOYE

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        //-- COMITTING
        public void Save()
        {
            _context.SaveChanges();
        }
        //-- END COMITTING

        //-- END METHODES
    }
}
