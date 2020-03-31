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
                    returnDate = reader.GetDateTime(2)
                 
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
        [Route("device/count")]
        public IActionResult getDeviceCount()
        {
            List<Overview> deviceCount = new List<Overview>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "all_devices";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    deviceCount.Add(new Overview()
                    {
                        count = reader.GetInt32(0)
                    });
                }
            }
            Db.Connection.Close();
            if (deviceCount.Count > 0)
            {
                return Ok(deviceCount);
            }
            else
                return NoContent();

        }

        [HttpGet]
        [Route("requests/accepted")]
        public IActionResult getAcceptedRequestStatistics()
        {
            List<Overview> acceptedRequestsOverview = new List<Overview>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "latest_accepted_requests";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    acceptedRequestsOverview.Add(new Overview()
                    {
                        deviceId = reader.GetInt32(0),
                        deviceType=reader.GetString(1),
                        deviceModel=reader.GetString(2),
                        userId=reader.GetInt32(3),
                        assignDate=reader.GetDateTime(4)

                    });
                }
            }
            Db.Connection.Close();
            if (acceptedRequestsOverview.Count > 0)
            {
                return Ok(acceptedRequestsOverview);
            }
            else
                return NoContent();

        }

        [HttpGet]
        [Route("requests/pending")]
        public IActionResult getPendingRequestStatistics()
        {
            List<Overview> pendingRequestsOverview = new List<Overview>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "latest_pending_requests";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    pendingRequestsOverview.Add(new Overview()
                    {
                        deviceId = reader.GetInt32(0),
                        deviceType=reader.GetString(1),
                        deviceModel=reader.GetString(2),
                        userId=reader.GetInt32(3)

                    });
                }
            }
            Db.Connection.Close();
            if (pendingRequestsOverview.Count > 0)
            {
                return Ok(pendingRequestsOverview);
            }
            else
                return NoContent();

        }

        [HttpGet]
        [Route("requests/rejected")]
        public IActionResult getRejectedRequestStatistics()
        {
            List<Overview> rejectedRequestsCount = new List<Overview>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "rejected_requests";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    rejectedRequestsCount.Add(new Overview()
                    {
                        count=reader.GetInt32(0)

                    });
                }
            }
            Db.Connection.Close();
            if (rejectedRequestsCount.Count > 0)
            {
                return Ok(rejectedRequestsCount);
            }
            else
                return NoContent();

        }

        [HttpGet]
        [Route("device/faults")]
        public IActionResult getFaultStatistics()
        {
            List<Overview> faultOverview = new List<Overview>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "get_Faults";
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

    public class Overview
    {
        public int deviceId { get; set; }
        public int userId { get; set; }
        public string deviceType { get; set; }
        public string deviceModel { get; set; }
        public DateTime assignDate { get; set; }
        public DateTime returnDate { get; set; }
        public string faultDescription { get; set; }
        public int count { get; set; }
    }

}
