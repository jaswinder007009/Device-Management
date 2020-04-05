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
        public async Task<Result<RequestDeviceHistory>> FindCount( List<RequestDeviceHistory> data, string querry , string find , int offset , int limit , string serialNumber , string sortType , string attribute, string status)
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