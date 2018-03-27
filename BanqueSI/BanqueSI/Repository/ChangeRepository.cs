using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model;
using BanqueSI.Model.DTO;
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

        public Change AchatVenteDevise(ChangeDTO c)
        {
            Change change = new Change();
            if (c.ChangeType == ChangeType.ACHAT)
            {
                //-- EXCEPTION
                if (c.CodeEmploye == 0 || c.AdresseP == null || c.Destination == null || c.ExchangeRate == 0 || c.FromCurrencyCode == null || c.FromCurrencyName == null || c.Identif == null || c.Montant == 0 || c.MontantConverted == 0 || c.NomP == null || c.PrenomP == null || c.ToCurrencyCode == null || c.ToCurrencyName == null)
                {
                    throw new NullReferenceException("Error While Loading data ! try again ");
                }
                //-- END EXCEPTION

                c.DateChange = DateTime.Now;
                c.ChangeType = ChangeType.ACHAT;

                
                change.ChangeType = c.ChangeType;
                change.DateChange = c.DateChange;
                change.AdresseP = c.AdresseP;
                change.Destination = c.Destination;
                Employe emp = _context.Employes.Find(c.CodeEmploye);
                change.employe = emp;
                change.ExchangeRate = c.ExchangeRate;
                change.FromCurrencyCode = c.FromCurrencyCode;
                change.FromCurrencyName = c.FromCurrencyName;
                change.Identif = c.Identif;
                change.Montant = c.Montant;
                change.MontantConverted = c.MontantConverted;
                change.NomP = c.NomP;
                change.PrenomP = c.PrenomP;
                change.ToCurrencyCode = c.ToCurrencyCode;
                change.ToCurrencyName = c.ToCurrencyName;

                _context.Changes.Add(change);
                Save();
            }
            else
            {
                //-- EXCEPTION
                if (c.ChangeType != ChangeType.VENTE  || c.CodeEmploye == 0|| c.ExchangeRate == 0 || c.FromCurrencyCode == null || c.FromCurrencyName == null || c.Identif == null || c.Montant == 0 || c.MontantConverted == 0 || c.NomP == null || c.PrenomP == null || c.ToCurrencyCode == null || c.ToCurrencyName == null)
                {
                    throw new NullReferenceException("Error While Loading data ! try again ");
                }
                //-- END EXCEPTION

                c.DateChange = DateTime.Now;
                c.ChangeType = ChangeType.VENTE;


                change.ChangeType = c.ChangeType;
                change.DateChange = c.DateChange;
                Employe emp = _context.Employes.Find(c.CodeEmploye);
                change.employe = emp;
                change.ExchangeRate = c.ExchangeRate;
                change.FromCurrencyCode = c.FromCurrencyCode;
                change.FromCurrencyName = c.FromCurrencyName;
                change.Identif = c.Identif;
                change.Montant = c.Montant;
                change.MontantConverted = c.MontantConverted;
                change.NomP = c.NomP;
                change.PrenomP = c.PrenomP;
                change.ToCurrencyCode = c.ToCurrencyCode;
                change.ToCurrencyName = c.ToCurrencyName;

                _context.Changes.Add(change);
                Save();
            }
            return change;
        }

        public List<ChangeDTO> GetListChangesByEmploye(int idEmploye)
        {
            List<ChangeDTO> changesDTO = new List<ChangeDTO>();
            foreach (Change change in _context
                                        .Changes
                                        .Where(e => e.employe.CodePersonne == idEmploye)
                                        .ToList())
            {
                ChangeDTO changeDTO = new ChangeDTO();
                changeDTO.AdresseP = change.AdresseP;
                changeDTO.ChangeType = change.ChangeType;
                changeDTO.DateChange = change.DateChange;
                changeDTO.Destination = change.Destination;
                changeDTO.ExchangeRate = change.ExchangeRate;
                changeDTO.FromCurrencyCode = change.FromCurrencyCode;
                changeDTO.FromCurrencyName = change.FromCurrencyName;
                changeDTO.Identif = change.Identif;
                changeDTO.Montant = change.Montant;
                changeDTO.MontantConverted = change.MontantConverted;
                changeDTO.NomP = change.NomP;
                changeDTO.PrenomP = change.PrenomP;
                changeDTO.ToCurrencyCode = change.ToCurrencyCode;
                changeDTO.ToCurrencyName = change.ToCurrencyName;
                changesDTO.Add(changeDTO);
            }

            return  changesDTO;
        }

        public double TotalSellDeviseByEmploye(int idEmploye) {
            double TotalSell = 0;
            foreach (Change change in _context
                                       .Changes
                                       .Where(e => e.employe.CodePersonne == idEmploye && e.ChangeType == ChangeType.VENTE)
                                       .ToList())
            {
                TotalSell += change.Montant; 
            }

            return TotalSell;
        }

        public double TotalBuyDeviseByEmploye(int idEmploye) {
            double TotalBuy = 0;
            foreach (Change change in _context
                                       .Changes
                                       .Where(e => e.employe.CodePersonne == idEmploye && e.ChangeType == ChangeType.ACHAT)
                                       .ToList())
            {
                TotalBuy += change.MontantConverted;
            }

            return TotalBuy;
        }

        public List<ChangeDetailedStatDTO> GetDetailedStatisticalChartByIdEmploye(int idEmploye)
        {
            List<ChangeDetailedStatDTO> changesDTO = new List<ChangeDetailedStatDTO>();

            ChangeDetailedStatDTO changeDetailedStatDTOBuy = new ChangeDetailedStatDTO();
            changeDetailedStatDTOBuy.TypeDevise = "BUY";
            ChangeDetailedStatDTO changeDetailedStatDTOSell = new ChangeDetailedStatDTO();
            changeDetailedStatDTOSell.TypeDevise = "SELL";

            List<DateTime> DateChangeBuy = new List<DateTime>();
            List<Double> MontantBuy = new List<Double>();
            List<Double> MontantConvertedBuy = new List<Double>();
            List<Double> ExchangeRateBuy = new List<Double>();

            List<DateTime> DateChangeSell = new List<DateTime>();
            List<Double> MontantSell = new List<Double>();
            List<Double> MontantConvertedSell = new List<Double>();
            List<Double> ExchangeRateSell = new List<Double>();

            foreach (Change change in _context
                                       .Changes
                                       .Where(e => e.employe.CodePersonne == idEmploye)
                                       .ToList())
            {
                if (change.ChangeType == ChangeType.ACHAT)
                {
                    DateChangeBuy.Add(change.DateChange);
                    ExchangeRateBuy.Add(change.ExchangeRate);
                    MontantBuy.Add(change.Montant);
                    MontantConvertedBuy.Add(change.MontantConverted);
                }
                else
                {
                    DateChangeSell.Add(change.DateChange);
                    ExchangeRateSell.Add(change.ExchangeRate);
                    MontantSell.Add(change.Montant);
                    MontantConvertedSell.Add(change.MontantConverted);
                }
            }

            changeDetailedStatDTOBuy.DateChange = DateChangeBuy;
            changeDetailedStatDTOBuy.ExchangeRate = ExchangeRateBuy;
            changeDetailedStatDTOBuy.Montant = MontantBuy;
            changeDetailedStatDTOBuy.MontantConverted = MontantConvertedBuy;

            changeDetailedStatDTOSell.DateChange = DateChangeSell;
            changeDetailedStatDTOSell.ExchangeRate = ExchangeRateSell;
            changeDetailedStatDTOSell.Montant = MontantSell;
            changeDetailedStatDTOSell.MontantConverted = MontantConvertedSell;

            changesDTO.Add(changeDetailedStatDTOBuy);
            changesDTO.Add(changeDetailedStatDTOSell);
            return changesDTO;
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
