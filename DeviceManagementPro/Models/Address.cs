using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models

{
    public partial class Address
    {
        public Address()
        {
            UserToAddress = new HashSet<UserToAddress>();
        }

        public int AddressId { get; set; }
        public int AddressTypeId { get; set; }
        public string Address1 { get; set; }
        public int CityId { get; set; }
        public string Pin { get; set; }
        public int UserId { get; set; }

        public City City { get; set; }
        public User User { get; set; }
        public ICollection<UserToAddress> UserToAddress { get; set; }
    }
}
