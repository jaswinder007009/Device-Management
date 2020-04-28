
﻿using dm_backend.Models;
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
         //MultipleNotifications item
        public async Task<string>  sendNotification(sendMail datalist)
        {
            
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("ssrawat@ex2india.com" , "Admin");
                mail.To.Add(datalist.email);
                mail.IsBodyHtml = true;

                mail.Subject = "Device Notification";
                mail.Body = "" + datalist.name + "<br> <br> This mail is to inform you that  some of our worker need device that you have i.e( <b>  "+ datalist.deviceType + " " + datalist.deviceName +
                    "</b>) if you have done  with your work  kindly return to admin so Other may utilize it <br><br>  Thank You";

                SmtpServer.Port = 587;
            string ans = Dec("SmVmZmhhcmR5QDYxOQ==");
            SmtpServer.Credentials = new System.Net.NetworkCredential("ssrawat@ex2india.com ", "so@obvious");
                SmtpServer.EnableSsl = true;
              await   SmtpServer.SendMailAsync(mail);
            return null;
            
            
        }
    }




}
