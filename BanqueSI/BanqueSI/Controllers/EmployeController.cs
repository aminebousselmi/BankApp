using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;

namespace BanqueSI.Controllers
{
    [RequireHttps]
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
        //-- END SECURING API 
        [HttpGet("api/userInfo/{id}")]
        public Employe GetEmployeByUsername(String id)
        {
            return _employeRepository.GetEmployeById(id);
        }

        //-- SECURING API 
        //-- END SECURING API 
        [HttpGet("api/GetEmployes")]
        public List<Employe> ListEmployes()
        {
            return _employeRepository.ListEmploye();
        }
        //-- END APIS
    }
}