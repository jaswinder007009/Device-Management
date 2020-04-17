using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Common;
using MySql.Data.MySqlClient;
using System.Data;
using dm_backend;

namespace dm_backend.Models
{

    public class Brand
    {
        public int device_brand_id { get; set; }
        public string device_brand { get; set; }
        internal AppDb Db { get; set; }
        public Brand()
        {
        }
        internal Brand(AppDb db)
        {
            Db = db;
        }
        // public async Task<List<Brand>> getallbrands()
        // {
        //     using var cmd = Db.Connection.CreateCommand();
        //     cmd.CommandText = @"select * from device_brand;";
        //     return await Readbrand(await cmd.ExecuteReaderAsync());
        // }
        // async public Task<List<Brand>> Readbrand(DbDataReader reader)
        // {
        //     var brands = new List<Brand>();
        //     using (reader)
        //     {
        //         while (await reader.ReadAsync())
        //         {
        //             var brand1 = new Brand()
        //             {
        //                 device_brand_id = reader.GetInt32(0),
        //                 device_brand = reader.GetString(1),
        //             };
        //             brands.Add(brand1);
        //         }
        //     }
        //     return brands;
        // }
        async public Task addbrand(Brand b)
            {
                using var cmd = Db.Connection.CreateCommand();
                cmd.CommandText = @"insert into device_brand (brand) values ('"+ b.device_brand +"');";
                //cmd.CommandType = CommandType.StoredProcedure;
              //  BindDevice(cmd, b);
                await cmd.ExecuteNonQueryAsync();
            }
            // private void BindDevice(MySqlCommand cmd, Brand b)
            // {
                
            //     cmd.Parameters.Add(new MySqlParameter("brand", b.device_brand));
            // }
    }

}



