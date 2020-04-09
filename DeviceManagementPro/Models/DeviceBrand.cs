using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class DeviceBrand
    {
        public DeviceBrand()
        {
            Device = new HashSet<Device>();
        }

        public int DeviceBrandId { get; set; }
        public string Brand { get; set; }

        public ICollection<Device> Device { get; set; }
    }
}
