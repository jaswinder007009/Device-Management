using System;
using System.Data;
using System.Data.Common;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace dm_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {

        public DashboardController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        [Route("statistics")]
        public IActionResult getStatistics()
        {   
            int totalDevices,freeDevices,faults,assignedDevices,deviceRequests,rejectedRequests;
           Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            
            cmd.CommandText = "select count(*) from device;";
            totalDevices = Convert.ToInt32(cmd.ExecuteScalar());
            cmd.CommandText ="select count(*) from device inner join status using (status_id) where status_name='Free';";
            freeDevices = Convert.ToInt32(cmd.ExecuteScalar());
            cmd.CommandText = "select count(*) from complaints;";
            faults = Convert.ToInt32(cmd.ExecuteScalar());
            cmd.CommandText ="select count(*) from assign_device;";
            assignedDevices = Convert.ToInt32(cmd.ExecuteScalar());
            cmd.CommandText = "select count(*) from request_device;";
            deviceRequests = Convert.ToInt32(cmd.ExecuteScalar());
            cmd.CommandText ="select count(*) from request_history inner join status using (status_id) where status_name='Rejected';";
            rejectedRequests= Convert.ToInt32(cmd.ExecuteScalar());
            Statistics statisticsObject = new Statistics();
           
           
            statisticsObject.totalDevices=totalDevices;
            statisticsObject.freeDevices=freeDevices;
            statisticsObject.faults=faults;
            statisticsObject.assignedDevices=assignedDevices;
            statisticsObject.deviceRequests=deviceRequests;
            statisticsObject.rejectedRequests=rejectedRequests;

            Db.Connection.Close();
            return Ok(statisticsObject);
            
        }

        [HttpGet]
        [Route("{email}/devices/returndates")]
        public IActionResult getDeviceReturnDates(string email)
        {
            List<Overview> returnDateOverview = new List<Overview>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "device_return_dates";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@email", email);
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    returnDateOverview.Add(new Overview(){
                    deviceType = reader.GetString(0),
                    deviceModel = reader.GetString(1),
                    returnDate = Convert.ToDateTime(reader.GetDateTime(2)).ToString("dd/mm/yyyy")
                 
                });
                }
            }
            Db.Connection.Close();
            if (returnDateOverview.Count > 0)
            {
                return Ok(returnDateOverview);
            }
            else
                return NoContent();
        }

        [HttpGet]
        [Route("faults")]
        public IActionResult getFaultOverview()
        {
            List<Overview> faultOverview = new List<Overview>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "get_faults";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    faultOverview.Add(new Overview()
                    {
                        deviceType=reader.GetString(0),
                        deviceModel=reader.GetString(1),
                        faultDescription=reader.GetString(2)

                    });
                }
            }
            Db.Connection.Close();
            if (faultOverview.Count > 0)
            {
                return Ok(faultOverview);
            }
            else
                return NoContent();

        
        }

        public AppDb Db { get; }
    }  

    public class Statistics
    {
        public int totalDevices { get; set; }
        public int freeDevices { get; set; }
        public int faults { get; set; }
        public int assignedDevices { get; set; }
        public int deviceRequests { get; set; }
        public int rejectedRequests { get; set; }

    }
    public class Overview
    {
        // public int deviceId { get; set; }
        // public int userId { get; set; }
        public string deviceType { get; set; }
        public string deviceModel { get; set; }
        // public string assignDate { get; set; }
        public string returnDate { get; set; }
        public string faultDescription { get; set; }
        // public int count { get; set; }
    }
        

}
