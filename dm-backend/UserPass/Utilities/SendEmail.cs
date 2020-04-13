using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Drawing;
using System.Data.SqlClient;
using Microsoft.IdentityModel.Protocols;
using DeviceManagementPro.Models;
using DeviceManagementPro.Data;
using Microsoft.EntityFrameworkCore;

namespace DeviceManagementPro.Utilities
{
    public class SendEmail
    {
        private readonly SagardbContext _context;

        public SendEmail(SagardbContext context)
        {
            _context = context;
        }

        

        public async Task<bool> Send_Email(string email)
        {
            email = email.ToLower();
                var fromEmail = new MailAddress("sjangra@ex2india.com", "Password Reset");
                var toEmail = new MailAddress(email);
            var fromEmailPassword = "jeffhardy@619";

                string uniquecode = Guid.NewGuid().ToString();

            var obj = _context.User.First(a => a.Email == email);
          //  obj.Guid = uniquecode;
            _context.SaveChanges();



            var link = "file:///C:/Users/MESSI/Desktop/BE/FrontEnd/ResetPassword.html";
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


          