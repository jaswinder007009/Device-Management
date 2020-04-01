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
            catch(NullReferenceException e){
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
        [Route("{requestId}/accept")]
        public IActionResult AcceptRequest(int requestId)
        {
            Db.Connection.Open();
            RequestModel query = new RequestModel(Db);
            string result = null;
            try{
                result =query.AcceptDeviceRequest(requestId);
            }
            catch(Exception e){
                result="Device unavailable";
            }
            Db.Connection.Close();
            return  Ok(result);
        }

        [HttpDelete]
        [Route("{requestId}/cancel")]
        public IActionResult DeleteRequest(int requestId)
        {
            Db.Connection.Open();
            RequestModel query = new RequestModel(Db);
            string result = null;
            try{
                result =query.CancelRequest(requestId);
            }
            catch(Exception e){
                return NoContent();
            }
            Db.Connection.Close();
            return  Ok(result);
        }
        
    }
}
