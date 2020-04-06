using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class Relation
    {
        public Relation()
        {
            Dependent = new HashSet<Dependent>();
        }

        public int RelationId { get; set; }
        public string RelationName { get; set; }

        public ICollection<Dependent> Dependent { get; set; }
    }
}
