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
public class Status
    {
        public int id { get; set; }
        public string name { get; set; }
        internal AppDb Db { get; set; }
        public Status()
        {
        }
        internal Status(AppDb db)
        {
            Db = db;
        }
        public async Task<List<Status>> getallstatus()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select * from status where status.status_name='Allocated' or status.status_name='Free' or status.status_name='Faulty';";
            return await Readstatus(await cmd.ExecuteReaderAsync());
        }
        async public Task<List<Status>> Readstatus(DbDataReader reader)
        {
            var status1 = new List<Status>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var status2 = new Status()
                    {
                        id = reader.GetInt32(0),
                        name = reader.GetString(1),
                    };
                    status1.Add(status2);
                }
            }
            return status1;
        }

    }
    public class TypeBrandModel
    {
        public string field { get; set; }
        internal AppDb Db { get; set; }
        public TypeBrandModel()
        {
        }
        internal TypeBrandModel(AppDb db)
        {
            Db = db;
        }
        async public Task addType(TypeBrandModel t)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into device_type (type) values ('" + t.field + "');";
            await cmd.ExecuteNonQueryAsync();
        }
        async public Task addmodel(TypeBrandModel m)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into device_model (model) values ('" + m.field + "');";
            await cmd.ExecuteNonQueryAsync();
        }
        async public Task addbrand(TypeBrandModel b)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into device_brand (brand) values ('" + b.field + "');";
            await cmd.ExecuteNonQueryAsync();
        }


    }

}
