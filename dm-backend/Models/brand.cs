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
        async public Task addbrand(Brand b)
            {
                using var cmd = Db.Connection.CreateCommand();
                cmd.CommandText = @"insert into device_brand (brand) values ('"+ b.device_brand +"');";
                await cmd.ExecuteNonQueryAsync();
            }
      
    }

}



