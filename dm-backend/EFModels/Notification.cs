using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class Notification
    {
        public int NotificationId { get; set; }
        public int EmployeeId { get; set; }
        public string NotificationType { get; set; }
        public string Message { get; set; }
        public DateTime NotificationDate { get; set; }

        public User Employee { get; set; }
    }
}
