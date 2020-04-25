using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace dm_backend.Logics
{
    public class sendMail
    {
        internal AppDb Db;
        public sendMail(AppDb db)
        {
            db = db;
        }


        public  void button1_Click(object sender, EventArgs e)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("your_email_address@gmail.com");
                mail.To.Add("to_address");
                mail.Subject = "Test Mail";
                mail.Body = "This is for testing SMTP mail from GMAIL";

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("username", "password");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
              //  MessageBox.Show("mail Send");
            }
            catch (Exception ex)
            {
              //  MessageBox.Show(ex.ToString());
            }
        }
    }




}