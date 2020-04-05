using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UserManagement.Models;
using UserManagement.Utilities;
using System.Web.Http.Results;

namespace UserManagement.Controllers
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
              return Json(result, new JsonSerializerSettings()
            {
                ContractResolver = new ShouldSerializeContractResolver()
            });           
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


       
        public AppDb Db { get; }
    }

}
