using BanqueSI.Model.DTO;
using BanqueSI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanqueSI.Repository.IRepository
{
    public interface IEmailRepository : IDisposable
    {
        MailSentDTO SentEmail(MailSentDTO mail);
        List<MailSentDTO> GetEmailList(String To, int idPersonne);
        List<MailSentDTO> GetEmailSentList(String From, int idPersonne);
        List<MailSentDTO> GetEmailDeletedList(int idPersonne);
        List<MailSentDTO> GetEmailDraftList(String From, int idPersonne);
        MailResponseDTO DeleteEmail(int idEmail);
        MailResponseDTO DeleteEmailSpam(int idEmail);
        MailSentDTO DraftEmail(MailSentDTO mail);
        Mail SendingDraftEmail(MailSentDTO mail);
        MailResponseDTO ReadenMail(int idEmail);
        MailStatDTO MailStatisticalMail(int idEmploye);
        void Save();
    }
}
