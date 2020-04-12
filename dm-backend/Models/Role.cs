using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dm_backend.Controllers;

namespace dm_backend.Models
{
    public class Role : GenericModel
    {
        public Role(AppDb db) : base(db)
        {


        }
        public async Task<List<GenericModel>> GetAllRoles()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"select  * from role;";
            return await ReadAllDropdowns(await cmd.ExecuteReaderAsync());
        }



    }
}
