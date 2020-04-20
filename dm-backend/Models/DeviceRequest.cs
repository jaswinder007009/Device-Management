using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dm_backend.Models
{
    public class DeviceRequest
    {
        public int userId { get; set; }
        public string devicetype { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public int specificationId { get; set; }
        public int days { get; set; }
        public string comment { get; set; } 
    }
}
