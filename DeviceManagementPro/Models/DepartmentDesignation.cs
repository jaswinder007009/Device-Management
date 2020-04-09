using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class DepartmentDesignation
    {
        public DepartmentDesignation()
        {
            User = new HashSet<User>();
        }

        public int DepartmentDesignationId { get; set; }
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }

        public Department Department { get; set; }
        public Designation Designation { get; set; }
        public ICollection<User> User { get; set; }
    }
}
