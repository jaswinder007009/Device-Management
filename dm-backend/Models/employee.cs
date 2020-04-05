using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using dm_backend.Models;

using MySql.Data.MySqlClient;


namespace dm_backend
{

    public class employee
    {

        public AppDb Db { get; }

        public employee(AppDb db)
        {
            Db = db;
        }
        public async Task<List<device>> getCurrentDevice(int id,string search)
        {
            using var cmd = Db.Connection.CreateCommand();

            cmd.CommandText = @"select * from(select device_type.type,device_brand.brand,device_model.model,assign_device.assign_date,assign_device.return_date from user,device_type,device_model,device_brand,assign_device,device
where  user.user_id=assign_device.user_id and assign_device.device_id=device.device_id and device.device_type_id=device_type.device_type_id and device.device_brand_id=device_brand.device_brand_id
and device.device_model_id=device_model.device_model_id and assign_device.user_id=@id) as demo WHERE demo.type LIKE '%" + @search + "%' or demo.brand LIKE '%" + @search + "%' or demo.model LIKE '%" + @search + "%'; ;";

            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@search",
                DbType = DbType.String,
                Value = search,
            });

            return await ReadAllDevice(await cmd.ExecuteReaderAsync());

        }
        public async Task<List<device>> getPreviousDevice(int id,string search)
        {
            using var cmd = Db.Connection.CreateCommand();

            cmd.CommandText = @"select * from(select device_type.type,device_brand.brand,device_model.model,assign_date,return_date from user,device_type,device_brand,device_model,request_history 
where user.user_id=request_history.user_id and request_history.device_type=device_type.device_type_id and request_history.device_brand=device_brand.device_brand_id 
and request_history.device_model=device_model.device_model_id and request_history.user_id=@id) as demo WHERE demo.type LIKE '%" +@search+ "%' or demo.brand LIKE '%" + @search + "%' or demo.model LIKE '%" + @search  + "%';";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@search",
                DbType = DbType.String,
                Value = search,
            });
            Console.WriteLine(cmd.CommandText);
            Console.WriteLine("id = " + cmd.Parameters["@id"].Value);
            Console.WriteLine("Search = " + cmd.Parameters["@search"].Value);
            return await ReadAllDevice(await cmd.ExecuteReaderAsync());




        }


        public static string GetSafeString(DbDataReader reader, string colName)
		{
		return reader[colName] != DBNull.Value ? (string)reader[colName].ToString() : "";
		}
		
		public async Task<List<device>> ReadAllDevice(DbDataReader reader)
		{
			Console.WriteLine("Rows" + reader.HasRows);
			var posts = new List<device>();
			using (reader)
			{
				while (await reader.ReadAsync())
				{
					Console.WriteLine("Found a row");
					var post = new device()
					{
						type = reader.GetString(0),
						brand = reader.GetString(1),
						model = reader.GetString(2),
						assign_date = GetSafeString(reader,"assign_date"),
						return_date = GetSafeString(reader,"return_date"),
					};
					posts.Add(post);
				}
			}
			return posts;
		}

    }



}
