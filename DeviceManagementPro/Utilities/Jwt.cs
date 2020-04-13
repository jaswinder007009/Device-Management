using DeviceManagementPro.Data;
using DeviceManagementPro.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DeviceManagementPro.Utilities
{
    public class Jwt : ControllerBase
    {
        private readonly SagardbContext _context;
        public IAuthRepository _repo;
        public IConfiguration _config;
       

        public Jwt(IAuthRepository repo, IConfiguration config, SagardbContext context)
        {
            _context = context;
            _repo = repo;
            _config = config;
        }


        public string GetToken(User usertorepo , string DefaultRole)
        {
          
             var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usertorepo.UserId.ToString()),
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

            return  tokenhandler.WriteToken(token);
        }

    }
}
