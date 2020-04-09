using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class RoleToPermission
    {
        public int RoleId { get; set; }
        public int PermissionId { get; set; }

        public Permission Permission { get; set; }
        public Role Role { get; set; }
    }
}
