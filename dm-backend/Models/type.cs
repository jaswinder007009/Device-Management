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

        // public async Task<List<Model>> getallmodel()
        // {
        //     using var cmd = Db.Connection.CreateCommand();
        //     cmd.CommandText = @"select * from device_model;";
        //     return await Readmodel(await cmd.ExecuteReaderAsync());
        // }
        // async public Task<List<Model>> Readmodel(DbDataReader reader)
        // {
        //     var models = new List<Model>();
        //     using (reader)
        //     {
        //         while (await reader.ReadAsync())
        //         {
        //             var model1 = new Model()
        //             {
        //                 device_model_id = reader.GetInt32(0),
        //                 model = reader.GetString(1),
        //             };
        //             models.Add(model1);
        //         }
        //     }
        //     return models;
        // }
        async public Task addmodel(Model m)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into device_model (model) values ('"+m.model+"');";

          //  BindDevice(cmd, m);
            await cmd.ExecuteNonQueryAsync();
        }
        // private void BindDevice(MySqlCommand cmd, Model m)
        // {
        //     cmd.Parameters.Add(new MySqlParameter("device_model_id", m.device_model_id));
        //     cmd.Parameters.Add(new MySqlParameter("model", m.model));
        // }
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
        // public async Task<List<type>> getalltypes()
        // {
        //     using var cmd = Db.Connection.CreateCommand();
        //     cmd.CommandText = @"select * from device_type;";
        //     return await Readtype(await cmd.ExecuteReaderAsync());
        // }
        // async public Task<List<type>> Readtype(DbDataReader reader)
        // {
        //     var types = new List<type>();
        //     using (reader)
        //     {
        //         while (await reader.ReadAsync())
        //         {
        //             var type1 = new type()
        //             {
        //                 device_type_id = reader.GetInt32(0),
        //                 device_type = reader.GetString(1),
        //             };
        //             types.Add(type1);
        //         }
        //     }
        //     return types;
        // }
        async public Task addType(type t)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert into device_type (type) values ('"+t.device_type+"');";
           // cmd.CommandType = CommandType.StoredProcedure;
            //BindDevice(cmd, t);
            await cmd.ExecuteNonQueryAsync();
        }
        // private void BindDevice(MySqlCommand cmd, type t)
        // {
           
        //     cmd.Parameters.Add(new MySqlParameter("type", t.device_type));
        // }

    }

}
