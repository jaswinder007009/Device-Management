using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dm_backend.Models;

namespace dm_backend.Controllers
{
    [Route("api/device")]
    public class RoleController : ControllerBase
    {
        public RoleController(AppDb db)
        {
            Db = db;
        }


        [HttpGet("role")]
        public async Task<IActionResult> GetRoleInfo()
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);

            var result = await query.getUserInformation();
            return new OkObjectResult(result);
        }

      
        [HttpGet("permission")]
        public async Task<IActionResult> GetPermissionInfo()
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);

            var result = await query.getPermissionInformation();
            return new OkObjectResult(result);
        }

        [HttpGet("get_role_permission")]
        public async Task<IActionResult> GetRolePermissionInfo()
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);

            var result = await query.getRolePermissionInformation();
            return new OkObjectResult(result);
        }


        [HttpGet("get_permission_with_role/{id}")]
        public async Task<IActionResult> GetRolePermissionById(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);

            var result = await query.getRolePermissionByIdInformation(id);
            return new OkObjectResult(result);
        }

        //get role assigned to the the user
        [HttpGet("get_role_with_user/{id}")]
        public async Task<IActionResult> GetUserRoleById(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);

            var result = await query.getUserRoleByIdInformation(id);
            return new OkObjectResult(result);
        }

        //assign the role to the user
        [HttpGet("assign_role_to_user/{id}")]
        public async Task<IActionResult> GetRoleWithoutUserById(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);

            var result = await query.getRoleWithoutUserByIdInformation(id);
            return new OkObjectResult(result);
        }

        //



        [HttpGet("get_permission_without_role/{id}")]
        public async Task<IActionResult> GetRoleWithoutPermissionById(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);

            var result = await query.getRoleWithoutPermissionByIdInformation(id);
            return new OkObjectResult(result);
        }

        //Get role by id
        [HttpGet("role/{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);
            var result = await query.FindOneAsync(id);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }
        // Get Permission with id

        [HttpGet("permission/{id}")]
        public async Task<IActionResult> GetPermissionById(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);
            var result = await query.FindOnePermission(id);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        //get all users


        [HttpGet("user")]
        public async Task<IActionResult> GetUser()
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);

            var result = await query.getUsers();
            return new OkObjectResult(result);
        }
       //

        [HttpGet("user_role")]
        public async Task<IActionResult> GetUserRoleInfo()
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);

            var result = await query.getUserRoleInformation();
            return new OkObjectResult(result);
        }

        


        //insert the role

        [HttpPost("role/insert")]
                public async Task<IActionResult> insertnewAsync([FromBody]Insert body)
                {
                    await Db.Connection.OpenAsync();
                    var query = new BlogPostQuery(Db);
                    var result = new Insert();
                       // result.id = body.id;
                        result.roleName = body.roleName;


                    await query.insertAsync(result);
                    return new OkObjectResult(result);
                }



        
        //insert the permission

        [HttpPost("permission/insert")]
        public async Task<IActionResult> insertnewPermission([FromBody]InsertPermission body)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);
            var result = new InsertPermission();
            //result.id = body.id;
            result.PermissionName = body.PermissionName;


            await query.insertPerm(result);
            return new OkObjectResult(result);
        }



        //insert the role and permission
        [HttpPost("role_permission/insert")]
        public async Task<IActionResult> insertnewRolePermission([FromBody]insert_role_permission body)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);
            var result = new insert_role_permission();
            result.Role_Id = body.Role_Id;
            result.Permission_id = body.Permission_id;


            await query.insertRolePerm(result);
            return new OkObjectResult(result);
        }




      


        
        //insert the user and role
        [HttpPost("role_user/insert")]
        public async Task<IActionResult> insertnewUserRole([FromBody]user_role body)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);
            var result = new user_role();
            result.UserId = body.UserId;
            result.RoleId = body.RoleId;


            await query.insertnewUserRole(result);
            return new OkObjectResult(result);
        }


        // DELETE api/blog/5
        [HttpDelete("role/{id}")]
        public async Task<IActionResult> DeleteOne(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);
            var result = await query.deleteUserInformationById(id);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        //delete permission api/blog/4

        [HttpDelete("permission/{id}")]
        public async Task<IActionResult> DeletePerm(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);
            var result = await query.deleteUserInformationByPermId(id);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        [HttpDelete("get_permission_with_role/{id}/{id1}")]
        public async Task<IActionResult> DeleteRolePerm(int id, int id1)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);
            var result = await query.deleteRolePermission(id, id1);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        //delete role assigned to the user

        [HttpDelete("get_role_with_user/{id}/{id1}")]
        public async Task<IActionResult> DeleteUserRole(int id, int id1)
        {
            await Db.Connection.OpenAsync();
            var query = new BlogPostQuery(Db);
            var result = await query.deleteUserRoles(id, id1);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        //

        [HttpPut("role/{id}")]
        public async Task<IActionResult> PutOne(int id, [FromBody] Role body)
        {
            await Db.Connection.OpenAsync();
            body.id = id;
            var query = new BlogPostQuery(Db);
            var result = await query.FindOneAsync(id);
            if (result is null)
                return new NotFoundResult();
            // result.id = body.id;
            result.RoleName = body.RoleName;

           
          

            await query.UpdateAsync(body);
            return new OkObjectResult(result);
        }

       [HttpPut]
[Route("permission/{id}")]
async public Task<IActionResult> Putpermission(int id, [FromBody]UpdatePermission body)
{
Db.Connection.Open();
var query = new updatepermission(Db);
body.id = id;
await query.updatePermission(body);
Db.Connection.Close();
return Ok();
}

        public AppDb Db { get; }
    }
}
