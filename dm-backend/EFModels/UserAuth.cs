using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class UserAuth
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public byte[] Hashpassword { get; set; }
        public byte[] Saltpassword { get; set; }
    }
}
