using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace dm_backend.Models
{
    public class Role
    {
        public int? RoleId { get; set; }
        public string RoleName { get; set; }
        public List<Permission>? Permissions { get; set; }
        internal AppDb Db { get; }
        public Role(){

        }
        internal Role(AppDb db){
            Db = db;
        }
        public Role GetRoleById(int id){
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = $@"select JSON_OBJECT(
                    'roleId', role_id,
                    'roleName', role_name,
                    'permissions', (select JSON_ARRAYAGG(
                        JSON_OBJECT(
                            #'permissionId', permission_id,
                            'permissionName', permission_name
                        )) from permission inner join role_to_permission using(permission_id) where role_to_permission.role_id=role_id
                    )
                ) as result from role where role_id={id}";
            using var reader = cmd.ExecuteReader();
            reader.Read();
            string result = reader.GetString("result");
            Console.WriteLine(result);
            Role abc = JsonConvert.DeserializeObject<Role>(result);
            Db.Connection.Close();
            return abc;
        }
    }
}
