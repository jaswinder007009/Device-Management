using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dm_backend.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;
using System.Web.Http.Results;
using System.Text.Json;
using System.Text.Json.Serialization;

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
        public IActionResult GetRequest()
        {
            return Ok(JsonSerializer.Serialize(new RequestModel()));
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
