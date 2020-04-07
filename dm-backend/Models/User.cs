using System.Collections.Generic;
using System;
using System.Data;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using dm_backend.Models;

namespace dm_backend
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
        public string? RoleName { get; set; }
        public int? UserId { get; set; }
        public string? Password { get; set; }
        public string? DOB { get; set; }
        public string? Gender { get; set; }

         public string? Status { get; set; }
        public string? DOJ { get; set; }
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
        public string AddOneUser()
        {
            MySqlParameter outputEmailParam;

            MySqlCommand cmd = Db.Connection.CreateCommand();
            MySqlTransaction myTrans;
            myTrans = Db.Connection.BeginTransaction();

            cmd.Connection = Db.Connection;
            cmd.Transaction = myTrans;

            try
            {
                cmd.CommandText = "insert_user";
                cmd.CommandType = CommandType.StoredProcedure;
                outputEmailParam = BindOutputuser_id(cmd);

                BindUserProcParams(cmd);
                cmd.ExecuteNonQuery();
                UserId = (int)outputEmailParam.Value;
                Console.WriteLine(UserId);
                foreach (ContactNumberModel phone in phones)
                {
                    Binduser_id(cmd);
                    phone.BindAndExecuteProcedure(cmd, "insert_contact");
                }

                foreach (AddressModel address in addresses)
                {
                    Binduser_id(cmd);
                    address.BindAndExecuteProcedure(cmd, "insert_address");
                }

                Console.WriteLine("Both records are written to database.");
                myTrans.Commit();
                return "User inserted";
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
            finally
            {
                Db.Connection.Close();
            }

            return "0";
        }

        public int Delete()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "delete_user";
            cmd.CommandType = CommandType.StoredProcedure;
            Binduser_id(cmd);
            cmd.ExecuteNonQuery();
            return 1;
        }

        public List<User> SearchAllUsers(string names = "")
        {
            using (var cmd = Db.Connection.CreateCommand())
            {
                //Console.WriteLine("------------------" + names);
                if (names != "" || names != null || names != String.Empty)
                {
                    cmd.CommandText = "call get_users_by_name(@namee)";
                    cmd.Parameters.AddWithValue("@namee", names);
                }
                else
                    cmd.CommandText = "call get_all_active_user()";
                using (MySqlDataReader reader = cmd.ExecuteReader())
                    return ReadAll(reader);
            }
        }
        public List<User> SortUserbyName(string sortby, int direction, string searchby = "")
        {
            Console.WriteLine(sortby);
            using (var cmd = Db.Connection.CreateCommand())
            {
                
                cmd.CommandText = GetAllUsersquery;
                if(!string.IsNullOrEmpty(searchby))
                {
                    cmd.CommandText += @" and get_full_name(user.user_id) like CONCAT('%', '" + @searchby + "', '%') or user.email like CONCAT('%', '" + @searchby + "', '%') or status_name like CONCAT('%', '" + @searchby + "', '%')";
                    cmd.Parameters.AddWithValue("@searchby", searchby);
                }
                    cmd.CommandText += " order by "+sortby+(direction==-1 ? " desc" :" asc");
                    //cmd.Parameters.AddWithValue("@sortby", sortby);
                Console.WriteLine(cmd.CommandText);

                using MySqlDataReader reader = cmd.ExecuteReader();
                return ReadAll(reader);

            }
        }
