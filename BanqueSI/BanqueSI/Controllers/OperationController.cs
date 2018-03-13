using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.DTO;
using BanqueSI.Model.DTO;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BanqueSI.Controllers
{
    //[RequireHttps]
    //-- API CONTROLLER OPERATION
    public class OperationController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly IOperationRepository _operationRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public OperationController(IOperationRepository _operationRepository)
        {
            //-- DEPENDENCY INJECTION
            this._operationRepository = _operationRepository;
            //-- END DEPENDENCY INJECTION
        }
        //-- END CONSTRUCTOR

        //-- APIS

        //-- NORMAL OPERATIONS APIS

        //-- PAYMENT OPERATION API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/Verser/{code}/{montant}/{codeEmp}")]
        public OperationDTO Verser(String code, double montant, int codeEmp)
        {
            //-- INSTANSIATION
            OperationDTO operationDTO = new OperationDTO();
            //-- END INSTANSIATION
            try
            {
                //-- GETTING DATA
                Operation operation = _operationRepository.Verser(code, montant, codeEmp);
                //-- END GETTING DATA

                //-- TRANSFER DATA TO DTO 
                operationDTO.NumeroOperation = operation.NumeroOperation;
                operationDTO.Montant = operation.Montant;
                operationDTO.TypeO = operation.TypeO;
                operationDTO.DateOperation = operation.DateOperation;
                operationDTO.MessageResult = "Operation Payment successfully";
                //-- END TRANSFER DATA TO DTO
            }
            catch (NullReferenceException Exception)
            {
                operationDTO.MessageResult = Exception.Message;
            }

            return operationDTO;
        }
        //-- END PAYMENT OPERATION API

        //-- WITHDRAWAL OPERATION API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/Retier/{code}/{montant}/{codeEmp}")]
        public OperationDTO Retirer(String code, double montant, int codeEmp)
        {
            //-- INSTANCIATION
            OperationDTO operationDTO = new OperationDTO();
            //-- END INSTANTIATION
            try
            {
                //-- GETTING DATA
                Operation operation = _operationRepository.Retirer(code, montant, codeEmp);
                //-- END GETTING DATA

                //-- TRANSFER DATA TO DTO 
                operationDTO.NumeroOperation = operation.NumeroOperation;
                operationDTO.Montant = operation.Montant;
                operationDTO.TypeO = operation.TypeO;
                operationDTO.DateOperation = operation.DateOperation;
                operationDTO.MessageResult = "Operation Withdrawal successfully";
                //-- END TRANSFER DATA TO DTO
            }
            catch (NullReferenceException Exception)
            {
                operationDTO.MessageResult = Exception.Message;
            }
            return operationDTO;
        }
        //-- END WITHDRAWAL OPERATION API

        //-- TRANSFER OPERATION API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/Virement/{cp1}/{cp2}/{montant}/{codeEmp}")]
        public OperationDTO Virement(String cp1, String cp2, double montant, int codeEmp)
        {
            //-- INSTANCIATION
            OperationDTO operationDTO = new OperationDTO();
            //-- END INSTANTIATION

            try
            {
                //-- GETTING DATA
                Operation operation = _operationRepository.Virement(cp1, cp2, montant, codeEmp);
                //-- END GETTING DATA

                //-- TRANSFER DATA TO DTO 
                operationDTO.NumeroOperation = operation.NumeroOperation;
                operationDTO.Montant = operation.Montant;
                operationDTO.TypeO = operation.TypeO;
                operationDTO.DateOperation = operation.DateOperation;
                operationDTO.MessageResult = "Operation Transfer successfully";
                //-- END TRANSFER DATA TO DTO
            }
            catch (NullReferenceException Exception)
            {
                operationDTO.MessageResult = Exception.Message;
            }
            return operationDTO;
        }
        //-- END TRANSFER OPERATION API 
        //-- END NORMAL OPERATIONS APIS

        //-- ALANYTIC OPERATIONS

        //-- Get Operations By Employe API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetOperationsByEmploye/{codeEmploye}")]
        public List<OperationDTO> GetOperationsByEmploye(int codeEmploye)
        {
            //-- INSTANCIATION
            List<OperationDTO> operationsDTO = new List<OperationDTO>();
            //-- END INSTANTIATION

            try
            {
                foreach (Operation operation in _operationRepository.GetOperationsByEmploye(codeEmploye))
                {
                    //-- Transfering DATA TO DATA 
                    OperationDTO operationDTO = new OperationDTO();
                    operationDTO.NumeroOperation = operation.NumeroOperation;
                    operationDTO.TypeO = operation.TypeO;
                    operationDTO.Montant = operation.Montant;
                    operationDTO.DateOperation = operation.DateOperation;
                    operationDTO.MessageResult = "OPERATION " + operation.NumeroOperation + " WAS FOUND";
                    //-- END Transfering DATA TO DATA 
                    operationsDTO.Add(operationDTO);
                }
            }
            catch (NullReferenceException Exception)
            {
                System.Diagnostics.Debug.WriteLine(Exception.Message);
            }
            return operationsDTO;
        }
        //-- END Get Operations By Employe API

        //-- Get Count Versement By Employe API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetCountVersementByEmploye/{codeEmploye}")]
        public int GetCountVersementByEmploye(int codeEmploye)
        {
            int CountVersement = 0;
            try
            {
                //-- GETTING DATA
                CountVersement = _operationRepository.GetCountVersementByEmploye(codeEmploye);
                //-- END GETTING DATA
            }
            catch (NullReferenceException Exception)
            {
                System.Diagnostics.Debug.Write(Exception.Message);
            }
            return CountVersement;
        }
        //-- END Get Count Versement By Employe API

        //-- Get Count Retrait By Employe API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetCountRetraitByEmploye/{codeEmploye}")]
        public int GetCountRetraitByEmploye(int codeEmploye)
        {
            int CountRetrait = 0;
            try
            {
                //-- GETTING DATA
                CountRetrait = _operationRepository.GetCountRetraitByEmploye(codeEmploye);
                //--END GETTING DATA
            }
            catch (NullReferenceException Exception)
            {
                System.Diagnostics.Debug.Write(Exception.Message);
            }
            return CountRetrait;
        }
        //-- END Get Count Retrait By Employe API

        //-- Get Operations API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetOperations")]
        public IEnumerable<OperationDTO> GetOperations()
        {
            //-- INSTANCIATION
            List<OperationDTO> operationsDTO = new List<OperationDTO>();
            //-- END INSTANTIATION

            try
            {

                foreach(Operation operation in _operationRepository.GetOperations())
                {
                    //-- Transfering DATA TO DTO
                    OperationDTO operationDTO = new OperationDTO();
                    operationDTO.NumeroOperation = operation.NumeroOperation;
                    operationDTO.TypeO = operation.TypeO;
                    operationDTO.Montant = operation.Montant;
                    operationDTO.DateOperation = operation.DateOperation;
                    operationDTO.MessageResult = "OPERATION "+operation.NumeroOperation+" WAS FOUND";
                    //-- ENDTransfering DATA TO DTO
                    operationsDTO.Add(operationDTO);
                }
            }
            catch (NullReferenceException Exception)
            {
                System.Diagnostics.Debug.WriteLine(Exception.Message);
            }

            return operationsDTO;
        }
        //-- END GET OPERATIONS API

        //-- Get Count Operations By Employe API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetCountOperationsByEmploye/{codeEmploye}")]
        public int GetCountOperationsByEmploye(int codeEmploye)
        {
            int GetCountOperations = 0;
            try
            {
                //-- GETTING DATA
                GetCountOperations = _operationRepository.GetCountOperationsByEmploye(codeEmploye);
                //-- END GETTING DATA
            }
            catch (NullReferenceException Exception)
            {
                System.Diagnostics.Debug.WriteLine(Exception.Message);
            }
            return GetCountOperations;
        }
        //-- Get Count Operations By Employe API

        //-- Get Count Transfer By Employe API
        [HttpGet("api/GetCountTransferByEmploye/{codeEmploye}")]
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        public int GetCountTransferByEmploye(int codeEmploye)
        {
            int CountTransfer = 0;
            try
            {
                //-- GETTING DATA
                CountTransfer = _operationRepository.GetCountTransferByEmploye(codeEmploye);
                //-- END GETTING DATA
            }
            catch (NullReferenceException Exception)
            {
                System.Diagnostics.Debug.Write(Exception.Message);
            }
            return CountTransfer;
        }
        //-- END Get Count Transfer By Employe API

        //-- Get Latest Transaction By Employe API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetLatestTransactionByEmploye/{codeEmploye}")]
        public double GetLatestTransactionByEmploye(int codeEmploye)
        {
            double LatestTransaction = 0;
            try
            {
                //-- GETTING DATA
                LatestTransaction = _operationRepository.GetLatestTransactionByEmploye(codeEmploye);
                //-- END GETTING DATA
            }
            catch (NullReferenceException Exception)
            {
                System.Diagnostics.Debug.WriteLine(Exception.Message);
            }
            return LatestTransaction;
        }
        //-- END Get Latest Transaction By Employe API

        //-- Get Count Active Account API
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetCountActiveAccount")]
        public int GetCountActiveAccount()
        {
            int CountActiveAccount = 0;
            try
            {
                //-- GETTING DATA
                CountActiveAccount = _operationRepository.GetCountActiveAccount();
                //-- END GETTING DATA
            }
            catch (NullReferenceException Exception)
            {
                System.Diagnostics.Debug.Write(Exception.Message);
            }
            return CountActiveAccount;
        }
        //-- END Get Count Active Account API

        //-- END ANALYTIC OPERATIONS

        //-- END APIS
    }
}