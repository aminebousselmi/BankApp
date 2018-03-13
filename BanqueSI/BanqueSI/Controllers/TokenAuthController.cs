using System;
//using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using BanqueSI.Model.Entities;
using BanqueSI;
using BanqueSI.Repository.IRepository;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using BanqueSI.DTO;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using System.Text;
using System.Security.Cryptography;

namespace ASPNETCoreAngularJWT
{
    //[RequireHttps]
    //-- BUSINESS LOGIC TOKEN AUTH
    public class TokenAuthController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly BanqueSI.Model.STBDbContext dbContext;
        /*private readonly UserManager<Personne> _userManager;
        private readonly SignInManager<Personne> _signInManager;
        private readonly IConfiguration _configuration;*/
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public TokenAuthController(
            BanqueSI.Model.STBDbContext dbContext)
        {
            this.dbContext = dbContext;
            /*_userManager = userManager;
            _signInManager = signInManager;
            this._configuration = configuration;*/
        }
        //-- END CONSTRUCTOR

        //-- LOGIN API FUNCTION
        [HttpPut("Login")]
        public IActionResult Login([FromBody]Employe user)
        {
            var sha1 = new SHA1CryptoServiceProvider();
            var data = Encoding.ASCII.GetBytes(user.Password);
            var sha1data = sha1.ComputeHash(data);
            Employe existUser = dbContext.Employes.FirstOrDefault(u => u.Username == user.Username && u.Password == Convert.ToBase64String(sha1data));

            if (existUser != null)
            {

                var requestAt = DateTime.Now;
                var expiresIn = requestAt + TokenAuthOption.ExpiresSpan;
                var token = GenerateToken(existUser, expiresIn);

                return Json(new RequestResult
                {
                    State = RequestState.Success,
                    Data = new
                    {
                        requertAt = requestAt,
                        expiresIn = TokenAuthOption.ExpiresSpan.TotalSeconds,
                        tokeyType = TokenAuthOption.TokenType,
                        accessToken = token
                    },
                    Msg = "Login Successful Welcome"
                });
            }
            else
            {
                return Json(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Username or password is invalid"
                });
            }
        }
        //-- END LOGIN API FUNCTION

        //-- GENERATING AUTHENTICATION TOKEN
        private string GenerateToken(Employe user, DateTime expires)
        {
            var handler = new JwtSecurityTokenHandler();

            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(user.Username, "TokenAuth"),
                new[] { new Claim("ID", user.CodePersonne.ToString())}
            );

            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = TokenAuthOption.Issuer,
                Audience = TokenAuthOption.Audience,
                SigningCredentials = TokenAuthOption.SigningCredentials,
                Subject = identity,
                Expires = expires
            });
            return handler.WriteToken(securityToken);
        }
        //-- END GENERATING AUTHENTICATION TOKEN

        //-- GETTING USER INFORMATION
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("api/username")]
        public IActionResult GetUserInfo()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return Json(new RequestResult
            {
                State = RequestState.Success,
                Data = new { UserName = claimsIdentity.Name }
            });
        }
        //-- END GETTING USER INFORMATION
    }
}

