using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class Department
    {
        public Department()
        {
            DepartmentDesignation = new HashSet<DepartmentDesignation>();
        }

        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }

        public ICollection<DepartmentDesignation> DepartmentDesignation { get; set; }
    }
}
