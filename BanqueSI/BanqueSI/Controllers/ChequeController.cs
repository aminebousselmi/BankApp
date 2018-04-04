using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model.DTO;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BanqueSI.Controllers
{
    //[RequireHttps]
    public class ChequeController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly IChequeRepository _chequeRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public ChequeController(IChequeRepository _chequeRepository)
        {

            this._chequeRepository = _chequeRepository;

        }
        //-- END CONSTRUCTOR

        //-- APIS

        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        //-- GET LIST CHECK BY EMPLOYE
        [HttpGet("api/GetStatisticalLineCheckByEmploye/{idEmploye}")]
        public List<List<StatisticalLineCheckDTO>> GetStatisticalLineCheckByEmploye(int idEmploye)
        {
            return _chequeRepository.GetStatisticalLineCheckByEmploye(idEmploye);
        }


        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        //-- GET LIST CHECK BY EMPLOYE
        [HttpGet("api/GetStatisticalCheckOperationsByEmploye/{idEmploye}")]
        public StatisticalCheckOperationsDTO GetStatisticalCheckOperationsByEmploye(int idEmploye)
        {
            return _chequeRepository.GetStatisticalCheckOperationsByEmploye(idEmploye);
        }

        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        //-- GET LIST CHECK BY EMPLOYE
        [HttpGet("api/GetListCheckByEmploye/{idEmploye}")]
        public List<PaymentCheckDTO> GetListCheckByEmploye(int idEmploye)
        {
            return _chequeRepository.GetListCheckByEmploye(idEmploye);
        }
        //-- GET LIST CHECK BY EMPLOYE

        //-- Payment Cheque Operation
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpPost("api/VersementCheque")]
        public PaymentCheckDTO VersementCheque([FromBody]PaymentCheckDTO c)
        {
            //-- INSTANTIATION
            PaymentCheckDTO paymentCheckDTO = new PaymentCheckDTO();
            //-- END INSTANTIATION

            try
            {
                Cheque cheque = _chequeRepository.VersementCheque(c);
                //-- GETTING DATA FROM DAO AND TRANSFER IT TO DTO
                paymentCheckDTO.BankName = cheque.BankName;
                paymentCheckDTO.CINProprietaire = cheque.CINProprietaire;
                paymentCheckDTO.DateV = cheque.DateV;
                paymentCheckDTO.IdC = cheque.idC;
                paymentCheckDTO.Montant = cheque.Montant;
                paymentCheckDTO.NomProprietaire = cheque.NomProprietaire;
                paymentCheckDTO.NumeroC = cheque.NumeroC;
                paymentCheckDTO.PrenomProprietaire = cheque.PrenomProprietaire;

                paymentCheckDTO.CodeCompte = cheque.Compte.CodeCompte;
                paymentCheckDTO.DateCreation = cheque.Compte.DateCreation;
                paymentCheckDTO.Decouvert = cheque.Compte.Decouvert;
                paymentCheckDTO.Solde = cheque.Compte.Solde;
                paymentCheckDTO.Taux = cheque.Compte.Taux;
                paymentCheckDTO.Type = cheque.Compte.Type;
             
                paymentCheckDTO.MessageResult = "Operation Payment Check Done Successfully";
                //-- END GETTING DATA FROM DAO AND TRANSFER IT TO DTO
            }
            catch (NullReferenceException Exception)
            {
                paymentCheckDTO.MessageResult = Exception.Message;
            }
            return paymentCheckDTO;
        }
        //-- END Payment Cheque Operation

        //-- END API
    }
}