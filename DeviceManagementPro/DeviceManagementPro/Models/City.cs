using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class City
    {
        public City()
        {
            Address = new HashSet<Address>();
        }

        public int CityId { get; set; }
        public string CityName { get; set; }
        public int StateId { get; set; }

        public State State { get; set; }
        public ICollection<Address> Address { get; set; }
    }
}
