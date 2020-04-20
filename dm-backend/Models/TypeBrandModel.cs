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
