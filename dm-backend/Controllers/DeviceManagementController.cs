using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UserManagement.Models;
using UserManagement.Utilities;
using System.Web.Http.Results;

namespace DeviceManagement.Controllers
{
    [Route("api/[controller]")]
    public class DeviceManagementController : Controller
    {

        public DeviceManagementController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        [Route("{email}/devices/returndates")]
        public IActionResult GetOneUser(string email)
        {
            Db.Connection.Open();
            var query = new User(Db);
            var result = query.getDeviceReturnDates(email);
            Db.Connection.Close();
            return Ok(result);
        }

        [HttpGet]
        [Route("{email}/devices/requeststatus")]
        public IActionResult GetOneUser(string email)
        {
            Db.Connection.Open();
            var query = new User(Db);
            var result = query.getDeviceRequestStatus(email);
            Db.Connection.Close();
            return Ok(result);
        }


        [HttpGet]
        [Route("/devices/count")]
        public IActionResult GetOneUser()
        {
            Db.Connection.Open();
            var query = new User(Db);
            var result = query.getDeviceCount();
            Db.Connection.Close();
            return Ok(result);
        }

        [HttpGet]
        [Route("/devices/request/statistics")]
        public IActionResult GetOneUser()
        {
            Db.Connection.Open();
            var query = new User(Db);
            var result = query.getRequestStatistics();
            Db.Connection.Close();
            return Ok(result);
        }

       
        public AppDb Db { get; }
    }

}
