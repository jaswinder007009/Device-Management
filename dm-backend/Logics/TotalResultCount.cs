using System.Collections.Generic;
using System.Threading.Tasks;
using UserManagement;
using RequestAdmin.Models;
using System.Data.Common;
using System;
using System.Data;
using MySql.Data.MySqlClient;

namespace RequestAdmin.Logics
{
    public class TotalResultCount
    {
        public AppDb Db { get; }

        public TotalResultCount(AppDb db)
        {
            Db = db;
        }
        public async Task<Result<RequestDeviceHistory>> FindCount( List<RequestDeviceHistory> data, string querry , string find)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = querry;

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.String,
                Value = find,
            });
            return BindResult(await cmd.ExecuteReaderAsync(), data);
        }

        public Result<RequestDeviceHistory> BindResult(DbDataReader reader, List<RequestDeviceHistory> data)
        {
            if (reader.Read())
                return new Result<RequestDeviceHistory>()
                {
                    Results = data,
                    ResultCount = reader.GetInt32(0),
                };
            return null;
        }
    }
}