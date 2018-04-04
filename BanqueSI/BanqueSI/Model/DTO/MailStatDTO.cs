using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.DTO
{
    public class MailStatDTO
    {
        //-- ATTRIBUTS
        public int CountInbox { get; set; }
        public int CountSent { get; set; }
        public int CountDraft { get; set; }
        public int CountDeleted { get; set; }
        public int CountReaden { get; set; }
        //-- END ATTRIBUTS
    }
}
