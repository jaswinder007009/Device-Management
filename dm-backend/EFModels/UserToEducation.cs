using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class UserToEducation
    {
        public int UserId { get; set; }
        public int EducationDetailsId { get; set; }

        public EducationDetails EducationDetails { get; set; }
    }
}
