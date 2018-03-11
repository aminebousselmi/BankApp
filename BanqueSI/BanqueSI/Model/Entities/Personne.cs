using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.Entities
{
    [Table("Personne")]
    public class Personne : IdentityUser
    {
        //--ATTRIBUTS
        public String NomPersonne { get; set; }
        public Agence agence { get; set; }
        //--END ATTRIBUTS

        //-- CONSTRUCTOR
        public Personne() { }
        //-- END CONSTRUCTOR

    }
}
