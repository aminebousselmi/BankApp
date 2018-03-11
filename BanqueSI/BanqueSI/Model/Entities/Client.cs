using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model.Entities
{
    [Table("Client")]
    public class Client : Personne
    {
        //-- RELATION
        [JsonIgnore]
        public List<Compte> Comptes { get; set; }
        //-- END RELATION

        public Client() { }

    }
}
