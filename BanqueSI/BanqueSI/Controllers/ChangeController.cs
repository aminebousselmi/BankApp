using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace BanqueSI.Controllers
{
    [RequireHttps]
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
        [HttpPost("api/AchatVenteDevise")]
        public Change AchatVenteDevise([FromBody] Change c)
        {
            _changeRepository.AchatVenteDevise(c);

            return c;
        }
        //-- EN APIS
    }
}