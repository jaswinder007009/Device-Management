using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class Notification
    {
        public int NotificationId { get; set; }
        public int EmployeeId { get; set; }
        public string NotificationType { get; set; }
        public string Message { get; set; }
        public DateTime NotificationDate { get; set; }
        public int? Isread { get; set; }

        public User Employee { get; set; }
    }
}
