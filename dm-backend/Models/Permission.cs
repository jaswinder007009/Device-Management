using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dm_backend.Controllers;

namespace dm_backend.Models
{
    public class Permission : GenericModel
    {
        public Permission(AppDb db) : base(db)
        {


        }
        public async Task<List<GenericModel>> GetAllPermissions()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select  * from permission;";
            return await ReadAllDropdowns(await cmd.ExecuteReaderAsync());
        }



    }
}