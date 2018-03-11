using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.Entities
{
    [Table ("Change")]
    public class Change
    {
        //-- ATTRIBUTS
        [Key]
        public int IdChange { get; set; }
        public String Identif { get; set; }
        public String NomP { get; set; }
        public String PrenomP { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DateChange { get; set; }
        public double Montant { get; set; }
        public String AdresseP { get; set; }
        public String Destination { get; set; }
        
        public ChangeType ChangeType { get; set; }

        //-- RELATION
        public Employe employe { get; set; }
        //-- END RELATION

        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public Change() { }
        //-- END CONSTRUCTOR
    }
}
