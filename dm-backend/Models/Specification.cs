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
        internal int getSpecificationID(){
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "get_specification_id";
            cmd.CommandType = CommandType.StoredProcedure;
            BindParams(cmd);
            int SpecificationID = (int)cmd.ExecuteScalar();
            // if(SpecificationID == null){
                // throw NullReferenceException("Specifications not valid");
            // }
            return SpecificationID;
        }
        private void BindParams(MySqlCommand cmd) {
            cmd.Parameters.Add(new MySqlParameter("var_ram", RAM));
            cmd.Parameters.Add(new MySqlParameter("var_storage", Storage));
            cmd.Parameters.Add(new MySqlParameter("var_screen_size", ScreenSize));
            cmd.Parameters.Add(new MySqlParameter("var_connectivity", Connectivity));
        }
    }
}