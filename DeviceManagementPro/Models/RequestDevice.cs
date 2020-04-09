using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class RequestDevice
    {
        public int RequestDeviceId { get; set; }
        public int EmployeeId { get; set; }
        public string DeviceModel { get; set; }
        public string DeviceType { get; set; }
        public string DeviceBrand { get; set; }
        public int SpecificationId { get; set; }
        public sbyte? NoOfDays { get; set; }
        public string Comment { get; set; }

        public User Employee { get; set; }
        public Specification Specification { get; set; }
    }
}
