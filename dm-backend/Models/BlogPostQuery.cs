using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dm_backend.Models;
using MySql.Data.MySqlClient;
using dm_backend;
using System.Data.Common;
using System.Data;

namespace dm_backend.Models
{
    public class BlogPostQuery
    {



        public AppDb Db { get; }
        internal AppDb abc { get; }

        public BlogPostQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Role>> getUserInformation()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select  * from role;";
            return await ReadAllEmployee(await cmd.ExecuteReaderAsync());
        }


        public async Task<List<user_role>> getUserRoleInformation()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select * from user_to_role;";
            return await ReadAllUserRole(await cmd.ExecuteReaderAsync());
        }


        //find one asyn for update the query
        public async Task<Role> FindOneAsync(int id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT * from role where role.role_id = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            var result = await ReadAllEmployee(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }





        //find one permission




        public async Task<UpdatePermission> FindOnePermission(int id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT * from permission where permission.permission_id = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            var result = await ReadAllPermissionById(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }
        public async Task<List<UpdatePermission>> ReadAllPermissionById(DbDataReader reader)
        {
            var posts = new List<UpdatePermission>();  // create an array of blogpost
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var post = new UpdatePermission()
                    {

                        id = reader.GetInt32(0),
                        permission_name = reader.GetString(1),



                    };
                    posts.Add(post);
                }
            }
            return posts;
        }






        //


        public async Task insertnewUserRole(user_role result)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into user_to_role (user_id,role_id) values(@id,@roleName);";

            BindId6(cmd, result.UserId, result.RoleId);


            cmd.CommandText = cmd.CommandText;
            await cmd.ExecuteNonQueryAsync();
        }

        private void BindId6(MySqlCommand cmd, int user_id, int role_id)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = user_id,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@roleName",
                DbType = DbType.String,
                Value = role_id,
            });


        }


        //delete the role from the user
        public async Task<List<user_role>> deleteUserRoles(int id, int id1)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"delete from user_to_role where user_to_role.user_id = @id and user_to_role.role_id = @id1; ";
            BindId10(cmd, id, id1);
            return await ReadAllUserRole(await cmd.ExecuteReaderAsync());

        }

        private void BindId10(MySqlCommand cmd, int id, int id1)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id1",
                DbType = DbType.Int32,
                Value = id1,
            });


        }
        public async Task<List<user_role>> ReadAllUserRole(DbDataReader reader)
        {
            var posts = new List<user_role>();  // create an array of blogpost
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var post = new user_role()
                    {

                        UserId = reader.GetInt32(0),
                        RoleId = reader.GetInt32(1),



                    };
                    posts.Add(post);
                }
            }
            return posts;
        }





        //delete  role query




        public async Task<List<Role>> deleteUserInformationById(int id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"delete from role_to_permission  where role_to_permission.role_id=@id;
                delete from role where role.role_id=@id;";
            BindId(cmd, id);
            return await ReadAllEmployee(await cmd.ExecuteReaderAsync());

        }

        private void BindId(MySqlCommand cmd, int Id)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = Id,
            });
        }


        //get user assigned role

        public async Task<List<Role>> getUserRoleByIdInformation(int Id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select r.role_id,r.role_name  from role  r
                        join user_to_role rp  on
                    rp.role_id=r.role_id  where rp.user_id=@id;  ";
            BindId7(cmd, Id);

            return await ReadAllEmployee(await cmd.ExecuteReaderAsync());
        }
        //assign role to user
        public async Task<List<Role>> getRoleWithoutUserByIdInformation(int Id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select * from  role where role_id NOT IN (
                    select r.role_id  from role  r
                    join user_to_role rp   on
                    rp.role_id=r.role_id  where rp.user_id=@id); ";
            BindId7(cmd, Id);

            return await ReadAllEmployee(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Role>> ReadAllEmployee(DbDataReader reader)
        {
            var posts = new List<Role>();  // create an array of blogpost
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var post = new Role()
                    {

                        id = reader.GetInt32(0),
                        RoleName = reader.GetString(1),



                    };
                    posts.Add(post);
                }
            }
            return posts;
        }


        //delete query for permission



        public async Task<List<Permission>> deleteUserInformationByPermId(int id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"delete from role_to_permission  where role_to_permission.permission_id=@id;
                delete from permission where permission.permission_id=@id;   
                ";
            BindId3(cmd, id);
            return await ReadAllPermission(await cmd.ExecuteReaderAsync());

        }

        private void BindId3(MySqlCommand cmd, int Id)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = Id,
            });
        }


        public async Task<List<Permission>> getPermissionInformation()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT * FROM permission;";
            return await ReadAllPermission(await cmd.ExecuteReaderAsync());
        }


        public async Task<List<role_permission>> deleteRolePermission(int id, int id1)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"delete from role_to_permission where role_id=@id and permission_id=@id1;;";
            BindId4(cmd, id, id1);
            return await ReadAllRolePermission(await cmd.ExecuteReaderAsync());

        }



        private void BindId4(MySqlCommand cmd, int Id, int Id1)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = Id,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id1",
                DbType = DbType.Int32,
                Value = Id1,
            });
        }
        public async Task<List<role_permission>> getRolePermissionInformation()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select r.role_id,r.role_name,p.permission_id,p.permission_name  from role r
            join permission p 
            join role_to_permission rp 
            on r.role_id=rp.role_id and p.permission_id=rp.permission_id  order by rp.role_id ASC";
            return await ReadAllRolePermission(await cmd.ExecuteReaderAsync());
        }




        public async Task<List<role_permission>> ReadAllRolePermission(DbDataReader reader)
        {
            var posts = new List<role_permission>();  // create an array of blogpost
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var post = new role_permission()
                    {
                        Role_Id = reader.GetInt32(0),
                        Role_Name = reader.GetString(1),
                        Permission_id = reader.GetInt32(2),
                        Permission_Name = reader.GetString(3)
                    };
                    posts.Add(post);
                }
            }
            return posts;
        }



        public async Task<List<Permission_with_role>> getRolePermissionByIdInformation(int Id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select rp.permission_id,p.permission_name from permission p
                join role_to_permission rp on 
                rp.permission_id=p.permission_id  where rp.role_id=@id;";
            BindId7(cmd, Id);

            return await ReadAllPermissionWithRole(await cmd.ExecuteReaderAsync());
        }



        //get role without permission

        public async Task<List<Permission_with_role>> getRoleWithoutPermissionByIdInformation(int Id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select * from permission pp where pp.permission_id NOT IN( 
        select rp.permission_id from permission p join role_to_permission rp 
            where p.permission_id=rp.permission_id and role_id=@id); ";
            BindId7(cmd, Id);

            return await ReadAllPermissionWithRole(await cmd.ExecuteReaderAsync());
        }


        //

        private void BindId7(MySqlCommand cmd, int Id)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = Id,
            });
        }


        public async Task<List<Permission_with_role>> ReadAllPermissionWithRole(DbDataReader reader)
        {
            var posts = new List<Permission_with_role>();  // create an array of blogpost
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var post = new Permission_with_role()
                    {

                        //RoleId=reader.GetInt32(0),
                        PermissionId = reader.GetInt32(0),

                        PermissionName = reader.GetString(1),


                    };
                    posts.Add(post);
                }
            }
            return posts;
        }




        public async Task<List<Permission>> ReadAllPermission(DbDataReader reader)
        {
            var posts = new List<Permission>();  // create an array of blogpost
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var post = new Permission()
                    {

                        id = reader.GetInt32(0),
                        PermissionName = reader.GetString(1),


                    };
                    posts.Add(post);
                }
            }
            return posts;
        }











        //insert query for roles





        public async Task insertAsync(Insert result)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into role (role_name) values(@roleName);";

            BindId1(cmd, result.roleName);


            cmd.CommandText = cmd.CommandText;
            await cmd.ExecuteNonQueryAsync();
        }

        private void BindId1(MySqlCommand cmd, string roleName)
        {
            // cmd.Parameters.Add(new MySqlParameter
            //{
            //  ParameterName = "@id",
            //DbType = DbType.Int32,
            // Value = id,
            // });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@roleName",
                DbType = DbType.String,
                Value = roleName,
            });


        }

        // insert the permission

        public async Task insertPerm(InsertPermission result)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into permission (permission_name) values(@permissionName);";

            BindId2(cmd, result.PermissionName);


            cmd.CommandText = cmd.CommandText;
            await cmd.ExecuteNonQueryAsync();
        }

        private void BindId2(MySqlCommand cmd, string permissionName)
        {
            // cmd.Parameters.Add(new MySqlParameter
            // {
            //   ParameterName = "@id",
            // DbType = DbType.Int32,
            // Value = id,
            //});
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@permissionName",
                DbType = DbType.String,
                Value = permissionName,
            });


        }


        //insert role permission




        public async Task insertRolePerm(insert_role_permission result)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into role_to_permission(role_id,permission_id) values(@role,@permission);";

            BindId5(cmd, result.Role_Id, result.Permission_id);


            cmd.CommandText = cmd.CommandText;
            await cmd.ExecuteNonQueryAsync();
        }
        private void BindId5(MySqlCommand cmd, int role_id, int permission_id)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@role",
                DbType = DbType.Int32,
                Value = role_id,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@permission",
                DbType = DbType.String,
                Value = permission_id,
            });


        }

        //update role
        public async Task UpdateAsync(Role result)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"update role SET role.role_name=@RoleName where role_id = @id;";
            BindId8(cmd, result.id, result.RoleName);

            await cmd.ExecuteNonQueryAsync();
        }
        private void BindId8(MySqlCommand cmd, int id, string RoleName)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@RoleName",
                DbType = DbType.String,
                Value = RoleName,
            });


        }



        //update Permission

        public async Task UpdatePermission1(UpdatePermission result)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"update permission SET permission.permission_name=@permission_name where permission_id = @id;";
            BindId9(cmd, result.id, result.permission_name);

            await cmd.ExecuteNonQueryAsync();
        }
        private void BindId9(MySqlCommand cmd, int id, string permission_name)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@permission_name",
                DbType = DbType.String,
                Value = permission_name,
            });


        }

        //get users information


        public async Task<List<User>> getUsers()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select u.user_id,u.first_name,u.last_name from user as u;";
            return await ReadAllUsers(await cmd.ExecuteReaderAsync());
        }
        public async Task<List<User>> ReadAllUsers(DbDataReader reader)
        {
            var posts = new List<User>();  // create an array of blogpost
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var post = new User()
                    {

                        UserId = reader.GetInt32(0),
                        FirstName = reader.GetString(1),
                        LastName = reader.GetString(2),



                    };
                    posts.Add(post);
                }
            }
            return posts;
        }





    }
}
