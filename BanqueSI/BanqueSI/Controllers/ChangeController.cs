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
    public class ChangeController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly IChangeRepository _changeRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public ChangeController(IChangeRepository _changeRepository)
        {

            this._changeRepository = _changeRepository;

        }
        //-- END CONSTRUCTOR

        //-- APIS
        
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpPost("api/AchatVenteDevise")]
        public ChangeOperationDTO AchatVenteDevise([FromBody] ChangeDTO c)
        {
            ChangeOperationDTO changeOperationDTO = new ChangeOperationDTO();
            try {
                if (_changeRepository.AchatVenteDevise(c).ChangeType == ChangeType.VENTE)
                {
                    changeOperationDTO.IdChange = _changeRepository.AchatVenteDevise(c).IdChange;
                    changeOperationDTO.MessageResult = "Operation Buy Currency Done Successfully !";
                }
                else
                {
                    changeOperationDTO.IdChange = _changeRepository.AchatVenteDevise(c).IdChange;
                    changeOperationDTO.MessageResult = "Operation Sell Currency Done Successfully !";
                }
            }
            catch (NullReferenceException Exception){
                changeOperationDTO.MessageResult = Exception.Message;
            }

            return changeOperationDTO;
        }

        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetListChangesByEmploye/{idEmploye}")]
        public List<ChangeDTO> GetListChangesByEmploye(int idEmploye)
        {
           return _changeRepository.GetListChangesByEmploye(idEmploye);
        }

        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/TotalSellDeviseByEmploye/{idEmploye}")]
        public double TotalSellDeviseByEmploye(int idEmploye)
        {
            return _changeRepository.TotalSellDeviseByEmploye(idEmploye);
        }

        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/TotalBuyDeviseByEmploye/{idEmploye}")]
        public double TotalBuyDeviseByEmploye(int idEmploye) {
            return _changeRepository.TotalBuyDeviseByEmploye(idEmploye);
        }

        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetDetailedStatisticalChartByIdEmploye/{idEmploye}")]
        public List<ChangeDetailedStatDTO> GetDetailedStatisticalChartByIdEmploye(int idEmploye)
        {
            return _changeRepository.GetDetailedStatisticalChartByIdEmploye(idEmploye);
        }
        //-- END APIS
    }
}