using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class Device
    {
        public Device()
        {
            AssignDevice = new HashSet<AssignDevice>();
            Complaints = new HashSet<Complaints>();
        }

        public int DeviceId { get; set; }
        public int DeviceTypeId { get; set; }
        public int DeviceBrandId { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string Price { get; set; }
        public string SerialNumber { get; set; }
        public sbyte? WarrantyYear { get; set; }
        public int StatusId { get; set; }
        public int SpecificationId { get; set; }
        public DateTime EntryDate { get; set; }

        public DeviceBrand DeviceBrand { get; set; }
        public DeviceType DeviceType { get; set; }
        public Specification Specification { get; set; }
        public Status Status { get; set; }
        public ICollection<AssignDevice> AssignDevice { get; set; }
        public ICollection<Complaints> Complaints { get; set; }
    }
}
