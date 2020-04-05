using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace UserManagement.Models
{
    public class AddressModel
    {
        public string AddressType { get; set; }
        public string AddressLine1 { get; set; }/////////

         public string AddressLine2 { get; set; }///////////
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PIN { get; set; }
        internal AppDb Db { get; set; }

        public AddressModel()
        {
        }

        internal AddressModel(AppDb db)
        {
            Db = db;
        }

        public void BindAndExecuteProcedure(MySqlCommand cmd, string ProcedureName)
        {
            cmd.CommandText = ProcedureName;
            cmd.CommandType = CommandType.StoredProcedure;
            BindParams(cmd);
            cmd.ExecuteNonQuery();
            cmd.Parameters.Clear();
        }

        public void BindParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter("addres_type", AddressType));
            cmd.Parameters.Add(new MySqlParameter("address1" , AddressLine1));///////////////
             cmd.Parameters.Add(new MySqlParameter("address2" , AddressLine2));//////////////////////
            cmd.Parameters.Add(new MySqlParameter("city_n", City));
            cmd.Parameters.Add(new MySqlParameter("state_n" , State));
            cmd.Parameters.Add(new MySqlParameter("country_n" , Country));
            cmd.Parameters.Add(new MySqlParameter("pin" , PIN));
        }
    }
}
