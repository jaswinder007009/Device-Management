using System.Collections.Generic;
using System;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using dm_backend.Models;
using static dm_backend.Utilities.Readers;


namespace dm_backend.Models
{
    public class RequestModel
    {
        public int? requestId { get; set; }
        public int userId { get; set; }
        public string deviceModel { get; set; }
        public string deviceBrand { get; set; }
        public string deviceType { get; set; }
        public SpecificationModel specs { get; set; }
        public PartialUserModel requestedBy { get; set; }        
        public string requestDate { get; set; }
        public int noOfDays { get; set; }
        public string comment { get; set; }
        public bool? availability { get; set; }
        internal AppDb Db { get; set; }

        public RequestModel()
        {
        }
        public RequestModel(AppDb db)
        {
            Db = db;
        }

        public string AddRequest()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "insert_request";
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                BindRequestProcedureParams(cmd);
                cmd.ExecuteNonQuery();
                return "Request sent";
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<RequestModel> GetAllPendingRequests()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "get_all_pending_requests";
            cmd.CommandType = CommandType.StoredProcedure;
            using( MySqlDataReader reader =  cmd.ExecuteReader())
                return ReadAll(reader);
        }

        private static T GetOptionalColumn<T>(MySqlDataReader reader, string colName){
            if(HasColumn(reader, colName) && reader[colName] != DBNull.Value)
                return (T)reader[colName];
            else
                return default(T);
        }
        public static bool HasColumn(MySqlDataReader dataReader, string columnName)
        {
            for (int i = 0; i < dataReader.FieldCount; i++)
            {
                if (dataReader.GetName(i).Equals(columnName, StringComparison.InvariantCultureIgnoreCase))
                    return true;
            }
            return false;
        }


        private void BindRequestProcedureParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter("var_user_id", userId));
            cmd.Parameters.Add(new MySqlParameter("var_device_model", deviceModel));
            cmd.Parameters.Add(new MySqlParameter("var_device_brand", deviceBrand));
            cmd.Parameters.Add(new MySqlParameter("var_device_type", deviceType));
            cmd.Parameters.Add(new MySqlParameter("var_specification_id", specs.GetSpecificationID(Db)));
            cmd.Parameters.Add(new MySqlParameter("var_no_of_days", noOfDays));
            cmd.Parameters.Add(new MySqlParameter("var_comment", comment));
        }

        private List<RequestModel> ReadAll(MySqlDataReader reader)
        {
            var requests = new List<RequestModel>();
            using (reader)
            {
                while (reader.Read())
                {
                    
                    var request = ReadRequest(reader);
                    request.specs = ReadSpecifications(reader);
                    request.requestedBy = ReadPartialUser(reader);
                    requests.Add(request);
                }
            }
            return requests;
        }

    }
}