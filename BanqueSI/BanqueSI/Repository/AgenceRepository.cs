using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model;
using BanqueSI.Model.Entities;

namespace BanqueSI.Repository
{
    public class AgenceRepository : IDisposable, IRepository.IAgenceRepository
    {
        //-- ATTRIBUTS
        private STBDbContext _context;
        private bool disposed = false;
        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public AgenceRepository(STBDbContext _context)
        {
            this._context = _context;
        }
        //--END CONSTRUCTOR

        //-- METHODES

        public Agence GetAgence(int codeAgence)
        {
            return _context.Agences.Find(codeAgence);
        }

        public Agence SaveAgence(Agence a)
        {
            a.HeureOuverture = new DateTime();
            a.HeureFermeture = new DateTime();
            _context.Agences.Add(a);
            Save();
            return a;
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
