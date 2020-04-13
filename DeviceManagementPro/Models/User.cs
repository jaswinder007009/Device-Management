using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class User
    {
        public User()
        {
           
            Notification = new HashSet<Notification>();
           
       
            UserToRole = new HashSet<UserToRole>();
        }

        public int UserId { get; set; }
      
        public string Email { get; set; }
        public byte[] Hashpassword { get; set; }
        public byte[] Saltpassword { get; set; }
       

        public ICollection<Notification> Notification { get; set; }
        public ICollection<UserToRole> UserToRole { get; set; }
    }
}
