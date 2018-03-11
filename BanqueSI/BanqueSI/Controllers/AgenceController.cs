using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BanqueSI.Controllers
{
    [RequireHttps]
    public class AgenceController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly IAgenceRepository _agenceRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public AgenceController(IAgenceRepository _agenceRepository)
        {
            this._agenceRepository = _agenceRepository;

        }
        //-- END CONSTRUCTOR

        //-- APIS

        // GET

        //-- SECURING API
        //-- END SECURING API 
        [HttpGet("api/GetAgence/{id}")]
        public Agence GetAgence(int id)
        {
            return _agenceRepository.GetAgence(id);
        }

        // POST
        [HttpPost("api/AddAgence")]
        public Agence AddCompte([FromBody] Agence agence)
        {
            _agenceRepository.SaveAgence(agence);

            return agence;
        }

        //-- END API 

    }
}