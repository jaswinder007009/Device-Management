using MySql.Data.MySqlClient;
using RequestAdmin.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using UserManagement;

namespace RequestAdmin.Logics
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

                "serialnumber" =>
                         "order by d.serial_number",

                "device" =>
                         "order by concat(db.brand, ' ', dm.model_name)",

                _ =>
                    "order by concat(u.first_name , ' ', if (u.middle_name is null, '' , concat(u.middle_name , ' ')) , u.last_name )"
            };
            return attribute;
        }




        private int page_limit(string limit , int def)
        {
            int limit_size;
                try
            {
                if(limit != "" &&  Int32.Parse(limit) > 0)
                limit_size = Int32.Parse(limit);
                else
                    limit_size = def;
            }
            catch(Exception e)
            {
                limit_size = def;
            }
            return limit_size;
        }

        /*
             public string CreateParams(string status , string sort , string find , string deviceserialNumber , string sortElement ,  string sortType , int page = 1 , int  limit = 10 )
        {
            if (status != "assigned" || status != "reject" || status == "" || status == null)
                status = "";
            else
                status = " and s.status = " + status + "";
            if (deviceserialNumber == null)
                deviceserialNumber = "";
            if (sortType == null)
                sortType = "";
            if (sort == null)
                sort = "";
            if (find == null)
                find = "";
            if (page == null)
                page =;
            if (limit == null)
                limit = 10;

            string command = @"select u.user_id ,  sl.salutation , u.first_name , u.middle_name , u.last_name , u.email , rh.device_id , d.serial_number ,  
            dt.type , db.brand , dm.model_name , sp.*, rh.assign_date ,rh.assign_days , rh.return_date , rh.request_time  , s.status , rh.return_to as admin_user_id  , 
             s1.salutation as admin_salutation  ,  u1.first_name as admin_first_Name , u1.middle_name as admin_middle_name , u1.last_name as admin_last_name  from request_history as rh
            inner join status as s  inner join specification as sp  inner join user as u   inner join device_type as dt inner join device_brand as db
              inner join salutation as sl  inner join device_model as dm on dm.device_model_id = rh.device_model and db.device_brand_id = rh.device_brand and
            sl.salutation_id = u.salutation_id and dt.device_type_id = rh.device_type and sp.specification_id = rh.specification_id and
            s.status_id = rh.status_id and u.user_id = rh.employee_id left join user u1  on rh.return_to = u1.user_id  left join salutation as s1 on
            s1.salutation_id = u1.salutation_id  left join device as d  on d.device_id = rh.device_id  where d.serial_number like concat('%', @serialnumber, '%')  
            "+ status + @"  and  concat(u.first_name, ' ', if (u.middle_name is null, '' ,  concat(u.middle_name, ' ')) , u.last_name ) like concat('%' ,@find ,'%')
            " + FindSortingAttribute(sortElement) + " " + sortType + " limit @offset, @limit";
            return command;
        }*/

        async public Task<Result<RequestDeviceHistory>> GetSortData(string find, string serialNumber, string status , string sortElement, string sortType, string page, string limit)
        {
            var attribute = FindSortingAttribute(sortElement);
            using var cmd = Db.Connection.CreateCommand();
            if (status == "assigned" || status == "reject")
                status = " and s.status = '" + status + "'";
            else
                status = "";
            int pageValue = page_limit(page, 1);
            int limitValue = page_limit(limit, 10);
            int offset = ((pageValue-1) * limitValue);

            string command =  @"select u.user_id ,  sl.salutation , u.first_name , u.middle_name , u.last_name , u.email , rh.device_id , d.serial_number as serial_number ,  
            dt.type , db.brand , dm.model_name , sp.*, rh.assign_date ,rh.assign_days , rh.return_date , rh.request_time  , s.status , rh.return_to as admin_user_id  , 
             s1.salutation as  admin_salutation  ,  u1.first_name as admin_first_Name , u1.middle_name as admin_middle_name , u1.last_name as  admin_last_name  from request_history as rh
            inner join status as s  inner join specification as sp  inner join user as u   inner join device_type as dt inner join device_brand as db
              inner join salutation as sl  inner join device_model as  dm on  dm.device_model_id= rh.device_model and db.device_brand_id = rh.device_brand and
            sl.salutation_id = u.salutation_id and  dt.device_type_id = rh.device_type and  sp.specification_id =  rh.specification_id and
            s.status_id =  rh.status_id and  u.user_id = rh.employee_id left join user u1  on  rh.return_to = u1.user_id  left join salutation as s1 on
            s1.salutation_id = u1.salutation_id  left join device as d  on d.device_id  = rh.device_id 
            where  concat(u.first_name , ' ', if (u.middle_name is null, '' ,  concat(u.middle_name, ' ')) , u.last_name ) like concat('%' ,@find ,'%')
             " + status+" " + attribute + " " + sortType + " ";

            if (serialNumber != null && serialNumber != "")
                command = "select * from (" + command + ") as history where history.serial_number = @serialnumber";

            cmd.CommandText = command + " limit @offset , @limit ;";
            
            cmd.CommandType = CommandType.Text;

            BindLimitParams(cmd, offset, limitValue);
            BindSearchParms(cmd, find , serialNumber);

            //var obj = new BindRequestData(Db);
            var data = await new BindRequestData(Db).BindHistoryData(await cmd.ExecuteReaderAsync() );
            //var count = new TotalResultCount(Db);
            return await new TotalResultCount(Db).FindCount(data, command , find, offset, limitValue, serialNumber , sortType , attribute , status);
        }



        public void BindSearchParms(MySqlCommand cmd, string find , string serialNumber)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@find",
                DbType = DbType.String,
                Value = find,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@serialnumber",
                DbType = DbType.String,
                Value = serialNumber,
            });
        } 
            public void BindLimitParams(MySqlCommand cmd, int low , int high )
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@offset",
                DbType = DbType.Int32,
                Value = low,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@limit",
                DbType = DbType.Int32,
                Value = high,
            });
        }

        


    }
}
