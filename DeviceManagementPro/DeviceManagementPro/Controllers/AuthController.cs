using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using DeviceManagementPro.Data;
using DeviceManagementPro.UserPass;
using DeviceManagementPro.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.EntityFrameworkCore.Internal;

namespace DeviceManagementPro.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    

    public class AuthController : ControllerBase
    {
        private readonly SagardbContext _context;
        public IAuthRepository _repo;
        public IConfiguration _config;
        private int userforlog;

        public AuthController(IAuthRepository repo, IConfiguration config, SagardbContext context)
        {
            _context = context;
            _repo = repo;
            _config = config;
        }
       
        [HttpPost("register")]

        public async Task<IActionResult> Register(UserForRegister userforreg)
        {

            userforreg.Email = userforreg.Email.ToLower();

            if (await _repo.UserExists(userforreg.Email))
                return BadRequest("Aleady Exist");

            var userTocreate = new UserAuth
            {
                Email = userforreg.Email
            };

            var createdUser = await _repo.Register(userTocreate, userforreg.Password);
            return StatusCode(201);



        }
      
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLogin Userforlog)
        {
            var usertorepo = await _repo.Login(Userforlog.Email, Userforlog.password);
            if (usertorepo == null)
                return Unauthorized();




            //linq qwery
            var entryPoint = (from us in _context.User
                              join rl in _context.UserToRole on us.UserId equals rl.UserId
                              join r in _context.Role on rl.RoleId equals r.RoleId
                              where us.UserId == usertorepo.Id
                              select new
                              {
                        
                                  Role = r.RoleName
                              }).ToList();

            Console.WriteLine("entry");
            String DefaultRole = entryPoint[0].Role;
            foreach (var invoice in entryPoint)
            {  
                Console.WriteLine(" {0}",
                     invoice.Role);
            }
            Console.WriteLine("exit"  );


            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usertorepo.Id.ToString()),
                new Claim(ClaimTypes.Name, usertorepo.Email, usertorepo.Email),
                new Claim(ClaimTypes.Role ,DefaultRole)
             };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Appsetting:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = cred
            };

            var tokenhandler = new JwtSecurityTokenHandler();

            var token = tokenhandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                
                token = tokenhandler.WriteToken(token)
            });



        }




    }




}