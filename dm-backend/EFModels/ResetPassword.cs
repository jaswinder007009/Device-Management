using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class ResetPassword
    {
        public string Email { get; set; }
        public string Guid { get; set; }
        public string Password { get; set; }

        
    }
}
