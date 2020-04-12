using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Common;
using dm_backend.Utilities;
using dm_backend.Controllers;


namespace dm_backend.Models
{
    public class RolePermission
    {

        public GenericModel Role { get; set; }
        public GenericModel Permission { get; set; }
         internal AppDb Db {get; set;}
        public RolePermission (AppDb db)
        {
            Db=db;
        }
        public RolePermission()
        {

        }
 public async Task<List<RolePermission>> GetAllRolesAndPermissions()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select r.role_id,r.role_name,p.permission_id,p.permission_name  from role r
            join permission p 
            join role_to_permission rp 
            on r.role_id=rp.role_id and p.permission_id=rp.permission_id  order by rp.role_id ASC";
            return await ReadAllRolePermission(await cmd.ExecuteReaderAsync());
        }
       
          public async Task<List<RolePermission>> ReadAllRolePermission(DbDataReader reader)
        {
            var posts = new List<RolePermission>();  
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var post = new RolePermission()
                    {
                        Role= Readers.ReadGenericModel(reader,"role") ,
                       Permission=Readers.ReadGenericModel(reader,"permission")
                       
                    };
                    posts.Add(post);
                }
            }
            return posts;
        }
    }
}
