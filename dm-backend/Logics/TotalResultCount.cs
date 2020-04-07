using System.Collections.Generic;
using System.Threading.Tasks;
using dm_backend.Models;
using System.Data.Common;
using System;
using System.Data;
using MySql.Data.MySqlClient;
using dm_backend.Logics;

namespace dm_backend.Models{
    public class TotalResultCount
    {
        public AppDb Db { get; }

        public TotalResultCount(AppDb db)
        {
            Db = db;
        }
        public async Task<Result<RequestDeviceHistory>> FindCount( List<RequestDeviceHistory> data, string querry , string find , int offset , int limit , string serialNumber )
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select count(*)  as total_count from (" + querry + ") as history ;";
            var bind = new SortRequestHistoryData(Db);
            bind.BindLimitParams( cmd , offset , limit);
            bind.BindSearchParms(cmd, find, serialNumber);

            cmd.CommandType = CommandType.Text;
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