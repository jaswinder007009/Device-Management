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
    public class Model
    {
        public int device_model_id { get; set; }
        public string model { get; set; }
        internal AppDb Db { get; set; }
        public Model()
        {
        }
        internal Model(AppDb db)
        {
            Db = db;
        }

        async public Task addmodel(Model m)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into device_model (model) values ('"+m.model+"');";

          //  BindDevice(cmd, m);
            await cmd.ExecuteNonQueryAsync();
        }
        private void BindDevice(MySqlCommand cmd, Model m)
        {
            cmd.Parameters.Add(new MySqlParameter("device_model_id", m.device_model_id));
            cmd.Parameters.Add(new MySqlParameter("model", m.model));
        }
    }

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
        async public Task addType(type t)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into device_type (type) values ('"+t.device_type+"');";
            await cmd.ExecuteNonQueryAsync();
        }

    }

}
