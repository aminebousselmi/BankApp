using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.Entities
{
    [Table("Mail")]
    public class Mail
    {
        //--ATTRIBUTS
        [Key]
        public int IdEmail { get; set; }
        public String From { get; set; }
        public String To { get; set; }
        public String ObjectEmail { get; set; }
        public String MessageEmail { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DateEmail { get; set; }
        public Boolean Deleted { get; set; }
        public Boolean Sent { get; set; }
        public Boolean Readen { get; set; }
        //-- RELATIONS
        public Personne Personne {get;set;}
        //-- END RELATIONS

        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public Mail() { }
        //-- END CONSTRUCTOR
    }
}
