using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.DTO
{
    public class MailSentDTO
    {
        public int IdEmail { get; set; }
        public String From { get; set; }
        public String To { get; set; }
        public String ObjectEmail { get; set; }
        public String MessageEmail { get; set; }
        public DateTime DateEmail { get; set; }
        public Boolean Deleted { get; set; }
        public Boolean Sent { get; set; }
        public Boolean Readen { get; set; }
        public int CodePersonne { get; set; }
        public String NomPersonne { get; set; }
        public String Username { get; set; }

    }
}
