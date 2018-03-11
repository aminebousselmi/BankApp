using BanqueSI.Model;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace BanqueSI.Repository
{
    //-- BUSINESS LOGIC EMPLOYEE
    public class EmployeRepository : IDisposable, IRepository.IEmployeRepository
    {

        //-- ATTRIBUTS
        private STBDbContext _context;
        private bool disposed = false;
        private UserManager<Personne> _userManager;
        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public EmployeRepository(STBDbContext _context,UserManager<Personne> _userManager)
        {
            this._userManager = _userManager;
            this._context = _context;
        }
        //--END CONSTRUCTOR

        //-- METHODES

        //-- GET EMPLOYE BY USERNAME
        public Employe GetEmployeById(String id)
        {

            return _context.Personnes.OfType<Employe>()
                        .Include(b => b.agence)
                        .Single(b => b.Id == id);

        }
        //-- END GET EMPLOYE BY USERNAME

        //-- GET LIST OF EMPLOYEE
        public List<Employe> ListEmploye()
        {
            return _context.Employes.ToList<Employe>();
        }

        public Personne SaveEmploye(Employe e)
        {
            _context.Employes.Add(e);
            Save();
            return e;
        }
        //-- END GET LIST OF EMPLOYEE

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        //-- COMITTING
        public void Save()
        {
            _context.SaveChanges();
        }
        //-- END COMITTING

        //-- END METHODES
    }
}
