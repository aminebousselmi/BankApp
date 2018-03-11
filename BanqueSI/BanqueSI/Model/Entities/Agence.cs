using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.Entities
{
    [Table("Agence")]
    public class Agence
    {
        //--ATTRIBUTS
        [Key]
        public int CodeAgence { get; set; }
        public String NomAgence { get; set; }
        public String AdresseAgence { get; set; }
        public double FondLiquideQuotidien { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public System.Nullable<DateTime> HeureOuverture { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public System.Nullable<DateTime> HeureFermeture { get; set; }

        //-- RELATION
        [JsonIgnore]
        public List<Personne> Personnes { get; set; }
        //-- END RELATION

        //--END ATTRIBUTS

        //-- CONSTRUCTOR
        public Agence() { }
        //-- END CONSTRUCTOR

    }
}
