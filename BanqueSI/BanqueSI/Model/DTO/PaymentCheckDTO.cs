using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.DTO
{
    public class PaymentCheckDTO
    {
        //-- DTO ENTITIES
        public int IdC { get; set; }
        public String NomProprietaire { get; set; }
        public String PrenomProprietaire { get; set; }
        public int CINProprietaire { get; set; }
        public double Montant { get; set; }
        public double NumeroC { get; set; }
        public DateTime DateV { get; set; }
        public String BankName { get; set; }
        public String MessageResult { get; set; }
        public String CodeCompte { get; set; }
        public System.Nullable<DateTime> DateCreation { get; set; }
        public System.Nullable<Double> Solde { get; set; }
        public System.Nullable<Double> Decouvert { get; set; }
        public System.Nullable<Double> Taux { get; set; }
        public System.Nullable<CompteType> Type { get; set; }
        public int IdEmploye { get; set; }
        //-- END DTO ENTITIES
    }
}
