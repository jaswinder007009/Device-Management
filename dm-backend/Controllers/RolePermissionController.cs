using System;
using System.Threading.Tasks;
using dm_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace dm_backend.Controllers
{
    [Route("api/[controller]")]
    public class RolepermissionController : ControllerBase
    {
        public RolepermissionController(AppDb db)
        {
            Db = db;
        }
        public AppDb Db { get; }
        
        // [HttpGet("role")]
        // public async Task<IActionResult> GetAllRoles()
        // {
        //     await Db.Connection.OpenAsync();
        //     var query = new Role(Db);
        //     var result = await query.getallroles();
        //     return new OkObjectResult(result);
        // }
        // [HttpGet("permission")]
        // public async Task<IActionResult> GetAllPermissions()
        // {
        //     await Db.Connection.OpenAsync();
        //     var query = new Permission(Db);
        //     var result = await query.getallpermisions();
        //     return new OkObjectResult(result);
        // }
        [HttpPost]
        [Route("addrole")]
        public IActionResult Postrole([FromBody]Role body)
        {
            try{
                body.Db = Db;
                body.AddRole();
                return Ok();
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("addpermission")]
        public IActionResult Postpermission([FromBody]Permission body)
        {
            try{
                body.Db = Db;
                body.AddPermission();
                return Ok();
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("updaterole/{role_id}")]
        public IActionResult Putrole(int role_id, [FromBody]Role body)
        {
            Console.WriteLine(body.RoleName);
            try{
                body.Db = Db;
                body.RoleId = role_id;
                body.UpdateRole();
                return Ok();
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                return BadRequest();
            }
            
        }
        [HttpPut]
        [Route("updatepermissions/{permission_id}")]
        public IActionResult Putpermission(int permission_id, [FromBody]Permission body)
        {
            try{
                body.Db = Db;
                body.PermissionId = permission_id;
                body.UpdatePermission();
                return Ok();
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }
        [HttpDelete]
        [Route("delrole/{role_id}")]
        public IActionResult Deleterole(int role_id)
        {
            Role query = new Role(Db);
            query.RoleId = role_id;
            query.Deleterole();
            return Ok();
        }
        [HttpDelete]
        [Route("delpermission/{permission_id}")]
        public IActionResult Deletepermission(int permission_id)
        {
            Permission query = new Permission(Db);
            query.PermissionId = permission_id;
            query.DeletePermission();
            return Ok();
        }
    }
}