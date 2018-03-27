using BanqueSI.DTO;
using BanqueSI.Model;
using BanqueSI.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BanqueSI.Repository
{
    //-- BUSINESS LOGIC ACCOUNT
    public class CompteRepository : IDisposable, IRepository.ICompteRepository
    {
        //-- ATTRIBUTS
        private STBDbContext _context;
        private bool disposed = false;
        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public CompteRepository(STBDbContext _context)
        {
            this._context = _context;
        }
        //--END CONSTRUCTOR

        //-- METHODES 

        //-- GET COUNT ACCOUNT BY AGENCY
        public int GetCountAccountByAgency(int idAgence)
        {
            return _context.Comptes
                    .Where(b => b.client.Agence.CodeAgence == idAgence)
                    .ToList()
                    .Count;
        }
        //-- END GET COUNT ACCOUNT BY AGENCY

        //-- GET LIST ACCOUNT BY AGENCY
        public List<Compte> GetListAccountByAgency(int idAgence)
        {
            //-- EXCEPTION
            if (idAgence == 0)
            {
                throw new NullReferenceException("Agency Number empty");
            }
            if (_context.Comptes.Where(b => b.Personne.Agence.CodeAgence == idAgence).ToList() == null)
            {
                throw new NullReferenceException("No Account Available in this Agency");
            }
            //-- END EXCEPION
                   //-- GETTING DATA FROM DATABASE WITH DAO
            return _context
                        .Comptes
                        .Where(b => b.Personne.Agence.CodeAgence == idAgence)
                        .ToList();
                   //-- END GETTING DATA FROM DATABASE WITH DAO

        }
        //-- END GET LIST ACCOUNT BY AGENCY

        //-- GET ACCOUNT BY CODE //
        public Compte GetCompte(string code) 
        {

            //-- GETTING DATA FROM DATABASE WITH DAO
                if (code == null)
                {
                    throw new NullReferenceException("Account Number empty");
                }

                if (_context.Comptes.Where(b => b.CodeCompte == code).Include(b => b.client).Include(b => b.Operations).FirstOrDefault() == null)
                {
                    throw new NullReferenceException("Account invalid");
                }

                Compte compte = _context.Comptes
                                  .Where(b => b.CodeCompte == code)
                                  .Include(b => b.client)
                                  .Include(b => b.Operations)
                                  .FirstOrDefault();
                //-- END GETTING DATA FROM DATABASE WITH DAO

                //-- Managing Exception
                if (compte.Operations == null)
                {
                    throw new NullReferenceException("There is no Customer for this account");
                }
                
                if(compte.Operations == null)
                {
                    throw new NullReferenceException("There is no operations for this account");
                }
                //-- END Managing Exception

            return compte;
        }
        //-- END GET ACCOUNT BY CODE //

        //-- ADD ACCOUNT
        public Compte SaveCompte(Compte cp)
        {
            if(cp.CodeCompte == null)
            {
                throw new NullReferenceException("Account informations invalid !");
            }

            cp.DateCreation = new DateTime();
            //-- PUTTING DATA IN DATABASE
            if (_context.Comptes.Add(cp) == null)
            {
                throw new NullReferenceException("Error while saving data !");
            }
            _context.Comptes.Add(cp);
            //-- END PUTTING DATA IN DATABASE

            //-- COMMIT
            Save();
            //-- END COMMIT

            return cp;
        }
        //-- END ADD ACCOUNT


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

        //-- SAVING DATA IN DATABASE
        public void Save()
        {
            _context.SaveChanges();
        }
        //-- END SAVING DATA IN DATABASE

        //-- END METHODES
    }
}
