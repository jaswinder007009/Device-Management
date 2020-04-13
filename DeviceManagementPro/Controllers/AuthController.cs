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
using DeviceManagementPro.Utilities;
using DeviceManagementPro.EntityFramework;

namespace DeviceManagementPro.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    

    public class AuthController : ControllerBase
    {
        private readonly SagardbContext _context;
        public IAuthRepository _repo;
        public IConfiguration _config;
        private int Userforlog;

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




}