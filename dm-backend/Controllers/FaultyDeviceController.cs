using System;
using dm_backend.Logics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;

namespace dm_backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class FaultyDeviceController : ControllerBase
    {
        public AppDb Db { get; }

        public FaultyDeviceController(AppDb db)
        {
            Db = db;
        }

           [Authorize(Roles = "admin")]
        [HttpGet]
        public IActionResult GetDeviceLisT()
        {
            int userId = -1;
            string searchField = "";
            string serialnumber = null;
            string sortField = "";
            string sortDirection = "asc";
            int page = -1;
            int size = -1;
            string status = null;



            if (!string.IsNullOrEmpty(HttpContext.Request.Query["page"]))
                page = Convert.ToInt32(HttpContext.Request.Query["page"]);

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["serial-number"]))
                serialnumber = (HttpContext.Request.Query["serial-number"]);

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["page-size"]))
                size = Convert.ToInt32(HttpContext.Request.Query["page-size"]);

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["id"]))
                userId = Convert.ToInt32(HttpContext.Request.Query["id"]);

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["search"]))
                searchField = HttpContext.Request.Query["search"];

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["sort"]))
                sortField = HttpContext.Request.Query["sort"];

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["direction"]))
                sortDirection = HttpContext.Request.Query["direction"];

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["status"]))
                status = HttpContext.Request.Query["status"];

            Db.Connection.Open();


            var fault = new FaultyDevice(Db);

                    var result =  fault.getFaultyDevice(userId, searchField, serialnumber  , status  ,  sortField, sortDirection, page, size);

            Db.Connection.Close();
            return new OkObjectResult(result);

        }




        [HttpGet("{status}/action")]
        public IActionResult get(string action)
        {


            Db.Connection.Open();

           // var x =  new 




            Db.Connection.Close();

          
            return Ok();
           

        }
    }
}
