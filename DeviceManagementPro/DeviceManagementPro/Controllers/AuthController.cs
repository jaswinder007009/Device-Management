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

namespace DeviceManagementPro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        public IAuthRepository _repo;
        public IConfiguration _config;


        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }
        [HttpPost("register")]

        public async Task<IActionResult> Register(UserForRegister userforreg)
        {

            userforreg.name = userforreg.name.ToLower();

            if (await _repo.UserExists(userforreg.name))
                return BadRequest("Aleady Exist");

            var userTocreate = new UserAuth
            {
                Name = userforreg.name
            };

            var createdUser = await _repo.Register(userTocreate, userforreg.Password);
            return StatusCode(201);



        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLogin Userforlog)
        {
            var usertorepo = await _repo.Login(Userforlog.name, Userforlog.password);
            if (usertorepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usertorepo.Id.ToString()),
                new Claim(ClaimTypes.Name, usertorepo.Name, usertorepo.Name)
             };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Appsettings:Token").Value));

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