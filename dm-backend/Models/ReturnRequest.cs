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
    public class ReturnRequestModel
    {
        public int? returnRequestId { get; set; }
        public int userId { get; set; }
        public int deviceId { get; set; }
        public string deviceModel { get; set; }
        public string deviceBrand { get; set; }
        public string deviceType { get; set; }  
        public SpecificationModel specs { get; set;}     
        public string returnDate { get; set; }
        internal AppDb Db { get; set; }

        public ReturnRequestModel()
        {
        }
        public ReturnRequestModel(AppDb db)
        {
            Db = db;
        }

        public string AddReturnRequest()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert_return_request";
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                BindReturnProcedureParams(cmd);
                cmd.ExecuteNonQuery();
                return "Request sent";
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ReturnRequestModel> GetReturnRequests(int userId,string sortField,int sortDirection,string searchField)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = get_return_requests+searchQuery;
            if(userId!=-1)
                cmd.CommandText +=@" having user_id="+userId;
            cmd.CommandText +=@" order by "+sortField+(sortDirection==-1 ? " desc":" asc");; 
            cmd.Parameters.AddWithValue("@search_field", searchField); 
            using MySqlDataReader reader =  cmd.ExecuteReader();
            return ReadAll(reader);
        }

        private void BindReturnProcedureParams(MySqlCommand cmd){
           
            cmd.Parameters.Add(new MySqlParameter("var_user_id", userId));
            cmd.Parameters.Add(new MySqlParameter("var_device_id", deviceId));
            
        }

        private List<ReturnRequestModel> ReadAll(MySqlDataReader reader)
        {
            var requests = new List<ReturnRequestModel>();
            using (reader)
            {
                while (reader.Read())
                {
                    var request = ReadReturnRequests(reader);
                    request.specs = ReadSpecifications(reader);
                    requests.Add(request);
                }
            }
            return requests;
        }
        internal string get_return_requests=@"select return_request_id, user_id,device_id, device_model.model, 
        device_type.type, device_brand.brand,specification.*, return_date
        from return_request
        inner join user using(user_id)
        inner join device using(device_id)
        inner join device_brand using(device_brand_id)
        inner join device_model using(device_model_id)
        inner join device_type using(device_type_id)
        inner join specification using(specification_id)";

        internal string searchQuery=@" where device_type.type like CONCAT('%', @search_field, '%') or device_model.model like CONCAT('%', @search_field, '%') or device_brand.brand like CONCAT('%', @search_field, '%') group by return_request_id";       

    }   
}
