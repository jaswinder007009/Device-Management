using System.Collections.Generic;
using System;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using UserManagement.Models;

namespace UserManagement
{
    public class User : BaseEntity
    {
        public string? Salutation { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? DepartmentName { get; set; }
        public string? DesignationName { get; set; }
        public string? Email { get; set; }
        //public string? RoleName { get; set; }
        public int? UserId { get; set; }
        public string? Password { get; set; }
        public string? DOB { get; set; }
        public string? Gender { get; set; }
        public string? DOJ { get; set; }
        //public  string? User_Active { get; set; }
        public List<ContactNumberModel> phones { get; set; }
        public List<AddressModel> addresses { get; set; }

        internal AppDb Db { get; set; }

        public User()
        {
            phones = new List<ContactNumberModel>();
            addresses = new List<AddressModel>();
        }

        internal User(AppDb db)
        {
            Db = db;
        }






        public static string GetSafeString(MySqlDataReader reader, string colName)
        {
            return reader[colName] != DBNull.Value ? (string)reader[colName] : "";
        }

        private AddressModel ReadAddress(MySqlDataReader reader, string prefix)
        {
            var address1 = new AddressModel();
            address1.AddressLine1 = GetSafeString(reader, prefix + "_address_Line1");
            address1.AddressLine2 = GetSafeString(reader, prefix + "_address_Line2");
            address1.AddressType = prefix;
            address1.City = GetSafeString(reader, prefix + "_city");
            address1.State = GetSafeString(reader, prefix + "_state");
            address1.Country = GetSafeString(reader, prefix + "_country");
            address1.PIN = GetSafeString(reader, prefix + "_pin");


            return address1;//kkkkkkkkkkkkkkkkkkkkkkkkk
        }
        private ContactNumberModel ReadContact(MySqlDataReader reader, string prefix)
        {
            var contact1 = new ContactNumberModel();
            contact1.ContactNumberType = prefix;
            contact1.CountryCode = GetSafeString(reader, prefix + "_country_code");
            contact1.AreaCode = GetSafeString(reader, prefix + "_area_code");
            contact1.Number = GetSafeString(reader, prefix + "_number");

            return contact1;
        }

        public User getUserByuser_id(string user_id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "get_users_by_id";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@user_id", user_id);
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
                    post.Salutation = GetSafeString(reader, "salutation");
                    post.FirstName = GetSafeString(reader, "first_name");
                    post.MiddleName = GetSafeString(reader, "middle_name");
                    post.LastName = GetSafeString(reader, "last_name");
                    post.Password = GetSafeString(reader,"password");
                    //post.UserId = GetSafeString(reader, "user_id");
                    //post.UserId = (int)reader["user_id"];
                    //post.Role_Name = GetSafeString(reader, "role_name");
                    post.DepartmentName = GetSafeString(reader, "department_name");
                    post.DesignationName = GetSafeString(reader, "designation_name");
                    post.Email = GetSafeString(reader, "email");
                    post.Gender = GetSafeString(reader, "gender");
                    post.DOB = Convert.ToDateTime(reader["date_of_birth"]).ToString("dd/MM/yyyy");
                    post.DOJ = Convert.ToDateTime(reader["date_of_joining"]).ToString("dd/MM/yyyy");
                    post.addresses.Add(ReadAddress(reader, "current"));
                    post.addresses.Add(ReadAddress(reader, "permanant"));
                    post.phones.Add(ReadContact(reader, "mobile"));
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


        public string UpdateUser()
        {
            MySqlParameter outputEmailParam;

            MySqlCommand cmd = Db.Connection.CreateCommand();
            MySqlTransaction myTrans;

            myTrans = Db.Connection.BeginTransaction();
            cmd.Connection = Db.Connection;
            cmd.Transaction = myTrans;

            try
            {
                cmd.CommandText = "update_user";
                cmd.CommandType = CommandType.StoredProcedure;
                outputEmailParam = BindOutputuser_id(cmd);
                Binduser_id(cmd);
                BindUserProcParams(cmd);
                cmd.ExecuteNonQuery();

                foreach (ContactNumberModel phone in phones)
                {
                    Binduser_id(cmd);
                    phone.BindAndExecuteProcedure(cmd, "update_contact");
                }

                foreach (AddressModel address in addresses)
                {
                    Binduser_id(cmd);
                    address.BindAndExecuteProcedure(cmd, "update_address");
                }

                Console.WriteLine("Record Updated");
                myTrans.Commit();
                return "Record Updated";
            }
            catch (Exception e)
            {
                try
                {
                    myTrans.Rollback();
                }
                catch (MySqlException ex)
                {
                    if (myTrans.Connection != null)
                    {
                        Console.WriteLine("An exception of type " + ex.GetType() + " was encountered while attempting to roll back the transaction.");
                    }
                }

                Console.WriteLine("An exception of type " + e.Message + " was encountered while inserting the data.");
                Console.WriteLine("Neither record was written to database.");
            }
            


            return "Update failed";


        }



        private void BindUserProcParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter("salut", Salutation));
            cmd.Parameters.Add(new MySqlParameter("f_name", FirstName));
            cmd.Parameters.Add(new MySqlParameter("m_name", MiddleName));
            cmd.Parameters.Add(new MySqlParameter("l_name", LastName));
            cmd.Parameters.Add(new MySqlParameter("dept_name", DepartmentName));
            cmd.Parameters.Add(new MySqlParameter("desig", DesignationName));
            //cmd.Parameters.Add(new MySqlParameter("role_name", RoleName));
            //cmd.Parameters.Add(new MySqlParameter("userr_id", UserId));
            cmd.Parameters.Add(new MySqlParameter("email", Email));
            /*cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@password",
                DbType = DbType.String,
                Value = Password,
            });*/
            if(string.IsNullOrEmpty(Password))
            cmd.Parameters.AddWithValue("password", DBNull.Value);
            else
                cmd.Parameters.Add(new MySqlParameter("password", Password));
            cmd.Parameters.Add(new MySqlParameter("dob", DateTime.Parse(DOB).ToString("yyyy-MM-dd")));
            cmd.Parameters.Add(new MySqlParameter("gend", Gender));
            cmd.Parameters.Add(new MySqlParameter("doj", DateTime.Parse(DOJ).ToString("yyyy-MM-dd")));
            cmd.Parameters.Add(new MySqlParameter("is_ac", "Active"));

        }
        private void Binduser_id(MySqlCommand cmd)
        {
            var user_idParam = new MySqlParameter("userr_id", UserId);
            if (cmd.Parameters.Contains("userr_id"))
            {
                cmd.Parameters["userr_id"].Value = UserId;
            }
            else
            {
                cmd.Parameters.Add(user_idParam);
            }
        }
        private MySqlParameter BindOutputuser_id(MySqlCommand cmd)
        {
            MySqlParameter outputEmailParam = new MySqlParameter("@user_id_out", SqlDbType.VarChar) { Direction = ParameterDirection.Output };
            cmd.Parameters.Add(outputEmailParam);
            return outputEmailParam;
        }

    }
}
