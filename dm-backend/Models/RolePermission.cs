using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

namespace dm_backend.Models
{
    public class RolePermission
    {
        public List<Role> Roles { get; set; }

        public List<Permission>? Permissions { get; set; }
        internal AppDb Db { get; set; }

        internal RolePermission(AppDb db)
        {
            Db = db;
        }
        public RolePermission()
        {

        }
        public RolePermission GetAllRoles()
        {
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select JSON_OBJECT('roles',json_arrayagg(JSON_OBJECT(
                #'roleId', role_id,
                'roleName', role_name,
                'permissions', (
                    select json_arrayagg(json_object(
                        #'permissionId', permission_id,
                        'permissionName', permission_name
                    )) from role_to_permission inner join permission using(permission_id) where role_to_permission.role_id=role.role_id
                )
            )),
            'permissions', (
                select json_arrayagg(json_object(
					#'permissionId', permission_id,
					'permissionName', permission_name
			    )) from permission order by permission_name)
            )from role order by role_id;";
            using var reader = cmd.ExecuteReader();
            reader.Read();
            string result = reader.GetString(0);
            RolePermission abc = JsonConvert.DeserializeObject<RolePermission>(result);
            Db.Connection.Close();
            return abc;
        }

        // TODO : Update a role iff role is changed
        public void SaveChanges()
        {
            Db.Connection.Open();
            MySqlCommand cmd = Db.Connection.CreateCommand();
            MySqlTransaction myTrans;

            foreach (Role roleObj in Roles)
            {
                myTrans = Db.Connection.BeginTransaction();

                cmd.Connection = Db.Connection;
                cmd.Transaction = myTrans;
                try
                {
                    cmd.CommandText = $@"delete from role_to_permission where role_id=(select role_id from role where role_name='{roleObj.RoleName}')";
                    cmd.ExecuteNonQuery();
                    if (roleObj.Permissions != null)
                    {
                        foreach (Permission permObj in roleObj.Permissions)
                        {
                            cmd.CommandText = $@"insert into role_to_permission 
                            select role_id, permission_id from role, permission where role_name='{roleObj.RoleName}' and permission_name='{permObj.PermissionName}'";
                            Console.WriteLine(cmd.CommandText);
                            cmd.ExecuteNonQuery();
                        }
                    }
                    myTrans.Commit();
                }
                catch (Exception e)
                {
                    try
                    {
                        myTrans.Rollback();
                    }
                    catch (MySqlException ex)
                    {
                        if (myTrans.Connection != null)
                        {
                            Console.WriteLine("An exception of type " + ex.GetType() + " was encountered while attempting to roll back the transaction.");
                        }
                        throw;
                    }
                    Console.WriteLine("An exception of type " + e.Message + " was encountered updating the roles.");
                    throw;
                }
            }
            Db.Connection.Close();
        }
    }
}