public int whatIs(String data1)
{
 return data1=="inactive"?1:2;

}
         public void MarkUserInactive(int data)
          {
              using var cmd = Db.Connection.CreateCommand();
              cmd.CommandText = @"UPDATE `user` SET `status`="+ data +" WHERE `user_id` = @userr_id;";
              Binduser_id(cmd);
              cmd.ExecuteNonQuery();
          }

        public static string GetSafeString(MySqlDataReader reader, string colName)
        {
            return reader[colName] != DBNull.Value ? (string)reader[colName] : "";
        }

        private AddressModel ReadAddress(MySqlDataReader reader,string prefix)
        {
            var address1 = new AddressModel();
            address1.AddressLine1 = GetSafeString(reader, prefix + "_address_Line1");
             address1.AddressLine2 = GetSafeString(reader, prefix + "_address_Line2");
            address1.AddressType = prefix;
            address1.City = GetSafeString(reader, prefix +"_city");
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
                    post.Salutation = GetSafeString(reader,"salutation");
                    post.FirstName = GetSafeString(reader, "first_name");
                    post.MiddleName = GetSafeString(reader, "middle_name");
                    post.LastName = GetSafeString(reader, "last_name");
                    // post.User_Id = GetSafeString(reader, "user_id");
                    post.UserId = (int)reader["user_id"];
                    post.RoleName = GetSafeString(reader, "role_name");
                    post.DepartmentName = GetSafeString(reader, "department_name");
                    post.DesignationName = GetSafeString(reader, "designation_name");
                    post.Email = GetSafeString(reader, "email");
                    post.Gender = GetSafeString(reader, "gender");
                    post.Password=GetSafeString(reader,"password");
                    post.Status = GetSafeString(reader, "status_name");
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

       
        public string UpdateUser()
        {
            MySqlParameter outputEmailParam;

            MySqlCommand cmd = Db.Connection.CreateCommand();
            MySqlTransaction myTrans;

            myTrans = Db.Connection.BeginTransaction();
            cmd.Connection = Db.Connection;
            cmd.Transaction = myTrans;

            try {
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
            if(cmd.Parameters.Contains("userr_id")){
                cmd.Parameters["userr_id"].Value = UserId;
            }
            else
            {
                cmd.Parameters.Add(user_idParam);
            }
        }
        private MySqlParameter BindOutputuser_id(MySqlCommand cmd)
        {
            MySqlParameter outputEmailParam = new MySqlParameter("@user_id_out", MySqlDbType.Int32) { Direction = ParameterDirection.Output };
            cmd.Parameters.Add(outputEmailParam);
            return outputEmailParam;
        }

        internal string GetAllUsersquery = @"select user_id,salutation,first_name,middle_name,last_name,password,role_name,department_name,designation_name,email,gender,date_of_birth,date_of_joining,status.status_name,
          group_concat(distinct if(address_type='Current',address_Line1,NULL)) as 'current_address_Line1',
          group_concat(distinct if(address_type='Current',address_Line2,NULL)) as 'current_address_Line2',
          group_concat(distinct if(address_type='Current',city_name,NULL)) as 'current_city',
          group_concat(distinct if(address_type='Current',state_name,NULL)) as 'current_state',
          group_concat(distinct if(address_type='Current',c.country_name,NULL)) as 'current_country',
          group_concat(distinct if(address_type='Current',pin,NULL)) as 'current_pin',
          group_concat(distinct if(address_type='Permanant',address_Line1,NULL)) AS 'permanant_address_Line1',
          group_concat(distinct if(address_type='Permanant',address_Line2,NULL)) AS 'permanant_address_Line2',
          group_concat(distinct if(address_type='Permanant',city_name,NULL)) as 'permanant_city',
          group_concat(distinct if(address_type='Permanant',state_name,NULL)) as 'permanant_state',
          group_concat(distinct if(address_type='Permanant',c.country_name,NULL)) as 'permanant_country',
          group_concat(distinct if(address_type='Permanant',pin,NULL)) as 'permanant_pin',
          group_concat(distinct if(contact_type='Mobile',ca.country_code,NULL)) as 'mobile_country_code',
          group_concat(distinct if(contact_type='Mobile',area_code,NULL)) as 'mobile_area_code',
          group_concat(distinct if(contact_type='Mobile',number,NULL)) as 'mobile_number',
          group_concat(distinct if(contact_type='Work',ca.country_code,NULL)) as 'work_country_code',
          group_concat(distinct if(contact_type='Work',area_code,NULL)) as 'work_area_code',
          group_concat(distinct if(contact_type='Work',number,NULL)) as 'work_number',
          group_concat(distinct if(contact_type='home',ca.country_code,NULL)) as 'home_country_code',
          group_concat(distinct if(contact_type='Home',area_code,NULL)) as 'home_area_code',
          group_concat(distinct if(contact_type='Home',number,NULL)) as 'home_number'
          from user
          inner join salutation using(salutation_id)
          inner join department_designation using(department_designation_id)
          inner join department using(department_id)
          inner join designation using(designation_id)
          inner join gender using(gender_id)
          inner join status on status.status_id=user.status
          inner join user_to_role using(user_id)
          inner join role using(role_id)
          left join address using(user_id)
          inner join address_type using(address_type_id)
          inner join city using(city_id)
          inner join state using(state_id)
          inner join country c on c.country_id=state.country_id
          left join contact_number using(user_id)
          inner join contact_type using(contact_type_id)
          inner join country ca on ca.country_id=contact_number.country_id
          group by user_id, role_id
          ";
    }
}
