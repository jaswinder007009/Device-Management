using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace dm_backend.Models
{
    public class Permission
    {
        public int? PermissionId { get; set; }
        public string PermissionName { get; set; }

        internal AppDb Db { get; set; }
        public Permission(){

        }
        public Permission(AppDb db){
            Db = db;
        }
        public int DeletePermission()
        {
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"delete from permission where permission_id=@permission_id;";
            BindPermissionId(cmd);
            cmd.ExecuteNonQuery();
            Db.Connection.Close();
            return 1;
        }
        public void AddPermission()
        {
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "insert into permission (permission_name) values(@permission_name)";
            BindPermissionName(cmd);
            try{
                cmd.ExecuteNonQuery();
            }
            catch(Exception){
                throw;
            }
            finally{
                Db.Connection.Close();
            }
        }
        public void UpdatePermission()
        {
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"update permission set permission_name=@permission_name where permission_id=@permission_id";
            BindPermission(cmd);
            try{
                cmd.ExecuteNonQuery();
            }
            catch(Exception){
                throw;
            }
            finally{
                Db.Connection.Close();
            }
        }
        private void BindPermissionId(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter("@permission_id", PermissionId));
        }
        private void BindPermissionName(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter("@permission_name", PermissionName));
        }
        private void BindPermission(MySqlCommand cmd)
        {
            BindPermissionId(cmd);
            BindPermissionName(cmd);
        }
    }
}
