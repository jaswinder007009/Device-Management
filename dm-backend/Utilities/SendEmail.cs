using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Drawing;
using System.Data.SqlClient;
using Microsoft.IdentityModel.Protocols;
using dm_backend.Models;
using dm_backend.Data;

namespace dm_backend.Utilities
{
    public class SendEmail
    {
        public async Task<bool> Send_Email(string email)
        {
            email = email.ToLower();
                var fromEmail = new MailAddress("sagarjangra530@gmail.com", "Verification");
                var toEmail = new MailAddress(email);
            var fromEmailPassword = "Redmi5@530";

                string ui = Guid.NewGuid().ToString();
                 var link = "/User/VerifyAccount/" + ui;

                 string subject = "Reset Password ";
                string body = "Hi, <br><br> We got request for reset account password . Please Click on the link given below. <br><br> <a href=" + link + "> Reset Password link </a> ";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
                };
                using (var message = new MailMessage(fromEmail, toEmail)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true,

                })
                    smtp.Send(message);


            return true;
        }
    }
}


          