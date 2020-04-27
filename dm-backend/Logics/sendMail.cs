using dm_backend.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace dm_backend.Logics
{
    public class sendMail
    {
        public string name;
        public string email;
        public string deviceType;
        public string deviceName;
        internal AppDb Db;
        public string querry = @"select st.salutation ,  u.first_name , u.middle_name  , u.last_name ,  u.email , dt.type  ,db.brand , dm.model from 
                            device as d inner join device_brand as db using(device_brand_id)
                            inner join device_type as dt using(device_type_id)  inner join device_model as dm  
                            using(device_model_id)inner join assign_device using(device_id) inner join user as
                            u using(user_id) inner join salutation  as st using (salutation_id) where d.device_id=";
        public sendMail(AppDb db)
        {
            Db = db;
        }
        public sendMail()
        {

        }



        public async Task<string> sendMultipleMail(MultipleNotifications item)
        {
            
         foreach (NotificationModel device in item.notify)
            {

                var user = await getUserDetails(device.deviceId);
                await sendNotification(user);
            }
            return "";
        }

        private string Dec(string v)
        {
            byte[] b;
            string decrypted;
            try
            {
                b = Convert.FromBase64String(v);
                decrypted = System.Text.ASCIIEncoding.ASCII.GetString(b);
            }
            catch (FormatException fe)
            {
                decrypted = "";
            }
            return decrypted;
        }



        public async Task<sendMail> getUserDetails(int deviceId)
        {
           var tempQuerry = querry +""+ deviceId + ";";

            using var cmd = Db.Connection.CreateCommand();

            cmd.CommandText = tempQuerry;
            cmd.CommandType = CommandType.Text;
            return await bindResult(await cmd.ExecuteReaderAsync());
        }



        public async Task<sendMail> bindResult(DbDataReader reader)
        {
            var x = new sendMail();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                  

                    x.name = (reader.GetString("salutation") + " " + reader.GetString("first_name") + " " + (reader.IsDBNull("middle_name") ? "" : (reader.GetString("middle_name") + " ")) + reader.GetString("last_name"));
                        x.email = reader.GetString("email");
                    x.deviceType = reader.GetString("type");
                    x.deviceName = reader.GetString("brand") + " " + reader.GetString("model");
                   
                }
                return x;
            }
            return null;
        }



        //MultipleNotifications item
        public async Task<string>  sendNotification(sendMail datalist)
        {
            
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("ssrawat@ex2india.com" , "Admin");
                mail.To.Add(datalist.email);
                
                mail.Subject = "Device Notification";
                mail.Body = "" + datalist.name + "<br> <br> This mail is to inform you that  some of our worker need device  "+ datalist.deviceType + " " + datalist.deviceName +
                    "if you done with your kindly return to admin so Other may utilize it <br><br>  Thank You";

                SmtpServer.Port = 587;
            string ans = Dec("SmVmZmhhcmR5QDYxOQ==");
            SmtpServer.Credentials = new System.Net.NetworkCredential("ssrawat@ex2india.com ", "so@obvious");
                SmtpServer.EnableSsl = true;
              await   SmtpServer.SendMailAsync(mail);
            return null;
            
            
        }
    }




}
