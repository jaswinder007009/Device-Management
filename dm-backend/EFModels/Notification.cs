using System;
using System.Collections.Generic;

namespace dm_backend.EFModels
{
    public partial class Notification
    {
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public string NotificationType { get; set; }
        public int DeviceId { get; set; }
        public int StatusId { get; set; }
        public string Message { get; set; }

        public Device Device { get; set; }
        public User User { get; set; }
    }
}
