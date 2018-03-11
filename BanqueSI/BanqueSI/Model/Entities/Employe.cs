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

        public Employe() { }

        //-- RELATION
        public Employe EmployeSup { get; set; }
        public List<Change> Changes { get; set; }
        public List<Compte> Comptes { get; set; }
        public List<Operation> Operations { get; set; }

        //-- END RELATION
    }
}
