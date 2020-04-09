using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class Salutation
    {
        public Salutation()
        {
            Dependent = new HashSet<Dependent>();
            User = new HashSet<User>();
        }

        public int SalutationId { get; set; }
        public string Salutation1 { get; set; }

        public ICollection<Dependent> Dependent { get; set; }
        public ICollection<User> User { get; set; }
    }
}
