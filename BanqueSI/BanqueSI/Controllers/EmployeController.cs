using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;

namespace BanqueSI.Controllers
{
    //[RequireHttps]
    public class EmployeController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly IEmployeRepository _employeRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public EmployeController(IEmployeRepository _employeRepository)
        {

            this._employeRepository = _employeRepository;
        }
        //-- END CONSTRUCTOR

        //-- APIS
        [HttpPost("api/AddEmploye")]
        public Personne SaveEmploye([FromBody] Employe e)
        {
            _employeRepository.SaveEmploye(e);

            return e;
        }
        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/userInfo/{username}")]
        public Employe GetEmployeByUsername(String username)
        {
            return _employeRepository.GetEmployeByUsername(username);
        }

        //-- SECURING API 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetEmployes")]
        public List<Employe> ListEmployes()
        {
            return _employeRepository.ListEmploye();
        }
        //-- END APIS
    }
}