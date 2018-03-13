using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.DTO
{    
    //-- DATA TRANSFER OBJECT COMPTE
    public class CompteDTO
    {
        //-- ATTRIBUTS
        public String CodeCompte { get; set; }
        public DateTime DateCreation { get; set; }
        public Double Solde { get; set; }
        public System.Nullable<Double> Decouvert { get; set; }
        public System.Nullable<Double> Taux { get; set; }
        public CompteType Type { get; set; }
        public int CodeClient { get; set; }
        public String NomClient { get; set; }
        public String ResultMessage { get; set; }

        public List<OperationCompteDTO> OperationCompteDTO { get; set; }
        //-- END ATTRIBUTS
    }
}
