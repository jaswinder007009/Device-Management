using System;
using System.Threading.Tasks;
using dm_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace dm_backend.Controllers
{
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        public DeviceController(AppDb db)
        {
            Db = db;
        }


        [HttpGet]
        [Route("previous_device/{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            string ToSearch = String.Empty; if (!string.IsNullOrEmpty(HttpContext.Request.Query["search"])) ToSearch = HttpContext.Request.Query["search"];
            await Db.Connection.OpenAsync();
            var query = new employee(Db);
            var result = await query.getPreviousDevice(id,ToSearch);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }
        [HttpGet("current_device/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            string ToSearch = String.Empty; if (!string.IsNullOrEmpty(HttpContext.Request.Query["search"])) ToSearch = HttpContext.Request.Query["search"];
            await Db.Connection.OpenAsync();
            var query = new employee(Db);
            var result = await query.getCurrentDevice(id,ToSearch);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }
        public AppDb Db { get; }
    }

}
