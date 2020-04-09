﻿using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class UserToAddress
    {
        public int UserId { get; set; }
        public int AddressId { get; set; }

        public Address Address { get; set; }
        public User User { get; set; }
    }
}
