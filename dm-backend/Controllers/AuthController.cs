using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using dm_backend.Data;
using dm_backend.EFModels;
using dm_backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.EntityFrameworkCore.Internal;

namespace dm_backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly EFDbContext _context;
        public IAuthRepository _repo;
        public IConfiguration _config;
        private int userforlog;

        public AuthController(IAuthRepository repo, IConfiguration config, EFDbContext context)
        {
            _context = context;
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]

        public async Task<IActionResult> Register(UserForAuth userforreg)
        {

            userforreg.Email = userforreg.Email.ToLower();

            // if (await _repo.UserExists(userforreg.Email))
            //     return BadRequest("Aleady Exist");

            var userTocreate = new UserAuth
            {
                Email = userforreg.Email
            };

            var createdUser = await _repo.Register(userTocreate, userforreg.Password);
            // return StatusCode(201);
            return Created("", createdUser);



        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForAuth Userforlog)
        {
            var usertorepo = await _repo.Login(Userforlog.Email, Userforlog.Password);
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

            var claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.NameIdentifier, usertorepo.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, usertorepo.Email, usertorepo.Email));
            foreach (var role in entryPoint)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Role));
            }

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
    public class UserForAuth
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}