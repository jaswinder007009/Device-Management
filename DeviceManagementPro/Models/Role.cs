using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class Role
    {
        public Role()
        {
           
            UserToRole = new HashSet<UserToRole>();
        }

        public int RoleId { get; set; }
        public string RoleName { get; set; }

       
        public ICollection<UserToRole> UserToRole { get; set; }
    }
}
