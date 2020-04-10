using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dm_backend.Logics;
using dm_backend.Models;
namespace dm_backend.Controllers
{

    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        public AppDb Db { get; }

        public NotificationController(AppDb db)
        {
            Db = db;
        }

        

        [HttpGet]
         public IActionResult GetNotification()
        {
            int userId=-1;
            string searchField = "";
            string sortField = "notification_id";
            string sortDirection = "asc";
            if (!string.IsNullOrEmpty(HttpContext.Request.Query["id"]))
                userId = Convert.ToInt32(HttpContext.Request.Query["id"]);

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["search"]))
                searchField = HttpContext.Request.Query["search"];
            
            if (!string.IsNullOrEmpty(HttpContext.Request.Query["sort"]))
                sortField = HttpContext.Request.Query["sort"];

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["direction"]))
                sortDirection = HttpContext.Request.Query["direction"];
            sortDirection = (sortDirection.ToLower()) == "desc" ? "DESC" : "ASC";
            switch (sortField.ToLower())
            {
                case "device_name":
                    sortField = "type , brand ,  model";
                    break;
                case "specification":
                    sortField = "RAM , storage , screen_size , connectivity";
                    break;
              
            }
            Db.Connection.Open();
            var NotificationObject = new NotificationModel(Db);
            var result =  NotificationObject.GetNotifications(userId,sortField,sortDirection,searchField);
            Db.Connection.Close();
            return Ok(result);
        }

    }

}