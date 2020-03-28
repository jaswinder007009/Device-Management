using System.Collections.Generic;
using System;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using UserManagement.Models;

namespace DeviceManagement
{
    public class User
    {
        public string Salutation { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
        public string Email { get; set; }

        internal AppDb Db { get; set; }

        public User()
        {
            
        }

        internal User(AppDb db)
        {
            Db = db;
        }
        

        public static string GetSafeString(MySqlDataReader reader, string colName)
        {
            return reader[colName] != DBNull.Value  (string)reader[colName] : "";
        }

        
        
        public User getUserByUsername(string username)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "get_user";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@username", username);
            return ReadUser(cmd.ExecuteReader());
        }
        private List<User> ReadAll(MySqlDataReader reader)
        {
            var posts = new List<User>();
            using (reader)
            {
                while (reader.Read())
                {
                    var post = new User();
                    post.Salutation = GetSafeString(reader,"salutation");
                    post.FirstName = GetSafeString(reader, "first_name");
                    post.MiddleName = GetSafeString(reader, "middle_name");
                    post.LastName = GetSafeString(reader, "last_name");
                    post.UserName = GetSafeString(reader, "username");
                    post.DepartmentName = GetSafeString(reader, "department_name");
                    post.DesignationName = GetSafeString(reader, "designation_name");
                    post.Email = GetSafeString(reader, "email");
                    post.Gender = GetSafeString(reader, "gender");
                    post.DOB = Convert.ToDateTime(reader["date_of_birth"]).ToString("dd/MM/yyyy");
                    post.DOJ = Convert.ToDateTime(reader["date_of_joining"]).ToString("dd/MM/yyyy");
                    post.addresses.Add(ReadAddress(reader, "current"));
                    post.addresses.Add(ReadAddress(reader, "permanant"));
                    post.phones.Add(ReadContact(reader,"mobile"));
                    post.phones.Add(ReadContact(reader, "work"));
                    post.phones.Add(ReadContact(reader, "home"));
                    
                    posts.Add(post);
                }
            }
            return posts;
        }


        private User ReadUser(MySqlDataReader reader)
        {
            
            using (reader)
            {
                var user_s = ReadAll(reader);            
                return user_s[0];
            }
        }

       
        private void BindUserProcParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter("salut", Salutation));
            cmd.Parameters.Add(new MySqlParameter("f_name", FirstName));
            cmd.Parameters.Add(new MySqlParameter("m_name", MiddleName));
            cmd.Parameters.Add(new MySqlParameter("l_name", LastName));
            cmd.Parameters.Add(new MySqlParameter("dept_name", DepartmentName));
            cmd.Parameters.Add(new MySqlParameter("desig", DesignationName));
            cmd.Parameters.Add(new MySqlParameter("email", (AltEmail == null || AltEmail == "")  Email + "," + AltEmail : Email ));
            cmd.Parameters.Add(new MySqlParameter("pass", Password));
            cmd.Parameters.Add(new MySqlParameter("dob", DateTime.Parse(DOB).ToString("yyyy-MM-dd")));
            cmd.Parameters.Add(new MySqlParameter("gend", Gender));
            cmd.Parameters.Add(new MySqlParameter("doj", DateTime.Parse(DOJ).ToString("yyyy-MM-dd")));
            cmd.Parameters.Add(new MySqlParameter("is_ac", 1));

        }
        private void BindUsername(MySqlCommand cmd)
        {
            var usernameParam = new MySqlParameter("username", UserName);
            if(cmd.Parameters.Contains("username")){
                cmd.Parameters["username"].Value = UserName;
            }
            else
            {
                cmd.Parameters.Add(usernameParam);
            }
        }
        private MySqlParameter BindOutputUsername(MySqlCommand cmd)
        {
            MySqlParameter outputEmailParam = new MySqlParameter("@username_out", SqlDbType.VarChar) { Direction = ParameterDirection.Output };
            cmd.Parameters.Add(outputEmailParam);
            return outputEmailParam;
        }

    }
}
