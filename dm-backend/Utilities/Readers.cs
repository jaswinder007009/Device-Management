using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using dm_backend.Models;

namespace dm_backend.Utilities
{
    public static class Readers
    {

        public static string GetSafeString(MySqlDataReader reader, string colName)
        {
            return reader[colName] != DBNull.Value ? (string)reader[colName] : "";
        }
        public static T GetSafeInt<T>(MySqlDataReader reader, string colName)
        {
            return reader[colName] != DBNull.Value ? (T)reader[colName] : default(T);
        }
        public static PartialUserModel ReadPartialUser(MySqlDataReader reader)
        {
            var user = new PartialUserModel();
            user.Salutation = GetSafeString(reader, "salutation");
            user.FirstName = GetSafeString(reader, "first_name");
            user.MiddleName = GetSafeString(reader, "middle_name");
            user.LastName = GetSafeString(reader, "last_name");
            user.DepartmentName = GetSafeString(reader, "department_name");
            user.DesignationName = GetSafeString(reader, "designation_name");
            user.Email = GetSafeString(reader, "email");
            user.Gender = GetSafeString(reader, "gender");
            user.DOB = Convert.ToDateTime(reader["date_of_birth"]).ToString("yyyy-MM-dd");
            user.DOJ = Convert.ToDateTime(reader["date_of_joining"]).ToString("yyyy-MM-dd");
            return user;
        }
        public static SpecificationModel ReadSpecifications(MySqlDataReader reader){
            var specfication = new SpecificationModel();
            specfication.RAM = (string)reader["RAM"];
            specfication.Storage = (string)reader["storage"];
            specfication.ScreenSize = (string)reader["screen_size"];
            specfication.Connectivity = (string)reader["connectivity"];
            return specfication;
        }
        public static RequestModel ReadRequest(MySqlDataReader reader){
            var request = new RequestModel();
            request.requestId = GetSafeInt<int>(reader, "request_device_id");
            request.userId = (int)reader["user_id"];
            request.deviceModel = (string)reader["model"];
            request.deviceBrand = (string)reader["brand"];
            request.deviceType = (string)reader["type"];
            request.requestDate = Convert.ToDateTime(reader["request_date"]).ToString("yyyy-MM-dd");
            request.noOfDays = (int)reader["no_of_days"];  // To convert sbyte to int
            request.comment = GetSafeString(reader, "comment");
            request.availability = GetSafeInt<Int64>(reader, "availability") == 1 ? true : false;
            return request;
        }
    }
}
