using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace BanqueSI.Controllers
{
    //[RequireHttps]
    public class PersonneController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly IPersonneRepository _personneRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public PersonneController(IPersonneRepository _personneRepository)
        {
            this._personneRepository = _personneRepository;
        }
        //-- END CONSTRUCTOR

        //-- APIS
        //-- END APIS

    }
}