using MySql.Data.MySqlClient;
using dm_backend.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;


namespace dm_backend.Logics
{
    public class SortRequestHistoryData
    {

        public AppDb Db { get; }

        public SortRequestHistoryData(AppDb db)
        {
            Db = db;
        }

        public string FindSortingAttribute(string value)
        {
            
            value = value.ToLower();
            var attribute = value switch
            {
                "user" =>
                        "order by concat(u.first_name , ' ', if (u.middle_name is null, '' , concat(u.middle_name , ' ')) , u.last_name )",

                "admin" =>
                        "order by  concat(u1.first_name , ' ', if (u1.middle_name is null, '' , concat(u1.middle_name , ' ')) , u1.last_name )",

                "status" =>
                         "order by s.status",

                "serialnumber" =>
                         "order by d.serial_number",

                "device" =>
                         "order by concat(db.brand, ' ', dm.model_name)",

                "type" =>
                         "order by dt.type",

                "assigndate" =>
                         "order by rh.assign_date" ,

                "returndate" =>
                         "order by  rh.return_date",
                _ =>
                    ""
            };
            return attribute;
            }


       async public Task<Result<RequestDeviceHistory>> GetSortData(string find, string sortElement, string sortType , int low = 0, int high = 10)
        {
            var attribute = FindSortingAttribute(sortElement);
            // List<RequestDeviceHistory> data;
            using var cmd = Db.Connection.CreateCommand();

            cmd.CommandText = @"select u.user_id ,  sl.salutation , u.first_name , u.middle_name , u.last_name , u.email , rh.device_id , d.serial_number ,  
dt.type , db.brand , dm.model , sp.*, rh.assign_date ,rh.assign_days , rh.return_date , rh.request_date  , s.status_name , rh.return_to as admin_user_id  , 
 s1.salutation as  admin_salutation  ,  u1.first_name as admin_first_Name , u1.middle_name as admin_middle_name , u1.last_name as  admin_last_name  from request_history as rh
 inner join status as s  inner join specification as sp  inner join user as u   inner join device_type as dt inner join device_brand as db
 inner join salutation as sl  inner join device_model as  dm on  dm.device_model_id= rh.device_model and db.device_brand_id = rh.device_brand and
 sl.salutation_id = u.salutation_id and  dt.device_type_id = rh.device_type and  sp.specification_id =  rh.specification_id and
 s.status_id =  rh.status_id and  u.user_id = rh.user_id left join user u1  on  rh.return_to = u1.user_id  left join salutation as s1 on
 s1.salutation_id = u1.salutation_id  left join device as d  on d.device_id  = rh.device_id  where s.status_name like concat('%' ,@find ,'%') or d.serial_number like concat('%' ,@find ,'%') or 
 concat(u.first_name , ' ', if (u.middle_name is null, '' ,  concat(u.middle_name, ' ')) , u.last_name ) like concat('%' ,@find ,'%')
 or concat(dt.type , ' ' , db.brand , ' ' , dm.model) like concat('%' ,@find ,'%')
 " + attribute + " " + sortType + " limit @low , @high ;";
            cmd.CommandType = CommandType.Text;
            //cmd.CommandText = @"select u.user_id ,  sl.salutation , u.first_name , u.middle_name , u.last_name , u.email , rh.device_id , d.serial_number ,  
            //dt.type , db.brand , dm.model_name , sp.*, rh.assign_date ,rh.assign_days , rh.return_date , rh.request_time  , s.status , rh.return_to as admin_user_id  , 
            // s1.salutation as  admin_salutation  ,  u1.first_name as admin_first_Name , u1.middle_name as admin_middle_name , u1.last_name as  admin_last_name  from request_history as rh
            // inner join status as s  inner join specification as sp  inner join user as u   inner join device_type as dt inner join device_brand as db
            // inner join salutation as sl  inner join device_model as  dm on  dm.device_model_id= rh.device_model and db.device_brand_id = rh.device_brand and
            // sl.salutation_id = u.salutation_id and  dt.device_type_id = rh.device_type and  sp.specification_id =  rh.specification_id and
            // s.status_id =  rh.status_id and  u.user_id = rh.employee_id left join user u1  on  rh.return_to = u1.user_id  left join salutation as s1 on
            // s1.salutation_id = u1.salutation_id  left join device as d  on d.device_id  = rh.device_id  where s.status like concat('%' ,@find ,'%') or d.serial_number like concat('%' ,@find ,'%') or 
            // concat(u.first_name , ' ', if (u.middle_name is null, '' ,  concat(u.middle_name, ' ')) , u.last_name ) like concat('%' ,@find ,'%')
            // or concat(dt.type , ' ' , db.brand , ' ' , dm.model_name) like concat('%' ,@find ,'%')
            // limit @high , @low;";

            BindLimitParams(cmd, low, high);
                BindSearchParms(cmd, find);
            
            //var obj = new BindRequestData(Db);
           var data = await new BindRequestData(Db).BindHistoryData(await cmd.ExecuteReaderAsync());
            //var count = new TotalResultCount(Db);
            return await new TotalResultCount(Db).FindCount(data, "count_search", find);
        }

            

        public void BindSearchParms(MySqlCommand cmd,string find)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@find",
                DbType = DbType.String,
                Value = find,
            });
        }
            public void BindLimitParams(MySqlCommand cmd, int low , int high )
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@low",
                DbType = DbType.Int32,
                Value = low,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@high",
                DbType = DbType.Int32,
                Value = high,
            });
        }

        


    }
}
