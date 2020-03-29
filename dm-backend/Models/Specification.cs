using System;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace dm_backend.Models
{
    public class SpecificationModel{
        public string RAM { get; set; }
        public string Storage { get; set; }
        public string ScreenSize { get; set; }
        public string Connectivity { get; set; } 

        public AppDb Db { get; set; }
    
        public SpecificationModel(){

        }
        internal SpecificationModel(AppDb db){
            Db = db;
        }

        // Returns Specification ID from given specifications
        // Otherwise throws a NullReferenceException
        internal int GetSpecificationID(AppDb db){
            using var cmd = db.Connection.CreateCommand();
            
            cmd.CommandText = "get_specification_id";
            cmd.CommandType = CommandType.StoredProcedure;
            BindSpecificationParams(cmd);
            MySqlParameter SpecificationID = new MySqlParameter("@output", MySqlDbType.Int32) { Direction = ParameterDirection.ReturnValue };
            cmd.Parameters.Add(SpecificationID);
            cmd.ExecuteScalar();
            
            if(SpecificationID.Value == DBNull.Value){
                throw new NullReferenceException("Specifications are not valid");
            }
            return (int)SpecificationID.Value;
        }

        private void BindSpecificationParams(MySqlCommand cmd) {
            cmd.Parameters.Add(new MySqlParameter("var_ram", RAM));
            cmd.Parameters.Add(new MySqlParameter("var_storage", Storage));
            cmd.Parameters.Add(new MySqlParameter("var_screen_size", ScreenSize));
            cmd.Parameters.Add(new MySqlParameter("var_connectivity", Connectivity));
        }
    }
}