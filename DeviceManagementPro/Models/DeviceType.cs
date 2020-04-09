using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class DeviceType
    {
        public DeviceType()
        {
            Device = new HashSet<Device>();
        }

        public int DeviceTypeId { get; set; }
        public string Type { get; set; }

        public ICollection<Device> Device { get; set; }
    }
}
