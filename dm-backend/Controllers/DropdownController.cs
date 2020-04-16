using System;
using System.Data;
using System.Data.Common;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using dm_backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace dm_backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DropdownController : ControllerBase
    {
        public DropdownController(AppDb db)
        {
            Db = db;
        }
        [HttpGet]
        [Route("country")]
        public IActionResult Countries()
        {

            List<DropdownModel> countries = new List<DropdownModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select country_id, country_name from country";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    countries.Add(new DropdownModel()
                    {
                        id = reader.GetInt32(0),
                        name = reader.GetString(1)
                    });
                }
            }
            Db.Connection.Close();
            if (countries.Count > 0)
            {
                return Ok(countries);
            }
            else
                return NoContent();
        }

        [HttpGet]
        [Route("state")]
        public IActionResult states()
        {

            List<DropdownModel> states = new List<DropdownModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select state_id, state_name from state limit 50";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    states.Add(new DropdownModel()
                    {
                        id = reader.GetInt32(0),
                        name = reader.GetString(1)
                    });
                }
            }
            Db.Connection.Close();
            if (states.Count > 0)
            {
                return Ok(states);
            }
            else
                return NoContent();
        }

        [HttpGet]
        [Route("city")]
        public IActionResult Cities()
        {
            //String fields = HttpContext.Request.Query["id"];
            List<DropdownModel> cities = new List<DropdownModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select city_id, city_name from city limit 6000 ";
           // cmd.Parameters.AddWithValue("@c_id", fields);
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    cities.Add(new DropdownModel()
                    {
                        id = reader.GetInt32(0),
                        name = reader.GetString(1)
                    });
                }
            }
            Db.Connection.Close();
            if (cities.Count > 0)
            {
                return Ok(cities);
            }
            else
                return NoContent();
        }

        [Route("salutation")]
        public IActionResult Salutations()
        {

            List<DropdownModel> salutations = new List<DropdownModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select * from salutation;";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    salutations.Add(new DropdownModel()
                    {
                        id = reader.GetInt32(0),
                        name = reader.GetString(1)
                    });
                }
            }
            Db.Connection.Close();
            if (salutations.Count > 0)
            {
                return Ok(salutations);
            }
            else
                return NoContent();
        }
        [HttpGet]
        [Route("country_code")]
        public IActionResult CountryCodes()
        {

            List<DropdownModel> countries = new List<DropdownModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select country_code, country_name from country";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    countries.Add(new DropdownModel()
                    {
                        id = Convert.ToInt32(reader.GetString(0)),
                        name = reader.GetString(1),

                    });
                }
            }
            Db.Connection.Close();
            if (countries.Count > 0)
            {
                return Ok(countries);
            }
            else
                return NoContent();
        }

        [Route("addressType")]
        public IActionResult addressTypes()
        {

            List<DropdownModel> addTypes = new List<DropdownModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select * from address_type;";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    addTypes.Add(new DropdownModel()
                    {
                        id = reader.GetInt32(0),
                        name = reader.GetString(1)
                    });
                }
            }
            Db.Connection.Close();
            if (addTypes.Count > 0)
            {
                return Ok(addTypes);
            }
            else
                return NoContent();
        }

        [Route("contactType")]
        public IActionResult contactTypes()
        {

            List<DropdownModel> phoneTypes = new List<DropdownModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select * from contact_type;";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    phoneTypes.Add(new DropdownModel()
                    {
                        id = reader.GetInt32(0),
                        name = reader.GetString(1),
                    });
                }
            }
            Db.Connection.Close();
            if (phoneTypes.Count > 0)
            {
                return Ok(phoneTypes);
            }
            else
                return NoContent();
        }


        [HttpGet]
        [Route("{type}/{brand}/{model}/specification")]
        async public Task<IActionResult> GetAllDeviceBrands(string type ,string brand ,  string model )
        {

            Db.Connection.Open();

            var specs = new Specification(Db);

            var result = await specs.getSpecificSpecification( type, brand, model);

            Db.Connection.Close();
            // if (result.Any() < 1)
            //    return NoContent();
          //  var json = config.Formatters.JsonFormatter;
            //json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;
            return new OkObjectResult(result);
        }


        [HttpGet]   
        [Route("brands")]
        public IActionResult GetAllDeviceBrands()
        {
            var result = GetListFromQuery("select brand from device_brand");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("models")]
        public IActionResult GetAllDeviceModels()
        {
            var result = GetListFromQuery("select model from device_model");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("types")]
        public IActionResult GetAllDeviceTypes()
        {
            var result = GetListFromQuery("select type from device_type");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("rams")]
        public IActionResult GetAllSpecificationRAM()
        {
            var result = GetListFromQuery("select distinct RAM from specification");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("storages")]
        public IActionResult GetAllSpecificationStorage()
        {
            var result = GetListFromQuery("select distinct storage from specification");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("screensizes")]
        public IActionResult GetAllSpecificationScreenSize()
        {
            var result = GetListFromQuery("select distinct screen_size from specification");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("connectivities")]
        public IActionResult GetAllSpecificationConnectivity()
        {
            var result = GetListFromQuery("select distinct connectivity from specification");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        private List<DropdownModel> GetListFromQuery(string queryString)
        {
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = queryString;
            var reader = cmd.ExecuteReader();
            var result = new DropdownModel().ReadAllDropdowns(reader);
            Db.Connection.Close();
            return result;
        }
        public AppDb Db { get; }
    }






    class DropdownModel
    {
        public int id { get; set; }
        public string name { get; set; }

        public List<DropdownModel> ReadAllDropdowns(MySqlDataReader reader)
        {
            var list = new List<DropdownModel>();
            while (reader.Read())
            {
                list.Add(new DropdownModel()
                {
            //        id = reader.GetInt32(0),
                    name = reader.GetString(0)
                });
            }
            return list;
        }
    }
}