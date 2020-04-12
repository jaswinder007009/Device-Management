using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class Dependent
    {
        public Dependent()
        {
            UserToDependent = new HashSet<UserToDependent>();
        }

        public int DependentId { get; set; }
        public int? RelationId { get; set; }
        public int SalutationId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int ContactId { get; set; }

        public ContactNumber Contact { get; set; }
        public Relation Relation { get; set; }
        public Salutation Salutation { get; set; }
        public ICollection<UserToDependent> UserToDependent { get; set; }
    }
}
