using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using dm_backend;
namespace dm_backend.Models
{
    public class Specification
    {
        public int specification_id { get; set; }

        public string RAM { get; set; }
        public string Storage { get; set; }
        public string Screen_size { get; set; }

        public string Connectivity { get; set; }

        internal AppDb Db { get; set; }

        public Specification()
        {
        }

        internal Specification(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Specification>> getAllSpecifications()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select * from specification;";

            return await ReadSpecifications(await cmd.ExecuteReaderAsync());
        }
        public async Task<List<Specification>> getspecbyid(int specification_id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select * from specification where specification.specification_id=@specification_id;";
            
            cmd.Parameters.AddWithValue("@specification_id", specification_id);
            return await ReadSpecifications(cmd.ExecuteReader());
        }
        public async Task<List<Specification>> ReadSpecifications(DbDataReader reader)
        {
            var specifications = new List<Specification>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var spec1 = new Specification()
                    {
                        specification_id = reader.GetInt32(0),
                        RAM = reader.GetString(1),
                        Storage = reader.GetString(2),
                        Screen_size = reader.GetString(3),
                        Connectivity = reader.GetString(4)


                    };
                    specifications.Add(spec1);
                }
            }
            return specifications;
        }


    }
    public class insertspec
    {
        public AppDb Db { get; }
        public insertspec(AppDb db)
        {
            Db = db;
        }
        async public Task addspecification(Specification s)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "addSpecification";
            cmd.CommandType = CommandType.StoredProcedure;
            Bindspec(cmd, s);
            await cmd.ExecuteNonQueryAsync();
        }
        private void Bindspec(MySqlCommand cmd, Specification s)
        {
            cmd.Parameters.Add(new MySqlParameter("RAM", s.RAM));
            cmd.Parameters.Add(new MySqlParameter("storage", s.Storage));
            cmd.Parameters.Add(new MySqlParameter("screen_size", s.Screen_size));
            cmd.Parameters.Add(new MySqlParameter("connectivity", s.Connectivity));
        }
    }
    public class updatespec
    {
        public AppDb Db { get; }
        public updatespec(AppDb db)
        {
            Db = db;
        }
        async public Task updatespecification(Specification s1)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "updatespecification";
            cmd.CommandType = CommandType.StoredProcedure;
            Bindspecs(cmd, s1);
            await cmd.ExecuteNonQueryAsync();
        }
        private void Bindspecs(MySqlCommand cmd, Specification s1)
        {
            cmd.Parameters.Add(new MySqlParameter("specification_id", s1.specification_id));
            cmd.Parameters.Add(new MySqlParameter("RAM", s1.RAM));
            cmd.Parameters.Add(new MySqlParameter("storage", s1.Storage));
            cmd.Parameters.Add(new MySqlParameter("screen_size", s1.Screen_size));
            cmd.Parameters.Add(new MySqlParameter("connectivity", s1.Connectivity));
        }
    }

    public class SpecificationModel
    {
        public string RAM { get; set; }
        public string Storage { get; set; }
        public string ScreenSize { get; set; }
        public string Connectivity { get; set; }

        internal AppDb Db { get; set; }

        public SpecificationModel()
        {

        }
        internal SpecificationModel(AppDb db)
        {
            Db = db;
        }

        // Returns Specification ID from given specifications
        // Otherwise throws a NullReferenceException
        internal int GetSpecificationID(AppDb db)
        {
            using var cmd = db.Connection.CreateCommand();

            cmd.CommandText = "get_specification_id";
            cmd.CommandType = CommandType.StoredProcedure;
            BindSpecificationParams(cmd);
            MySqlParameter SpecificationID = new MySqlParameter("@output", MySqlDbType.Int32) { Direction = ParameterDirection.ReturnValue };
            cmd.Parameters.Add(SpecificationID);
            cmd.ExecuteScalar();

            if (SpecificationID.Value == DBNull.Value)
            {
                throw new NullReferenceException("Specifications are not valid");
            }
            return (int)SpecificationID.Value;
        }

        private void BindSpecificationParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter("var_ram", RAM));
            cmd.Parameters.Add(new MySqlParameter("var_storage", Storage));
            cmd.Parameters.Add(new MySqlParameter("var_screen_size", ScreenSize));
            cmd.Parameters.Add(new MySqlParameter("var_connectivity", Connectivity));
        }
    }
}
