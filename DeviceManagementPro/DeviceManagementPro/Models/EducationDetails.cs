using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class EducationDetails
    {
        public EducationDetails()
        {
            UserToEducation = new HashSet<UserToEducation>();
        }

        public int EducationDetailsId { get; set; }
        public string InstitutionName { get; set; }
        public int CourseId { get; set; }
        public int StreamId { get; set; }
        public string BoardUniversity { get; set; }
        public decimal? PercentageGpa { get; set; }

        public Course Course { get; set; }
        public EducationStreams Stream { get; set; }
        public ICollection<UserToEducation> UserToEducation { get; set; }
    }
}
