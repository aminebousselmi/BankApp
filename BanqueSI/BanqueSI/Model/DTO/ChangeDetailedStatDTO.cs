using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.DTO
{
    public class ChangeDetailedStatDTO
    {
        public List<DateTime> DateChange {get;set;}
        public List<Double> Montant { get; set; }
        public List<Double> MontantConverted { get; set; }
        public List<Double> ExchangeRate { get; set; }
        public String TypeDevise { get; set; }

    }
}
