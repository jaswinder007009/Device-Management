using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dm_backend.Models
{
    public class role_permission
    {

        public int Role_Id { get; set; }
        public string Role_Name { get; set; }

        public int Permission_id { get; set; }
        public string Permission_Name { get; set; }
    }
}
