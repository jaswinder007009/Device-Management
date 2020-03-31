using System;
using Microsoft.AspNetCore.Mvc;
using dm_backend.Models;
using System.Text.Json;

namespace dm_backend.Controllers
{
    [Route("api/[controller]")]
    public class RequestController : ControllerBase
    {
        public AppDb Db { get; }

        public RequestController(AppDb db)
        {
            Db = db;
        }

        [HttpPost]
        public IActionResult PostRequest([FromBody]RequestModel req)
        {
            Db.Connection.Open();
            req.Db = Db;
            string result = null;
            try{
                result = req.AddRequest();
            }
            catch(NullReferenceException){
                return NoContent();
            }
            Db.Connection.Close();
            return Ok(result);
        }

        [HttpGet]
        [Route("pending")]
        public IActionResult GetRequest()
        {
            Db.Connection.Open();
            var requestObject = new RequestModel(Db);
            var result = requestObject.GetAllPendingRequests();
            Db.Connection.Close();
            return Ok(result);
        }
        
    }
}
