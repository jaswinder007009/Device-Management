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
using dm_backend.Utilities;
using dm_backend.EntityFramework;
using dm_backend.Data;
using Microsoft.EntityFrameworkCore;

namespace dm_backend.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    

    public class AuthController : ControllerBase
    {
        private readonly efdbcontext _context;
        public IAuthRepository _repo;
        public IConfiguration _config;
        private int Userforlog;

        public AuthController(IAuthRepository repo, IConfiguration config, efdbcontext context)
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

            var userTocreate = new User{ Email = userforreg.Email};

            var createdUser = await _repo.Register(userTocreate, userforreg.Password);
            return StatusCode(201);
        }
      
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLogin Userforlog)
        {
           
            var usertorepo = await _repo.Login(Userforlog.Email, Userforlog.password);
            if (usertorepo == null)
                return Unauthorized();

            string DefaultRole = new EfQuery(_context).GetRole(usertorepo.UserId);
            var token = new Jwt(_repo, _config ,_context).GetToken(usertorepo, DefaultRole);
            return Ok(new
            {
              token 
            });
        }




    }




<<<<<<< HEAD
=======
            var result = new RedirectResult("http://127.0.0.1:8080/dashboard.html?token=" + tokenhandler.WriteToken(token) + "&id=" + usertorepo.Id.ToString());
            return result;
        }
    }
    public class UserForAuth
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
>>>>>>> e830e7b4a7375fc537f9a53c0f44ed2177798e04
}