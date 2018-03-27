using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using BanqueSI.DTO;
using BanqueSI.Model.DTO;

namespace BanqueSI.Controllers
{
    //[RequireHttps]
    //-- REST API ACCOUNT CONTROLLER 
    public class CompteController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly ICompteRepository _compteRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public CompteController(ICompteRepository _compteRepository) 
        {
            //-- DEPENDENCY INJECTION
            this._compteRepository = _compteRepository;
            //-- END DEPENDENCY INJECTION
        }
        //-- END CONSTRUCTOR

        //-- APIS

        //-- GET COUNT ACCOUNT BY AGENCY
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetCountAccountByAgency/{idAgence}")]
        public int GetCountAccountByAgency(int idAgence)
        {
            return _compteRepository.GetCountAccountByAgency(idAgence);
        }
        //-- END GET COUNT ACCOUNT BY AGENCY

        //-- GET GET LIST ACCOUNT BY AGENCY
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API  !! ERROR :  CONFIGURING DTO && EXCEPTION !!!
        [HttpGet("api/GetListAccountByAgency/{idAgence}")]
        public List<CompteListDTO> GetListAccountByAgency(int idAgence)
        {
            List<CompteListDTO> comptesDTO = new List<CompteListDTO>();

            foreach (Compte compte in _compteRepository.GetListAccountByAgency(idAgence))
            {
                CompteListDTO compteDTO = new CompteListDTO();
                compteDTO.CodeCompte = compte.CodeCompte;
                compteDTO.Solde = compte.Solde;
                comptesDTO.Add(compteDTO);
            }
            return comptesDTO ;
        }
        //-- END GET LIST ACCOUNT BY AGENCY

        //-- API GetCompte 
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetCompte/{id}")]
        public CompteDTO GetCompte(String id)
        {
            //-- INSTANTIATION && ATTRIBUTS
            CompteDTO compteDTO = new CompteDTO();
            //-- END INSTATIATION && ATTRIBUTS
            try
            {
                //-- GETTING ACCOUNT INFORMATIONS
                Compte compte = _compteRepository.GetCompte(id);
                List<OperationCompteDTO> operationsCompteDTO = new List<OperationCompteDTO>();
                //-- END GETTING ACCOUNT INFORMATIONS


                //-- TRANSFER DATA TO DTO
                compteDTO.CodeCompte = compte.CodeCompte;
                compteDTO.DateCreation = compte.DateCreation;
                compteDTO.Decouvert = compte.Decouvert;
                compteDTO.Solde = compte.Solde;
                compteDTO.Taux = compte.Taux;
                compteDTO.Type = compte.Type;
                compteDTO.CodeClient = compte.client.CodePersonne;
                compteDTO.NomClient = compte.client.NomPersonne;

                foreach (Operation operation in compte.Operations)
                {
                    OperationCompteDTO operationCompteDTO = new OperationCompteDTO();

                    operationCompteDTO.NumeroOperation = operation.NumeroOperation;
                    operationCompteDTO.DateOperation = operation.DateOperation;
                    operationCompteDTO.Montant = operation.Montant;
                    operationCompteDTO.TypeO = operation.TypeO;

                    operationsCompteDTO.Add(operationCompteDTO);
                }
                compteDTO.OperationCompteDTO = operationsCompteDTO;
                compteDTO.ResultMessage = "ACCOUNT INFORMATIONS LOADED SUCCESSFULLY";
                //-- END TRANSFER DATA TO DTO
            }
            catch (NullReferenceException exception)
            {
                compteDTO.ResultMessage = exception.Message;
                System.Diagnostics.Debug.WriteLine(exception.Message);
            }
            return compteDTO;
            
        }
        //-- END API GetCompte 

        //-- API AddCompte
        [HttpPost ("api/AddCompte")]
        public CompteDTO AddCompte([FromBody] Compte compte)
        {
            //-- INSTANTIATION
            CompteDTO compteDTO = new CompteDTO();
            //-- END INSTATION

            try
            {

                _compteRepository.SaveCompte(compte);
                //-- TRANSFER DATA TO DTO 
                compteDTO.CodeCompte = compte.CodeCompte;
                compteDTO.DateCreation = compte.DateCreation;
                compteDTO.Decouvert = compte.Decouvert;
                compteDTO.Solde= compte.Solde;
                compteDTO.Taux = compte.Taux;
                compteDTO.Type = compte.Type;
                compteDTO.ResultMessage = "Account Created Successfuly";
                //-- END TRANSFER DATA TO DTO
            }
            catch (NullReferenceException Exception)
            {
                compteDTO.ResultMessage = Exception.Message;
            }
            return compteDTO;
        }
        //-- END API AddCompte

        //-- END APIS
    }
}
