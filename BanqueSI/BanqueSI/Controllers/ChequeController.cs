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

        // GET
        [HttpPost("api/VersementCheque")]
        public Cheque VersementCheque([FromBody] Cheque c)
        {
            _chequeRepository.VersementCheque(c);

            return c;
        }
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetCheque/{idC}")]
        public Cheque GetCheque(int idC)
        {
            return _chequeRepository.GetCheque(idC);
        }
        //-- END API
    }
}