using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeviceManagementPro.Data;
using DeviceManagementPro.Models;
using Microsoft.AspNetCore.Authorization;

namespace DeviceManagementPro.Controllers
{
    [Authorize]
   
    [ApiController]
    [Route("api/[Controller]")]
    public class UserController : Controller
    {
        private readonly SagardbContext _context;

        public UserController(SagardbContext logger)
        {
            _context = logger;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.User.ToListAsync();
            return Ok(values);
        }
       
        [HttpGet("{id}")]
    
            public async Task<IActionResult> GetValuesbyid(int id)
            {
                var values = await _context.User.FirstOrDefaultAsync(x => x.UserId ==id  );
                return Ok(values);
            }
        



    }

}
