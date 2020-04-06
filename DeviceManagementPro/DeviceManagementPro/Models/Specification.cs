using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class Specification
    {
        public Specification()
        {
            Device = new HashSet<Device>();
            RequestDevice = new HashSet<RequestDevice>();
            RequestHistory = new HashSet<RequestHistory>();
        }

        public int SpecificationId { get; set; }
        public string Ram { get; set; }
        public string Storage { get; set; }
        public string ScreenSize { get; set; }
        public string Connectivity { get; set; }

        public ICollection<Device> Device { get; set; }
        public ICollection<RequestDevice> RequestDevice { get; set; }
        public ICollection<RequestHistory> RequestHistory { get; set; }
    }
}
