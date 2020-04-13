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
        [Route("{returnId}/accept")]
        public IActionResult AcceptReturn(int returnId)
        {
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "accept_return";
            cmd.CommandType = CommandType.StoredProcedure; 
            try{
                cmd.Parameters.AddWithValue("@return_id", returnId);
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