using BanqueSI.Model;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository
{
    public class PersonneRepository : IDisposable, IRepository.IPersonneRepository
    {
        //-- ATTRIBUTS
        private STBDbContext _context;
        private bool disposed = false;
        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public PersonneRepository(STBDbContext _context)
        {
            this._context = _context;
        }
        //--END CONSTRUCTOR

        //-- METHODES

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
