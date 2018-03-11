using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model;
using BanqueSI.Model.Entities;

namespace BanqueSI.Repository.IRepository
{
    public class ChangeRepository : IDisposable, IRepository.IChangeRepository
    {
        //-- ATTRIBUTS
        private STBDbContext _context;
        private bool disposed = false;
        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public ChangeRepository(STBDbContext _context)
        {
            this._context = _context;
        }
        //--END CONSTRUCTOR

        //-- METHODES

        public Change AchatVenteDevise(Change c)
        {
            if(c.ChangeType == ChangeType.ACHAT)
            {
                c.DateChange = new DateTime();
                _context.Changes.Add(c);
                Save();
                return c;
            }
            else
            {
                c.DateChange = new DateTime();
                _context.Changes.Add(c);
                Save();
                return c;
            }
        }

        public double ConvertisseurDevise(double montant)
        {
            return 3;
        }

        public double ConvertisseurDeviseR(double montant)
        {
            return 3;
        }

        public void Save()
        {
            _context.SaveChanges();
        }

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

        //-- END METHODES

    }
}
