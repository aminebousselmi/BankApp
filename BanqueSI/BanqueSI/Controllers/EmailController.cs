using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanqueSI.Model.DTO;
using BanqueSI.Model.Entities;
using BanqueSI.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BanqueSI.Controllers
{
    //[RequireHttps]
    //-- REST API ACCOUNT CONTROLLER 
    public class EmailController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly IEmailRepository _emailRepository;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public EmailController(IEmailRepository _emailRepository)
        {
            //-- DEPENDENCY INJECTION
            this._emailRepository = _emailRepository;
            //-- END DEPENDENCY INJECTION
        }
        //-- END CONSTRUCTOR

        //-- APIS

        //-- SENT EMAIL
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpPost("api/SentEmail")]
        public MailSentDTO SentEmail([FromBody] MailSentDTO mail)
        {
            return _emailRepository.SentEmail(mail);
        }
        //-- END SENT EMAIL

        //-- DRAFT EMAIL
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpPost("api/DraftEmail")]
        public MailSentDTO DraftEmail([FromBody] MailSentDTO mail)
        {
            return _emailRepository.DraftEmail(mail);
        }
        //-- END DRAFT EMAIL

        //-- GET DRAFT EMAIL
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetEmailDraftList/{From}/{idPersonne}")]
        public List<MailSentDTO> GetEmailDraftList(String From,int idPersonne)
        {
            return _emailRepository.GetEmailDraftList(From,idPersonne);
        }
        //-- END GET DRAFT EMAIL


        //-- GET DRAFT EMAIL
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpPost("api/SendingDraftEmail")]
        public Mail SendingDraftEmail([FromBody] MailSentDTO mail)
        {
            return _emailRepository.SendingDraftEmail(mail);
        }
        //-- END GET DRAFT EMAIL


        //-- GET LIST EMAIL BY EMPLOYE
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/ListEmail/{To}/{idPersonne}")]
        public List<MailSentDTO> GetEmailList(String To,int idPersonne)
        {
            return _emailRepository.GetEmailList(To,idPersonne);
        }
        //-- END GET LIST EMAIL BY EMPLOYE

        //-- GET LIST EMAIL From BY EMPLOYE
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/ListEmailFrom/{From}/{idPersonne}")]
        public List<MailSentDTO> GetEmailSentList(String From, int idPersonne)
        {
            return _emailRepository.GetEmailSentList(From,idPersonne);
        }
        //-- END GET LIST From EMAIL BY EMPLOYE

        //-- DELETING EMAIL
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/DeleteEmail/{idEmail}")]
        public MailResponseDTO DeleteEmail(int idEmail)
        {
            return _emailRepository.DeleteEmail(idEmail);
        }
        //-- END DELETING EMAIL

        //-- DELETING EMAIL TO SPAM
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/DeleteEmailSpam/{idEmail}")]
        public MailResponseDTO DeleteEmailSpam(int idEmail)
        {
            return _emailRepository.DeleteEmailSpam(idEmail);
        }
        //-- END DELETING EMAIL TO SPAM

        //-- DELETING EMAIL TO SPAM
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/MailStatisticalMail/{idEmploye}")]
        public MailStatDTO MailStatisticalMail(int idEmploye)
        {
            return _emailRepository.MailStatisticalMail(idEmploye);
        }
        //-- READEN EMAIL 
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/ReadenMail/{idEmail}")]
        public MailResponseDTO ReadenMail(int idEmail)
        {
            return _emailRepository.ReadenMail(idEmail);
        }

        //-- END READEN EMAIL
        //-- SECURING API 
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //-- END SECURING API 
        [HttpGet("api/GetEmailDeletedList/{idPersonne}")]
        public List<MailSentDTO> GetEmailDeletedList(int idPersonne)
        {
            return _emailRepository.GetEmailDeletedList(idPersonne);
        }
        //-- END GET DELETING EMAIL

        //-- END APIS
    }
}