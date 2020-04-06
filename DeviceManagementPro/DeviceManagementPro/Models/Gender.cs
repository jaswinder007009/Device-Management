using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class Gender
    {
        public Gender()
        {
            User = new HashSet<User>();
        }

        public int GenderId { get; set; }
        public string Gender1 { get; set; }

        public ICollection<User> User { get; set; }
    }
}
