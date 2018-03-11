using BanqueSI.Model.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Model
{
    public class STBDbContext: IdentityDbContext<Personne>
    {


        public DbSet<Compte> Comptes { get; set; }
        public DbSet<Agence> Agences { get; set; }
        public DbSet<Change> Changes { get; set; }
        public DbSet<Cheque> Cheques { get; set; }
        public DbSet<Personne> Personnes { get; set; }
        public DbSet<Employe> Employes { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Operation> Operations { get; set; }

        public STBDbContext(DbContextOptions options) : base(options)
        {
            
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        =>
            optionsBuilder
                
                .UseSqlServer("Server=AMINE;Database=stb_banque;Trusted_Connection=True");
        

    }
}
