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
    public class type
    {
        public int device_type_id { get; set; }
        public string device_type { get; set; }
        internal AppDb Db { get; set; }
        public type()
        {
        }
        internal type(AppDb db)
        {
            Db = db;
        }
        public async Task<List<type>> getalltypes()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select * from device_type;";
            return await Readtype(await cmd.ExecuteReaderAsync());
        }
        async public Task<List<type>> Readtype(DbDataReader reader)
        {
            var types = new List<type>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var type1 = new type()
                    {
                        device_type_id = reader.GetInt32(0),
                        device_type = reader.GetString(1),
                    };
                    types.Add(type1);
                }
            }
            return types;
        }
    }
    public class logicaddbrand
    {
        public AppDb Db { get; }
        public logicaddbrand(AppDb db)
        {
            Db = db;
        }
        async public Task addbrand(brand b)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = " addbrand";
            cmd.CommandType = CommandType.StoredProcedure;
            BindDevice(cmd, b);
            await cmd.ExecuteNonQueryAsync();
        }
        private void BindDevice(MySqlCommand cmd, brand b)
        {
            // cmd.Parameters.Add(new MySqlParameter("device_brand_id", b.device_brand_id));
            cmd.Parameters.Add(new MySqlParameter("brand", b.device_brand));
        }
    }


}
