using MySql.Data.MySqlClient;
using RequestAdmin.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using UserManagement;

namespace RequestAdmin.Logics
{
    public class SearchRequestHistory
    {


        public AppDb Db { get; }

        public SearchRequestHistory(AppDb db)
         {
               Db = db;
         }

        async public Task<Result<RequestDeviceHistory>> SearchDeviceRequest(string search , int low , int high)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "search_request_history";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@fin",
                DbType = DbType.String,
                Value = search,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@low",
                DbType = DbType.Int32,
                Value = low,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@high",
                DbType = DbType.Int32,
                Value = high,
            });
            cmd.CommandType = CommandType.StoredProcedure;
            var count = new TotalResultCount(Db);
            var obj = new BindRequestData(Db);
            var data = await obj.BindHistoryData(await cmd.ExecuteReaderAsync());
            return await count.FindCount(data, "count_search" , search);

        }

/*        private async Task<Result<RequestDeviceHistory>> findCount(MySqlCommand cmd, List<RequestDeviceHistory> data, string querry , string value)
        {
            cmd.CommandText = querry;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.String,
                Value = value,
            });
            return  new TotalResultCount(Db).bindResult(await cmd.ExecuteReaderAsync(), data);
        }
        */








    }
}
