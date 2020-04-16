using dm_backend.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace dm_backend.Logics
{
    public class Request
    {

        internal AppDb Db { get; set; }
      public  Request(AppDb db)
        {
            Db = db;
        }

         public string addDevice(DeviceRequest  req)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText= "insert_request";
            cmd.CommandType = CommandType.StoredProcedure;
          
          //  try
                {
                BindRequestProcedureParams(cmd, req);
                cmd.ExecuteNonQuery();
               
            }
          //  catch (Exception e)
            {
           //    throw e;
            }
            return "Request sent";

        }

        private void BindRequestProcedureParams(MySqlCommand cmd, DeviceRequest req)
        {
            cmd.Parameters.Add(new MySqlParameter("var_user_id", req.userId));
            cmd.Parameters.Add(new MySqlParameter("var_device_model", req.model));
            cmd.Parameters.Add(new MySqlParameter("var_device_brand", req.brand));
            cmd.Parameters.Add(new MySqlParameter("var_device_type", req.devicetype));
            cmd.Parameters.Add(new MySqlParameter("var_specification_id",req.specificationId));
            cmd.Parameters.Add(new MySqlParameter("var_no_of_days", req.days));
            cmd.Parameters.Add(new MySqlParameter("var_comment", req.comment));
        }

     
    }
}
