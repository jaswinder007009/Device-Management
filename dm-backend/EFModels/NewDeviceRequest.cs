using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class NewDeviceRequest
    {
        public int NewDeviceRequestId { get; set; }
        public int EmployeeId { get; set; }
        public string Description { get; set; }
    }
}
