using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class UserToEducation
    {
        public int UserId { get; set; }
        public int EducationDetailsId { get; set; }

        public EducationDetails EducationDetails { get; set; }
    }
}
