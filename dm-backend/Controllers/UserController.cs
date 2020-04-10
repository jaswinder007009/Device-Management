using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using dm_backend.Models;
using dm_backend.Utilities;
using System.Web.Http.Results;
using System.Text.Json;

namespace dm_backend.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        public UserController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        [Route("{user_id}")]
        public  JsonResult GetOneUser(string user_id)
        {
            Db.Connection.Open();
            var query = new User(Db);
            var result = query.getUserByuser_id(user_id);
                  result.SetSerializableProperties(String.Empty);
            Db.Connection.Close();
             return Json(result);
        }
       
       
        
        [HttpGet]
        public JsonResult GetAllUsersInCustomFormat()
        {
            string fieldsToDisplay = HttpContext.Request.Query["fields"];
            string namesToSearch = HttpContext.Request.Query["search"];

            string ToSort = (string)HttpContext.Request.Query["sortby"] ?? "first_name";
            string direction = (string)HttpContext.Request.Query["direction"]  ?? "ASC" ;
             Db.Connection.Open();
            var query = new User(Db);
            var result = query.SortUserbyName(ToSort, direction, namesToSearch);//names To Sort
            Db.Connection.Close();
            foreach (var m1 in result)
            {
                m1.SetSerializableProperties(fieldsToDisplay);
            }
            return Json(result);
            

        }
        

         [HttpPost]
         [Route("add")]
         public IActionResult Post([FromBody]User item)
         {
             Db.Connection.Open();
             Console.WriteLine("------------" + item.addresses[0].AddressLine1 + "----------------");
              //Console.WriteLine("------------" + item.addresses[1].AddressLine2 + "----------------");
             item.Db = Db;
             var result = item.AddOneUser();
             Db.Connection.Close();
             return new OkObjectResult(item);
         }

        
        [HttpPut]
        [Route("{user_id}/update")]
         public ActionResult Put(int user_id, [FromBody]User body)
         {
            Db.Connection.Open();
            body.Db = Db;
            body.UserId = user_id;
            Console.WriteLine(body.FirstName);
          var result=  body.UpdateUser();
            Db.Connection.Close();
            return Ok(result);
        
        }


        [HttpGet]
        [Route("{user_id}/{activeInactive}")]
        public IActionResult PutOne(int user_id , string activeInactive)
        {
            Db.Connection.Open();
            var query = new User(Db);
            query.UserId = user_id;
            query.MarkUserInactive(query.whatIs(activeInactive));
            Db.Connection.Close();
            return Ok();
        }
        
        [HttpDelete]
        [Route("{user_id}/remove")]
         public IActionResult DeleteOne(int user_id)
         {
             Db.Connection.Open();
            User query = new User(Db)
            {
                UserId = user_id
            };
            query.Delete();
            Db.Connection.Close();
            return  Ok();
         }
       
        public AppDb Db { get; }
    }

}
