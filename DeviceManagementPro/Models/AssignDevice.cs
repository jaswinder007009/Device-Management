using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class AssignDevice
    {
        public int AssignDeviceId { get; set; }
        public int UserId { get; set; }
        public int DeviceId { get; set; }
        public int ReturnTo { get; set; }

        public Device Device { get; set; }
        public User User { get; set; }
    }
}
