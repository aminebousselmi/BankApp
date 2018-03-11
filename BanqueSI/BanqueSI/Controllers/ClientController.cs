using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BanqueSI.Controllers
{
    [RequireHttps]
    public class ClientController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly IClientRepository _clientRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public ClientController(IClientRepository _clientRepository)
        {
            this._clientRepository = _clientRepository;

        }
        //-- END CONSTRUCTOR

        //-- APIS
        //-- SECURING API 
        //-- END SECURING API 
        [HttpGet("api/GetCountClientByAgence/{idAgence}")]
        public int GetCountClientByAgence(int idAgence)
        {
            return _clientRepository.GetCountClientByAgence(idAgence);
        }
        //-- END APIS
    }
}