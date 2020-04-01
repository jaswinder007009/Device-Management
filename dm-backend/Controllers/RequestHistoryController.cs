using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;
using System.Web.Http.Results;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace dm_backend.Controllers
{
    [Route("api/[controller]")]
    public class RequestHistoryController : ControllerBase
    {
        public AppDb Db { get; }

        public RequestHistoryController(AppDb db)
        {
            Db = db;
        }

 
        [HttpGet]
        [Route("{deviceAssignmentId}/accept")]
        public IActionResult AcceptReturn(int deviceAssignmentId)
        {
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "accept_return";
            cmd.CommandType = CommandType.StoredProcedure; 
            try{
                cmd.Parameters.AddWithValue("@assigned_id", deviceAssignmentId);
                cmd.ExecuteNonQuery();
            }
            catch(Exception e){
                return NoContent();
            }
            Db.Connection.Close();
            
            return  Ok("Return accepted");
        }
    }
}