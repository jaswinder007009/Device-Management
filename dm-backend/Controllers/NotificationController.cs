using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dm_backend.Logics;

namespace dm_backend.Models{

    [Route("api/[controller]")]
    public class NotificationController : Controller
    {
        public AppDb Db { get; }

        public NotificationController(AppDb db)
        {
            Db = db;
        }

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
            int userId=-1;
            string searchField = "";
            string sortField = "notification_id";
            int sortDirection = 0;
            if (!string.IsNullOrEmpty(HttpContext.Request.Query["id"]))
                userId = Convert.ToInt32(HttpContext.Request.Query["id"]);

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["search"]))
                searchField = HttpContext.Request.Query["search"];
            
            if (!string.IsNullOrEmpty(HttpContext.Request.Query["sort"]))
                sortField = HttpContext.Request.Query["sort"];

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["direction"]))
                sortDirection = Convert.ToInt32(HttpContext.Request.Query["direction"]);

            Db.Connection.Open();
            var NotificationObject = new NotificationModel(Db);
            var result = NotificationObject.GetNotifications(userId,sortField,sortDirection,searchField);
            Db.Connection.Close();
            return Ok(result);
        }



    }

}