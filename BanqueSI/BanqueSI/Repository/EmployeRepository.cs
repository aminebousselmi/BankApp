using BanqueSI.Model;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace BanqueSI.Repository
{
    //-- BUSINESS LOGIC EMPLOYEE
    public class EmployeRepository : IDisposable, IRepository.IEmployeRepository
    {

        //-- ATTRIBUTS
        private STBDbContext _context;
        private bool disposed = false;
        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public EmployeRepository(STBDbContext _context)
        {
            this._context = _context;
        }
        //--END CONSTRUCTOR

        //-- METHODES

        //-- GET EMPLOYE BY USERNAME
        public Employe GetEmployeByUsername(String username)
        {

            return _context.Personnes.OfType<Employe>()
                        .Include(b => b.Agence)
                        .Single(b => b.Username == username);

        }
        //-- END GET EMPLOYE BY USERNAME

        //-- GET LIST OF EMPLOYEE
        public List<Employe> ListEmploye()
        {
            return _context.Employes.ToList<Employe>();
        }

        public Personne SaveEmploye(Employe e)
        {
            var sha1 = new SHA1CryptoServiceProvider();
            var data = Encoding.ASCII.GetBytes(e.Password);
            var sha1data = sha1.ComputeHash(data);
            e.Password = Convert.ToBase64String(sha1data);
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
