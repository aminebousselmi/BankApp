using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.DTO
{
    public class ChangeDTO
    {
        public String Identif { get; set; }
        public String NomP { get; set; }
        public String PrenomP { get; set; }
        public DateTime DateChange { get; set; }
        public double Montant { get; set; }
        public String AdresseP { get; set; }
        public String Destination { get; set; }
        public String FromCurrencyCode { get; set; }
        public String FromCurrencyName { get; set; }
        public String ToCurrencyCode { get; set; }
        public String ToCurrencyName { get; set; }
        public Double ExchangeRate { get; set; }
        public Double MontantConverted { get; set; }
        public ChangeType ChangeType { get; set; }

        //-- RELATION
        public int CodeEmploye { get; set; }
    }
}
