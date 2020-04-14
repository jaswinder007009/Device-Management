using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class UserToDependent
    {
        public int UserToDependentId { get; set; }
        public int UserId { get; set; }
        public int DependentId { get; set; }

        public Dependent Dependent { get; set; }
        public User User { get; set; }
    }
}
