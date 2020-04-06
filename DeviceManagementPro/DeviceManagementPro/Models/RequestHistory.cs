using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class RequestHistory
    {
        public int RequestHistoryId { get; set; }
        public int SpecificationId { get; set; }
        public string DeviceType { get; set; }
        public string DeviceBrand { get; set; }
        public string Model { get; set; }
        public int StatusId { get; set; }
        public sbyte? AssignDays { get; set; }
        public int EmployeeId { get; set; }
        public int? DeviceId { get; set; }
        public int? ReturnTo { get; set; }

        public User Employee { get; set; }
        public Specification Specification { get; set; }
        public Status Status { get; set; }
    }
}
