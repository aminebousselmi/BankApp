using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using BanqueSI.Model;
using BanqueSI.Model.DTO;
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

        //-- GET STATISTICAL CHECK OPERATIONS BY EMPLOYE
        public StatisticalCheckOperationsDTO GetStatisticalCheckOperationsByEmploye(int idEmploye)
        {
            //-- ENTRIES
            Double SumAmountCheck = 0;
            Double MinAmountCheck = 0;
            Double MaxAmountCheck = 0;
            Double AverageAmountCheck = 0;
            //-- END ENTRIES

            List<Cheque> cheques = _context
                                            .Cheques
                                            .Where(c => c.Employe.CodePersonne == idEmploye)
                                            .ToList();

            foreach (Cheque cheque in cheques)
            {
                //-- SUM
                SumAmountCheck += 1;
                //-- END SUM

                // Min
                if (cheque.Montant < 1000)
                {
                    MinAmountCheck += 1;
                }
                //-- END Min

                // Average
                if (cheque.Montant >= 1000 && cheque.Montant < 10000)
                {
                    AverageAmountCheck += 1;
                }
                //-- END Average

                //-- Max
                if (cheque.Montant >= 10000)
                {
                    MaxAmountCheck += 1;
                }
                //-- END Max
            }

            StatisticalCheckOperationsDTO statisticalCheckOperations = new StatisticalCheckOperationsDTO();
            statisticalCheckOperations.MinPercentageAmountCheck = (MinAmountCheck*100) /SumAmountCheck;
            statisticalCheckOperations.AveragePercentageAmountCheck = (AverageAmountCheck* 100) / SumAmountCheck;
            statisticalCheckOperations.MaxPercentageAmountCheck = (MaxAmountCheck * 100) / SumAmountCheck;

            return statisticalCheckOperations;

        }
        //-- END GET STATISTICAL CHECK OPERATIONS BY EMPLOYE

        //-- GET STATISTICAL LINE CHECK
        public List<List<StatisticalLineCheckDTO>> GetStatisticalLineCheckByEmploye(int idEmploye)
        {
            List<List<StatisticalLineCheckDTO>> ListStatistical = new List<List<StatisticalLineCheckDTO>>();

            List<StatisticalLineCheckDTO> MinStatisticalLine = new List<StatisticalLineCheckDTO>();
            List<StatisticalLineCheckDTO> MaxStatisticalLine = new List<StatisticalLineCheckDTO>();
            List<StatisticalLineCheckDTO> AverageStatisticalLine = new List<StatisticalLineCheckDTO>();

            List<Cheque> cheques = _context
                                            .Cheques
                                            .Where(c => c.Employe.CodePersonne == idEmploye)
                                            .ToList();

            foreach (Cheque cheque in cheques)
            {

                // Min
                if (cheque.Montant < 1000)
                {
                    StatisticalLineCheckDTO statisticalMin = new StatisticalLineCheckDTO();
                    statisticalMin.DateVersement = cheque.DateV;
                    statisticalMin.Montant = cheque.Montant;
                    MinStatisticalLine.Add(statisticalMin);
                }
                //-- END Min

                // Average
                if (cheque.Montant >= 1000 && cheque.Montant < 10000)
                {
                    StatisticalLineCheckDTO statisticalAverage = new StatisticalLineCheckDTO();
                    statisticalAverage.DateVersement = cheque.DateV;
                    statisticalAverage.Montant = cheque.Montant;
                    AverageStatisticalLine.Add(statisticalAverage);
                }
                //-- END Average

                //-- Max
                if (cheque.Montant >= 10000)
                {
                    StatisticalLineCheckDTO statisticalMax = new StatisticalLineCheckDTO();
                    statisticalMax.DateVersement = cheque.DateV;
                    statisticalMax.Montant = cheque.Montant;
                    MaxStatisticalLine.Add(statisticalMax);
                }
                //-- END Max
            }
            ListStatistical.Add(MinStatisticalLine);
            ListStatistical.Add(MaxStatisticalLine);
            ListStatistical.Add(AverageStatisticalLine);

            return ListStatistical;

        }
        //-- END GET STATISTICAL LINE CHECK

        //-- GET LIST CHECK BY EMPLOYE
        public List<PaymentCheckDTO> GetListCheckByEmploye(int idEmploye)
        {
               List<PaymentCheckDTO> paymentsChequeDTO = new List<PaymentCheckDTO>();
               foreach (Cheque cheque in  _context
                                        .Cheques
                                        .Include(c => c.Compte)
                                        .Where(c => c.Employe.CodePersonne == idEmploye)
                                        .ToList())
               {
                    PaymentCheckDTO paymentCheckDTO = new PaymentCheckDTO();
                    paymentCheckDTO.BankName = cheque.BankName;
                    paymentCheckDTO.CINProprietaire = cheque.CINProprietaire;
                    paymentCheckDTO.DateV = cheque.DateV;
                    paymentCheckDTO.IdC = cheque.idC;
                    paymentCheckDTO.Montant = cheque.Montant;
                    paymentCheckDTO.NomProprietaire = cheque.NomProprietaire;
                    paymentCheckDTO.NumeroC = cheque.NumeroC;
                    paymentCheckDTO.PrenomProprietaire = cheque.PrenomProprietaire;

                    paymentCheckDTO.CodeCompte = _context.Comptes.Find(cheque.Compte.CodeCompte).CodeCompte;
                    paymentCheckDTO.DateCreation = _context.Comptes.Find(cheque.Compte.CodeCompte).DateCreation;
                    paymentCheckDTO.Decouvert = _context.Comptes.Find(cheque.Compte.CodeCompte).Decouvert;
                    paymentCheckDTO.Solde = _context.Comptes.Find(cheque.Compte.CodeCompte).Solde;
                    paymentCheckDTO.Taux = _context.Comptes.Find(cheque.Compte.CodeCompte).Taux;
                    paymentCheckDTO.Type= _context.Comptes.Find(cheque.Compte.CodeCompte).Type;
                paymentsChequeDTO.Add(paymentCheckDTO);
            }
            return paymentsChequeDTO;
        }
        //-- END GET LIST CHECK BY EMPLOYE

        //-- Payment Cheque Operation
        public Cheque VersementCheque(PaymentCheckDTO c)
        {
            c.DateV = DateTime.Now;

            if (c.CodeCompte == null)
            {
                throw new NullReferenceException("Account Number Must not be null ");
            }

            Compte compte = _context.Comptes.Find(c.CodeCompte);
            //-- EXCEPTION
            if (c.BankName == null || c.CINProprietaire == 0  || c.Montant == 0 || c.NomProprietaire == null ||c.NumeroC == 0 || c.PrenomProprietaire == null)
            {
                throw new NullReferenceException("Some Information Are Not Loaded Correctly Try Again ");
            }

            if(c.CINProprietaire.ToString().Length != 8)
            {
                throw new NullReferenceException("Identity Number Must Be Composed From 8 Number ");
            }

            if(c.NumeroC.ToString().Length != 11)
            {
                throw new NullReferenceException("Check Number Must Be Composed From 11 Number ");
            }
            //-- END EXCEPTION

            Cheque cheque = new Cheque();
            cheque.BankName = c.BankName;
            cheque.CINProprietaire = c.CINProprietaire;
            cheque.Compte = compte;
            cheque.DateV = c.DateV;
            cheque.idC = c.IdC;
            cheque.Montant = c.Montant;
            cheque.NomProprietaire = c.NomProprietaire;
            cheque.NumeroC = c.NumeroC;
            cheque.PrenomProprietaire = c.PrenomProprietaire;
            cheque.Employe = _context.Employes.Find(c.IdEmploye);

            //-- SAVING DATA IN DATABASE
            _context.Cheques.Add(cheque);
            //-- END SAVING DATA IN DATABASE
            compte.Solde += cheque.Montant;
            //-- COMIITING
            Save();
            //-- END COMMITING

            return cheque;
        }
        //-- END Payment Cheque Operation

        //-- COMMITING
        public void Save()
        {
            _context.SaveChanges();
        }
        //-- END COMMITING

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
