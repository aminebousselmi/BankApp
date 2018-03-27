using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.Entities
{
    [Table("Employe")]
    public class Employe : Personne
    {
        public String Username { get; set; }
        public String Password { get; set; }

        //-- RELATION
        public Employe EmployeSup { get; set; }
        [JsonIgnore]
        public List<Change> Changes { get; set; }
        public List<Compte> Comptes { get; set; }
        public List<Operation> Operations { get; set; }
        [JsonIgnore]
        public List<Cheque> Cheques { get; set; }
        //-- END RELATION


        public Employe() { }
    }
}
