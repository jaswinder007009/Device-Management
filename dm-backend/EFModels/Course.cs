using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class Course
    {
        public Course()
        {
            EducationDetails = new HashSet<EducationDetails>();
        }

        public int CourseId { get; set; }
        public string CourseName { get; set; }

        public ICollection<EducationDetails> EducationDetails { get; set; }
    }
}
