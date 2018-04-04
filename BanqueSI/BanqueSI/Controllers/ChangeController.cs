using System;
using System.Collections.Generic;
using BanqueSI.Model.DTO;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BanqueSI.Controllers
{
    //[RequireHttps]
    public class ChangeController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly IChangeRepository _changeRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public ChangeController(IChangeRepository _changeRepository) => this._changeRepository = _changeRepository;
        //-- END CONSTRUCTOR

        //-- APIS

        //-- ADDING CHANGE OPERATION
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpPost("api/AchatVenteDevise")]
        public ChangeOperationDTO AchatVenteDevise([FromBody] ChangeDTO c)
        {
            //-- INSTANTICATION DTO
            ChangeOperationDTO changeOperationDTO = new ChangeOperationDTO();
            //-- END  INSTANTICATION DTO

            //-- BLOC TRY CATCH
            try
            {
                Change change = _changeRepository.AchatVenteDevise(c);
                changeOperationDTO.IdChange = change.IdChange;
                changeOperationDTO.MessageResult = "Operation Change Currency Done Successfully !";
            }
            catch (NullReferenceException Exception){
                changeOperationDTO.MessageResult = Exception.Message;
            }
            //-- END BLOC TRY CATCH
            //-- RETURNING OPERATION DTO CHANGE
            return changeOperationDTO;
        }
        //-- END ADDING CHANGE OPERATION

        //-- GET LIST CHANGES BY EMPLOYE
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetListChangesByEmploye/{idEmploye}")]
        public List<ChangeDTO> GetListChangesByEmploye(int idEmploye) => _changeRepository.GetListChangesByEmploye(idEmploye);
        //-- END GET LIST CHANGES BY EMPLOYE

        //-- GET TOTAL BUY AND SELL DEVISE BY EMPLOYE
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/TotalBuySellDeviseByEmploye/{idEmploye}")]
        public TotalBuySellDTO TotalSellDeviseByEmploye(int idEmploye) => _changeRepository.TotalBuySellDeviseByEmploye(idEmploye);
        //-- END GET TOTAL BUY AND SELL DEVISE BY EMPLOYE

        //-- GET DETAILED STATISTICAL CHART BY ID EMPLOYE
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetDetailedStatisticalChartByIdEmploye/{idEmploye}")]
        public List<ChangeDetailedStatDTO> GetDetailedStatisticalChartByIdEmploye(int idEmploye) => _changeRepository.GetDetailedStatisticalChartByIdEmploye(idEmploye);
        //-- END APIS
        //-- END GET DETAILED STATISTICAL CHART BY ID EMPLOYE
    }
}