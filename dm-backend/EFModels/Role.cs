using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class Role
    {
        public Role()
        {
            RoleToPermission = new HashSet<RoleToPermission>();
            UserToRole = new HashSet<UserToRole>();
        }

        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public ICollection<RoleToPermission> RoleToPermission { get; set; }
        public ICollection<UserToRole> UserToRole { get; set; }
    }
}
