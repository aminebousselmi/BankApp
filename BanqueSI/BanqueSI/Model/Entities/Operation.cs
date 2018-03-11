using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.Entities
{
    [Table("Operation")]
    public class Operation
    {
        //--ATTRIBUTS
        [Key]
        public int NumeroOperation { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DateOperation { get; set; }
        public double Montant { get; set; }
        public OperationType TypeO { get; set; }
        //-- RELATION
        [JsonIgnore] // INGORING ATTRIBUT COMPTE TO AVOID INFINITE LOOP
        public Compte Compte { get; set; }
        public Employe Employe { get; set; }
        //-- END RELATION

        //--END ATTRIBUTS

        //-- CONSTRUCTOR
        public Operation() { }
        //-- END CONSTRUCTOR
    }
}
