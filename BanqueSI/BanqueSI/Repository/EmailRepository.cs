using BanqueSI.Model;
using BanqueSI.Model.DTO;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository
{
    public class EmailRepository : IDisposable, IRepository.IEmailRepository
    {
        //-- ATTRIBUTS
        private STBDbContext _context;
        private bool disposed = false;
        //-- END ATTRIBUTS

        //-- CONSTRUCTOR
        public EmailRepository(STBDbContext _context)
        {
            this._context = _context;
        }
        //--END CONSTRUCTOR

        //-- METHODES
        public List<MailSentDTO> GetEmailDraftList(String From , int idPersonne)
        {
            List<MailSentDTO> mailsDTO = new List<MailSentDTO>();

            foreach (Mail mail in _context
                                            .Mails
                                            .Include(e => e.Personne)
                                            .Where(e => e.From == From && e.Sent == false && e.Personne.CodePersonne == idPersonne)
                                            .ToList())
            {
                MailSentDTO mailSentDTO = new MailSentDTO();
                mailSentDTO.DateEmail = mail.DateEmail;
                mailSentDTO.Deleted = mail.Deleted;
                mailSentDTO.From = mail.From;
                mailSentDTO.MessageEmail = mail.MessageEmail;
                mailSentDTO.ObjectEmail = mail.ObjectEmail;
                mailSentDTO.Sent = mail.Sent;
                mailSentDTO.To = mail.To;
                mailSentDTO.IdEmail = mail.IdEmail;
                mailSentDTO.CodePersonne = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().CodePersonne;
                mailSentDTO.NomPersonne = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().NomPersonne;
                mailSentDTO.Username = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().Username;
                mailsDTO.Add(mailSentDTO);
            }
            return mailsDTO;
        }

        public MailSentDTO DraftEmail(MailSentDTO mail)
        {
            Mail mailC = new Mail();
            mailC.From = mail.From;
            mailC.To = mail.To;
            mailC.MessageEmail = mail.MessageEmail;
            mailC.ObjectEmail = mail.ObjectEmail;
            mailC.Personne = _context.Personnes.Find(mail.CodePersonne);
            mailC.DateEmail = DateTime.Now;
            mailC.Deleted = false;
            mailC.Sent = false;
            _context.Mails.Add(mailC);
            Save();
            return mail;

        }

        public MailResponseDTO DeleteEmailSpam(int idEmail)
        {
            MailResponseDTO mailResponseDTO = new MailResponseDTO();
            mailResponseDTO.IdEmail = idEmail;
            mailResponseDTO.MessageResult = "Mail Deleted Successfully";
            Mail mail = _context.Mails.Find(idEmail);
            mail.Deleted = true;
            Save();

            return mailResponseDTO;
        }
        public MailResponseDTO DeleteEmail(int idEmail){
            MailResponseDTO mailResponseDTO = new MailResponseDTO();
            mailResponseDTO.IdEmail = idEmail;
            mailResponseDTO.MessageResult = "Mail Deleted Successfully";
            _context.Mails.Remove(_context.Mails.Find(idEmail));
            Save();
            return mailResponseDTO;
        }

        public List<MailSentDTO> GetEmailSentList(String From, int idPersonne)
        {
            List<MailSentDTO> mailsDTO = new List<MailSentDTO>();

            foreach (Mail mail in _context
                                            .Mails
                                            .Include(e => e.Personne)
                                            .Where(e => e.From == From && e.Deleted == false && e.Sent == true && e.Personne.CodePersonne == idPersonne)
                                            .ToList())
            {
                MailSentDTO mailSentDTO = new MailSentDTO();
                mailSentDTO.DateEmail = mail.DateEmail;
                mailSentDTO.Deleted = mail.Deleted;
                mailSentDTO.From = mail.From;
                mailSentDTO.MessageEmail = mail.MessageEmail;
                mailSentDTO.ObjectEmail = mail.ObjectEmail;
                mailSentDTO.Sent = mail.Sent;
                mailSentDTO.To = mail.To;
                mailSentDTO.IdEmail = mail.IdEmail;
                mailSentDTO.CodePersonne = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().CodePersonne;
                mailSentDTO.NomPersonne = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().NomPersonne;
                mailSentDTO.Username = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().Username;
                mailsDTO.Add(mailSentDTO);
            }
            return mailsDTO;

        }

        public Mail SendingDraftEmail(MailSentDTO mail)
        {
            Mail mailDrafted = _context.Mails.Find(mail.IdEmail);

            mailDrafted.Sent = true;
            mailDrafted.DateEmail = DateTime.Now;
            mailDrafted.MessageEmail = mail.MessageEmail;
            mailDrafted.ObjectEmail = mail.ObjectEmail;
            mailDrafted.To = mail.To;

            Mail mailCopie = new Mail();
            mailCopie.From = mailDrafted.From;
            mailCopie.To = mailDrafted.To;
            mailCopie.MessageEmail = mail.MessageEmail;
            mailCopie.ObjectEmail = mail.ObjectEmail;
            mailCopie.Personne = _context.Personnes.Where(e => e.Email == mail.To).FirstOrDefault();
            mailCopie.DateEmail = DateTime.Now;
            mailCopie.Deleted = false;
            mailCopie.Sent = true;
            mailCopie.Readen = false;
            _context.Mails.Add(mailCopie);
            Save();
            return mailCopie;
        }
        public MailSentDTO SentEmail(MailSentDTO mail)
        {
            Mail mailC = new Mail();
            mailC.From = mail.From;
            mailC.To = mail.To;
            mailC.MessageEmail = mail.MessageEmail;
            mailC.ObjectEmail = mail.ObjectEmail;
            mailC.Personne = _context.Personnes.Find(mail.CodePersonne);
            mailC.DateEmail = DateTime.Now;
            mailC.Deleted = false;
            mailC.Sent = true;
            mailC.Readen = false;
            _context.Mails.Add(mailC);

            Mail mailCopie = new Mail();
            mailCopie.From = mail.From;
            mailCopie.To = mail.To;
            mailCopie.MessageEmail = mail.MessageEmail;
            mailCopie.ObjectEmail = mail.ObjectEmail;
            mailCopie.Personne = _context.Personnes.Where(e => e.Email == mail.To).FirstOrDefault();
            mailCopie.DateEmail = DateTime.Now;
            mailCopie.Deleted = false;
            mailCopie.Sent = true;
            mailCopie.Readen = false;
            _context.Mails.Add(mailCopie);
            Save();
            return mail;
        }

        public List<MailSentDTO> GetEmailList(String To, int idPersonne)
        {
            List<MailSentDTO> mailsDTO = new List<MailSentDTO>();
            foreach (Mail mail in _context
                                            .Mails
                                            .Include(e => e.Personne)
                                            .Where(e => e.To == To && e.Deleted == false && e.Sent == true && e.Personne.CodePersonne == idPersonne)
                                            .ToList())
            {
                MailSentDTO mailSentDTO = new MailSentDTO();
                mailSentDTO.DateEmail = mail.DateEmail;
                mailSentDTO.Deleted = mail.Deleted;
                mailSentDTO.From = mail.From;
                mailSentDTO.MessageEmail = mail.MessageEmail;
                mailSentDTO.ObjectEmail = mail.ObjectEmail;
                mailSentDTO.Sent = mail.Sent;
                mailSentDTO.To = mail.To;
                mailSentDTO.IdEmail = mail.IdEmail;
                mailSentDTO.Readen = mail.Readen;
                mailSentDTO.CodePersonne = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().CodePersonne;
                mailSentDTO.NomPersonne = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().NomPersonne;
                mailSentDTO.Username = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().Username;
                mailsDTO.Add(mailSentDTO);
            }
            return mailsDTO;
        }

        public MailStatDTO MailStatisticalMail(int idEmploye)
        {
            MailStatDTO mailStatDTO = new MailStatDTO();
            Employe emp = _context.Employes.Find(idEmploye);
    
            foreach (Mail mail in _context.Mails.Where(e => e.Personne.CodePersonne == idEmploye).ToList())
            {
                if (mail.Sent == true && mail.To == emp.Email && mail.Deleted == false)
                {
                    mailStatDTO.CountInbox += 1;
                }

                if (mail.Sent == true && mail.To == emp.Email && mail.Deleted == false && mail.Readen == false)
                {
                    mailStatDTO.CountReaden += 1;
                }

                if (mail.Sent == true && mail.From == emp.Email && mail.Deleted == false)
                {
                    mailStatDTO.CountSent += 1; 
                }

                if (mail.Sent == false && mail.Deleted == false)
                {
                    mailStatDTO.CountDraft += 1;
                }

                if (mail.Deleted == true)
                {
                    mailStatDTO.CountDeleted += 1;
                }
            }
            return mailStatDTO;
        }
        public MailResponseDTO ReadenMail(int idEmail)
        {
            MailResponseDTO mailResponseDTO = new MailResponseDTO();
            _context.Mails.Find(idEmail).Readen = true;
            Save();
            mailResponseDTO.IdEmail = idEmail;
            mailResponseDTO.MessageResult = "Mail Readen";
            return mailResponseDTO;
        }
        public Employe GetEmployeByEmail(String email)
        {
            return _context
                             .Employes
                             .Where(e => e.Email == email)
                             .FirstOrDefault();
        }

        public List<MailSentDTO> GetEmailDeletedList(int idPersonne)
        {
            List<MailSentDTO> mailsDTO = new List<MailSentDTO>();

            foreach (Mail mail in _context
                                            .Mails
                                            .Include(e => e.Personne)
                                            .Where(e => e.Deleted == true && e.Personne.CodePersonne == idPersonne)
                                            .ToList())
            {
                MailSentDTO mailSentDTO = new MailSentDTO();
                mailSentDTO.DateEmail = mail.DateEmail;
                mailSentDTO.Deleted = mail.Deleted;
                mailSentDTO.From = mail.From;
                mailSentDTO.MessageEmail = mail.MessageEmail;
                mailSentDTO.ObjectEmail = mail.ObjectEmail;
                mailSentDTO.Sent = mail.Sent;
                mailSentDTO.To = mail.To;
                mailSentDTO.IdEmail = mail.IdEmail;
                mailSentDTO.CodePersonne = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().CodePersonne;
                mailSentDTO.NomPersonne = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().NomPersonne;
                mailSentDTO.Username = _context.Employes.Where(e => e.Email == mail.From).FirstOrDefault().Username;
                mailsDTO.Add(mailSentDTO);
            }

            return mailsDTO;
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

        //-- SAVING DATA IN DATABASE
        public void Save()
        {
            _context.SaveChanges();
        }
        //-- END SAVING DATA IN DATABASE

        //-- END METHODES
    }
}
