using System;
using System.Data;
using System.Data.Common;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace DeviceManagement.Controllers
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
            List<Device> deviceDevice = new List<Device>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "deviceReturnDates";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@email", email);
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    deviceDevice.Add(new Device(){
                    deviceType = reader.GetString(0),
                    deviceModel = reader.GetString(1),
                    returnDate = reader.GetDateTime(2)
                 
                });
                }
            }
            Db.Connection.Close();
            if (deviceDevice.Count > 0)
            {
                return Ok(deviceDevice);
            }
            else
                return NoContent();
        }

        [HttpGet]
        [Route("device/count")]
        public IActionResult getDeviceCount()
        {
            List<Device> count = new List<Device>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "allDevice";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    count.Add(new Device()
                    {
                        count = reader.GetInt32(0)
                    });
                }
            }
            Db.Connection.Close();
            if (count.Count > 0)
            {
                return Ok(count);
            }
            else
                return NoContent();

        }

        [HttpGet]
        [Route("requests/accepted")]
        public IActionResult getAcceptedRequestStatistics()
        {
            List<Device> deviceDevice = new List<Device>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "latestAcceptedRequests";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    deviceDevice.Add(new Device()
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
            if (deviceDevice.Count > 0)
            {
                return Ok(deviceDevice);
            }
            else
                return NoContent();

        }

        [HttpGet]
        [Route("requests/pending")]
        public IActionResult getPendingRequestStatistics()
        {
            List<Device> deviceDevice = new List<Device>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "latestPendingRequests";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    deviceDevice.Add(new Device()
                    {
                        deviceId = reader.GetInt32(0),
                        deviceType=reader.GetString(1),
                        deviceModel=reader.GetString(2),
                        userId=reader.GetInt32(3)

                    });
                }
            }
            Db.Connection.Close();
            if (deviceDevice.Count > 0)
            {
                return Ok(deviceDevice);
            }
            else
                return NoContent();

        }

        [HttpGet]
        [Route("requests/rejected")]
        public IActionResult getRejectedRequestStatistics()
        {
            List<Device> count = new List<Device>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "rejectedRequests";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    count.Add(new Device()
                    {
                        count=reader.GetInt32(0)

                    });
                }
            }
            Db.Connection.Close();
            if (count.Count > 0)
            {
                return Ok(count);
            }
            else
                return NoContent();

        }

        [HttpGet]
        [Route("device/faults")]
        public IActionResult getFaultStatistics()
        {
            List<Device> deviceDevice = new List<Device>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "faults";
            cmd.CommandType = CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    deviceDevice.Add(new Device()
                    {
                        deviceType=reader.GetString(0),
                        deviceModel=reader.GetString(1),
                        faultDescription=reader.GetString(2)

                    });
                }
            }
            Db.Connection.Close();
            if (deviceDevice.Count > 0)
            {
                return Ok(deviceDevice);
            }
            else
                return NoContent();

        
        }

    public AppDb Db { get; }
    }  

    public class Device
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
