using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeviceManagementPro.Data;
using DeviceManagementPro.Models;
using Microsoft.AspNetCore.Authorization;
using DeviceManagementPro.Utilities;
using System;
using dm_backend.UserPass;

namespace dm_backend.Controllers
{
    [Authorize]

    [ApiController]
    [Route("api/[Controller]")]
    public class ForgotPassword : Controller
    {
        private readonly SagardbContext _context;
        private readonly IAuthRepository _repo;

        public ForgotPassword(SagardbContext logger, IAuthRepository repo)
        {
            _context = logger;
            _repo = repo;
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SendEmailTo(ForgotPasswordDto fpdto)
        {
            // if user exists
            if(await _repo.UserExists(fpdto.Email))
            {
                Console.WriteLine(fpdto.Email);
                var se = new SendEmail(_context);
                bool res = await se.Send_Email(fpdto.Email);
                Console.WriteLine(res);
                if(res==true)
                {
                    return Ok(new
                    { Status = "Sent Successfully "
                    })  ;
                }
                else
                { return Ok(new
                   {Status = "Not Sent"
                    }) ;
                }
            }
            else
            {
                return BadRequest("user not exist");
            }
        }



        // guid code than enter password
      










    }
}
