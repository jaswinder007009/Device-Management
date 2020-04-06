using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class Permission
    {
        public Permission()
        {
            RoleToPermission = new HashSet<RoleToPermission>();
        }

        public int PermissionId { get; set; }
        public string PermissionName { get; set; }

        public ICollection<RoleToPermission> RoleToPermission { get; set; }
    }
}
