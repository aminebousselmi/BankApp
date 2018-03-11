using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.DTO
{   
    //-- DATA TRANSFER OBJECT
    public class OperationDTO
    {
        public int NumeroOperation { get; set; }
        public DateTime DateOperation { get; set; }
        public double Montant { get; set; }
        public OperationType TypeO { get; set; }
        public String MessageResult { get; set; }
    }
}
