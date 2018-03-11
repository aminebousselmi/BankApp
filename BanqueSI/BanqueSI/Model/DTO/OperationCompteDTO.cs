using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.DTO
{
    //-- DATA TRANSFER OBJECT OPERATIONS
    public class OperationCompteDTO
    {
        //-- ATTRIBUTS
        public int NumeroOperation { get; set; }
        public DateTime DateOperation { get; set; }
        public double Montant { get; set; }
        public OperationType TypeO { get; set; }
        //-- END ATTRIBUTS
    }
}
