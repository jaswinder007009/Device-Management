using System;
using System.Data;
using System.Data.Common;
using Microsoft.AspNetCore.Mvc;

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