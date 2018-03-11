using System;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BanqueSI.Model.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using BanqueSI.Common;
using Microsoft.Extensions.Options;
using BanqueSI.Helpers;
using Newtonsoft.Json;
using BanqueSI.Model.DTO;
using MimeKit;
using MailKit.Net.Smtp;


namespace ASPNETCoreAngularJWT
{
    [RequireHttps]
    //-- BUSINESS LOGIC TOKEN AUTH
    public class TokenAuthController : Controller
    {
        //-- DBContext // ATTRIBUTS
        private readonly BanqueSI.Model.STBDbContext dbContext;
        private readonly UserManager<Personne> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        //-- END DBContext // ATTRIBUTS

        //-- CONSTRUCTOR
        public TokenAuthController(
                BanqueSI.Model.STBDbContext dbContext,
                UserManager<Personne> _userManager,
                 IJwtFactory jwtFactory,
                 IOptions<JwtIssuerOptions> jwtOptions
            )
        {
            this.dbContext = dbContext;
            this._userManager = _userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }
        //-- END CONSTRUCTOR

        /*public async  Task ConfirmEmail(string userId, string codeC)
        {
            if (userId == null || codeC == null)
                new OkObjectResult("userid or code null");

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                throw new ApplicationException($"Unable to load user with ID '{userId}'.");

            var result = await _userManager.ConfirmEmailAsync(user, codeC);
            if (result.Succeeded)
             new OkObjectResult("Confirmed User") ;
        }*/
        // POST api/accounts
        [HttpPost("api/register")]
        public async Task<IActionResult> Post([FromBody]Employe model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userManager.CreateAsync(model, model.PasswordHash);
            await _userManager.AddToRoleAsync(model, "EMPLOYE");
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await dbContext.SaveChangesAsync();
            //var code = await _userManager.GenerateEmailConfirmationTokenAsync(model);
            /*var callbackurl = Url.Action(
               controller: "TokenAuthController",
               action: "ConfirmEmail",
               values: new { userId = model.Id, codeC = code},
               protocol: Request.Scheme);*/

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("STBApp", "amine.bousselmi1996@gmail.com"));
            message.To.Add(new MailboxAddress(model.NomPersonne, model.Email));
            message.Subject = "Email confirmation";
            message.Body = new TextPart()
            {
                Text = "<br/><br/>We are excited to tell you that your account is" +
                " successfully created." 
            };
            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate("amine.bousselmi1996@gmail.com", "Jaimelavie123");
                client.Send(message);
                client.Disconnect(true);
            }

                return new OkObjectResult("Account created");
        }
        //-- LOGIN API FUNCTION
        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] PersonneDTO credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.Email, credentials.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid email or password.", ModelState));
            }
            
            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.Email, _jwtOptions, new Newtonsoft.Json.JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByEmailAsync(email);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);
            System.Diagnostics.Debug.WriteLine("1111111111111" + _userManager.IsInRoleAsync(userToVerify, "EMPLOYE").Result);
            if (await _userManager.IsInRoleAsync(userToVerify, "EMPLOYE") == false)
            {
                return await Task.FromResult<ClaimsIdentity>(null);
            }

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(email, userToVerify.Id));
            }
            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
        //-- END GENERATING AUTHENTICATION TOKEN
    }
}

