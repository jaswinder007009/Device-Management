using System;
using System.Data;
using System.Data.Common;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dm_backend.Logics;
using dm_backend.Models;
using Microsoft.AspNetCore.Authorization;
using MySql.Data.MySqlClient;


namespace dm_backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        public AppDb Db { get; }

        public NotificationController(AppDb db)
        {
            Db = db;
        }
        
        [Authorize(Roles="admin")]
        [HttpPost]
        public IActionResult PostNotification([FromBody]NotificationModel notify)
        {
            Db.Connection.Open();
            notify.Db = Db;
            string result = null;
            try{
                result = notify.AddNotification();
            }
            catch(NullReferenceException){
                return NoContent();
            }
            Db.Connection.Close();
            return Ok(result);
        }

        [HttpGet]
         public IActionResult GetNotification()
        {
            int userId=  -1;
            string searchField=(string) HttpContext.Request.Query["search"] ?? "";
            string sortField=(string) HttpContext.Request.Query["sort"] ?? "notification_date";
            string sortDirection=(string)HttpContext.Request.Query["direction"] ?? "asc";
            if(!string.IsNullOrEmpty(HttpContext.Request.Query["id"]))
            userId=Convert.ToInt32((string)HttpContext.Request.Query["id"]);
            sortDirection = (sortDirection.ToLower()) == "asc" ? "ASC" : "DESC";
            switch (sortField.ToLower())
            {
                 case "device_name":
                    sortField = "concat(type ,'', brand , '' ,  model)";
                    break;
                case "specification":
                    sortField = "concat(RAM,'', storage ,'' ,screen_size ,'',connectivity)";
                    break;
                default:  sortField = "concat(type ,'', brand , '' ,  model)";

                break;
              
            }
            Db.Connection.Open();
            var NotificationObject = new NotificationModel(Db);
            var result =  NotificationObject.GetNotifications(userId,sortField,sortDirection,searchField);
            Db.Connection.Close();
            return Ok(result);
        }

        
        [HttpGet]
         [Route("reject/{notificationId}")]
        public IActionResult RejectNotification(int notificationId)
        {
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            
            cmd.CommandText = "reject_user_request";
            cmd.CommandType = CommandType.StoredProcedure; 
            try{
                cmd.Parameters.AddWithValue("@var_notif_id", notificationId);
                cmd.ExecuteNonQuery();
            }
            catch(Exception e){
                return NoContent();
            }
            Db.Connection.Close();
            
            return  Ok("Request rejected");
        }


    }

}