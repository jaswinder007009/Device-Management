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

        [HttpGet]
        [Route("{requestId}/reject")]
        public IActionResult RejectRequest(int requestId, [System.Web.Http.FromUri]int id){
            Db.Connection.Open();
            RequestModel query = new RequestModel(Db);
            query.requestId = requestId;
            try{
                query.RejectDeviceRequest(id);
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                return BadRequest("An error occured while rejecting the request");
            }
            Db.Connection.Close();
            return Ok("Request rejected");
        }
        
    }
}
