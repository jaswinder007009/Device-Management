using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class EducationStreams
    {
        public EducationStreams()
        {
            EducationDetails = new HashSet<EducationDetails>();
        }

        public int EducationStreamsId { get; set; }
        public string StreamName { get; set; }

        public ICollection<EducationDetails> EducationDetails { get; set; }
    }
}
