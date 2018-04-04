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
    public class Personne
    {
        //--ATTRIBUTS
        [Key]
        public int CodePersonne { get; set; }
        public String NomPersonne { get; set; }
        public String Email { get; set; }
        public Agence Agence { get; set; }

        //-- RELATIONS
        [JsonIgnore]
        public List<Mail> Mail {get; set;}    
        //-- END RELATIONS

        //--END ATTRIBUTS

        //-- CONSTRUCTOR
        public Personne() { }
        //-- END CONSTRUCTOR

    }
}
