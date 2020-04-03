using System.Collections.Generic;
using System.Threading.Tasks;
using UserManagement;
using RequestAdmin.Models;
using System.Data.Common;
using System;
using System.Data;
using MySql.Data.MySqlClient;

namespace RequestAdmin.Logics
{
    public class BindRequestData
    {
        public AppDb Db { get; }

        public BindRequestData(AppDb db)
        {
            Db = db;
        }

     /*   async public Task<List<RequestDeviceHistory>> deviceRequest(int low, int high)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "get_all_device_history";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@low",
                DbType = DbType.String,
                Value = low,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@high",
                DbType = DbType.String,
                Value = high,
            });
            return await bindHistoryData(await cmd.ExecuteReaderAsync());
        }*/
 


       
        async public Task<List<RequestDeviceHistory>> BindHistoryData(DbDataReader reader)
        {
            var posts = new List<RequestDeviceHistory>();   // create an array of blogpost
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    posts.Add(new RequestDeviceHistory()
                    {
                        RequestedUser = FillUserName(reader),
                        UserMail = reader.GetString("email"),
                        DeviceID = (reader.IsDBNull("device_id")) ? -1 : reader.GetInt32("specification_id"),
                        DeviceType = reader.GetString("type"),
                        DeviceBrand = reader.GetString("brand"),
                        DeviceModel = reader.GetString("model_name"),
                        Specs = FillDeviceSpecifications(reader),
                        RequestStatus = reader.GetString("status"),
                        Serial_number = reader.IsDBNull("serial_number") ? "" : reader.GetString("serial_number"),
                        DeviceSubmittedAdmin = FillAdminName(reader),
                        AssignedDate = reader.IsDBNull("assign_date") ? DateTime.MinValue : reader.GetDateTime("assign_date"),
                        RequestDate = (reader.IsDBNull("request_time")) ? DateTime.MinValue : reader.GetDateTime("request_time"),
                        ReturnDate = (reader.IsDBNull("return_date")) ? DateTime.MinValue : reader.GetDateTime("return_date"),
                        AssignDays = reader.GetInt32("assign_days")
                    }
            );
                    
                }
            }
            return posts;
        }

        public Specification FillDeviceSpecifications(DbDataReader reader)
        {
            return new Specification()
            {
                specificatioinId = reader.IsDBNull("specification_id") ? -1 : reader.GetInt32("specification_id"),
                RAM = reader.IsDBNull("RAM") ? "" : reader.GetString("RAM"),
                Storage = reader.IsDBNull("storage") ? "" : reader.GetString("storage"),
                screenSize = reader.IsDBNull("screen_size")  ? "" : reader.GetString("screen_size"),
                connectivity = reader.IsDBNull("connectivity")  ? "" : reader.GetString("connectivity")

            };

        }
        public UserName FillUserName(DbDataReader reader)
        {
           
            return new UserName()
            {

                userId = reader.IsDBNull("user_id") ? -1 : reader.GetInt32("user_id"),
                salutation =  reader.IsDBNull("salutation") ? "" : reader.GetString("salutation"),
                firstName = reader.IsDBNull("first_name") ? "" : reader.GetString("first_name"),
                middleName = reader.IsDBNull("middle_name") ? "" : reader.GetString("middle_name"),
                Lastname = reader.IsDBNull("Last_name") ? "" : reader.GetString("Last_name")
            };

        }
        public UserName FillAdminName(DbDataReader reader)
        {
           
            return new UserName()
            {

                userId = reader.IsDBNull("admin_user_id") ? -1 : reader.GetInt32("admin_user_id"),
                salutation = reader.IsDBNull("admin_salutation") ? "" : reader.GetString("admin_salutation"),
                firstName = reader.IsDBNull("admin_first_name") ? "" : reader.GetString("admin_first_name"),
                middleName = reader.IsDBNull("admin_middle_name") ? "" : reader.GetString("admin_middle_name"),
                Lastname = reader.IsDBNull("admin_last_name") ? "" : reader.GetString("admin_last_name")
            };

        }




    }

}
