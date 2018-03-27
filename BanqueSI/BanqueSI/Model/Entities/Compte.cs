using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.Entities
{
    [Table("Compte")]
    public class Compte
    {
        //--ATTRIBUTS
        [Key]
        public String CodeCompte { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DateCreation { get; set; }
       
        public Double Solde { get; set; }
        public System.Nullable<Double> Decouvert { get; set; }
        public System.Nullable<Double> Taux { get; set; }
        public CompteType Type { get; set; }

        //-- RELATION
        public Employe Personne { get; set; }
        public Client client { get; set; }
        public List<Operation> Operations { get; set; }
        [JsonIgnore]
        public List<Cheque> Cheques { get; set; }
        //-- END RELATION

        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public Compte() { }
        //-- END CONSTRUCTOR
    }
}
