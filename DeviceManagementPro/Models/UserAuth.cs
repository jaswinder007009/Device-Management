using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class UserAuth
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public byte[] Hashpassword { get; set; }
        public byte[] Saltpassword { get; set; }
    }
}
