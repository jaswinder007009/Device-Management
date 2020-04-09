using System.Collections.Generic;
using System;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using dm_backend.Models;
using static dm_backend.Utilities.Readers;

namespace dm_backend.Models
{
    public class NotificationModel
    {
        public int? notificationId { get; set; }
        public int userId { get; set; }
        public string deviceModel { get; set; }
        public string deviceBrand { get; set; }
        public string deviceType { get; set; }
        public SpecificationModel specs { get; set; }    
        public string notificationDate { get; set; }
        public string status { get; set; }
        public string message { get; set; }
        internal AppDb Db { get; set; }

        public NotificationModel()
        {
        }
        public NotificationModel(AppDb db)
        {
            Db = db;
        }



        public List<NotificationModel> GetNotifications(int userId,string sortField,int sortDirection,string searchField)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = get_all_notifications+searchQuery;
            if(userId!=-1)
                cmd.CommandText +=@" having user_id="+userId;
            cmd.CommandText +=@" order by "+sortField+(sortDirection==-1 ? " desc":" asc");; 
            cmd.Parameters.AddWithValue("@search_field", searchField); 
            using MySqlDataReader reader =  cmd.ExecuteReader();
            return ReadAll(reader);
        }


        private List<NotificationModel> ReadAll(MySqlDataReader reader)
        {
            var notifications = new List<NotificationModel>();
            using (reader)
            {
                while (reader.Read())
                {
                    
                    var notification = ReadNotification(reader);
                    notification.specs = ReadSpecifications(reader);
                    notifications.Add(notification);
                }
            }
            return notifications;
        }
        internal string get_all_notifications=@"select notification_id, user_id, notification_type, device_model.model, 
        device_type.type, device_brand.brand, specification.*,status.status_name, 
        notification_date, message
        from notification
        inner join status using(status_id)
        inner join user using(user_id)
        inner join device using(device_id)
        inner join device_brand using(device_brand_id)
        inner join device_model using(device_model_id)
        inner join device_type using(device_type_id)
        inner join specification using(specification_id)";

        internal string searchQuery=@" where device_type.type like CONCAT('%', @search_field, '%') or device_model.model like CONCAT('%', @search_field, '%') or device_brand.brand like CONCAT('%', @search_field, '%') group by notification_id";       

    }   
}