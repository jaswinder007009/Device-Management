using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeviceManagementPro.Data;
using DeviceManagementPro.Models;

namespace DeviceManagementPro.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly SagardbContext _context;

        public UserController(SagardbContext logger)
        {
            _context = logger;
        }
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.User.ToListAsync();
            return Ok(values);
        }

        public IActionResult Privacy()
        {
            return View();
        }



    }

}
