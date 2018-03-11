using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model;
using BanqueSI.Model.Entities;

namespace BanqueSI.Repository
{
    public class ChequeRepository : IDisposable, IRepository.IChequeRepository
    {
        //-- ATTRIBUTS
        private STBDbContext _context;
        private bool disposed = false;
        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public ChequeRepository(STBDbContext _context)
        {
            this._context = _context;
        }
        //--END CONSTRUCTOR

        //-- METHODES
        public Cheque GetCheque(int idC)
        {
            return _context.Cheques.Find(idC);
        }

        public Cheque VersementCheque(Cheque c)
        {
            c.DateV = new DateTime();
            _context.Cheques.Add(c);
            Save();
            return c;
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
