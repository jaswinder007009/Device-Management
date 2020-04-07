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

    public class brand
    {
        public int device_brand_id { get; set; }
        public string device_brand { get; set; }
        internal AppDb Db { get; set; }
        public brand()
        {
        }
        internal brand(AppDb db)
        {
            Db = db;
        }
        public async Task<List<brand>> getallbrands()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select * from device_brand;";
            return await Readbrand(await cmd.ExecuteReaderAsync());
        }
        async public Task<List<brand>> Readbrand(DbDataReader reader)
        {
            var brands = new List<brand>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var brand1 = new brand()
                    {
                        device_brand_id = reader.GetInt32(0),
                        device_brand = reader.GetString(1),
                    };
                    brands.Add(brand1);
                }
            }
            return brands;
        }
    }
    public class logicaddtype
    {
        public AppDb Db { get; }
        public logicaddtype(AppDb db)
        {
            Db = db;
        }
        async public Task addType(type t)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = " addtype";
            cmd.CommandType = CommandType.StoredProcedure;
            BindDevice(cmd, t);
            await cmd.ExecuteNonQueryAsync();
        }
        private void BindDevice(MySqlCommand cmd, type t)
        {
            // cmd.Parameters.Add(new MySqlParameter("device_type_id", t.device_type_id));
            cmd.Parameters.Add(new MySqlParameter("type", t.device_type));
        }
    }

}



