using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.Entities
{
    [Table ("Cheque")]
    public class Cheque
    {
        //--ATTRIBUTS
        [Key]
        public int idC { get; set; }
        public String NomProprietaire { get; set; }
        public String PrenomProprietaire { get; set; }
        public int CINProprietaire { get; set; }
        public double Montant { get; set; }
        public double NumeroC { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DateV { get; set; }
        public String BankName { get; set; }
        //-- RELATION
        public Compte Compte { get; set; }
        public Employe Employe { get; set; }
        public Client Client { get; set; }
        //--END RELATION

        //--END ATTRIBUTS

        //-- CONSTRUCTOR
        public Cheque() { }
        //-- END CONSTRUCTOR
    }
}
