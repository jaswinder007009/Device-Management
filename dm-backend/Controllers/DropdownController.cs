using System;
using System.Data;
using System.Data.Common;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using dm_backend.Utilities;


namespace dm_backend.Controllers
{
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

            List<GenericModel> countries = new List<GenericModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select country_id as id, country_name as name from country";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    countries.Add(new GenericModel()
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

            List<GenericModel> states = new List<GenericModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select state_id as id, state_name as name from state limit 50";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    states.Add(new GenericModel()
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
            List<GenericModel> cities = new List<GenericModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select city_id as id, city_name as name from city limit 6000 ";
           // cmd.Parameters.AddWithValue("@c_id", fields);
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    cities.Add(new GenericModel()
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

            List<GenericModel> salutations = new List<GenericModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select salutation_id as id,salutation as name from salutation;";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    salutations.Add(new GenericModel()
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

            List<GenericModel> countries = new List<GenericModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select country_code as id, country_name as name from country";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    countries.Add(new GenericModel()
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

            List<GenericModel> addTypes = new List<GenericModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select address_type_id as id,address_type as name from address_type;";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    addTypes.Add(new GenericModel()
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

            List<GenericModel> phoneTypes = new List<GenericModel>();
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "select contact_type_id as id,contact_type as name from contact_type;";
            var reader = cmd.ExecuteReader();

            using (reader)
            {
                while (reader.Read())
                {
                    phoneTypes.Add(new GenericModel()
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
        [Route("brands")]
        public IActionResult GetAllDeviceBrands()
        {
            var result = GetListFromQuery("select device_brand_id as id, brand as name from device_brand");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("models")]
        public IActionResult GetAllDeviceModels()
        {
            var result = GetListFromQuery("select device_model_id as id,model as name from device_model");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("types")]
        public IActionResult GetAllDeviceTypes()
        {
            var result = GetListFromQuery("select device_type_id as id,type as name from device_type");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("rams")]
        public IActionResult GetAllSpecificationRAM()
        {
            var result = GetListFromQuery("select distinct 0 as id, RAM as name from specification");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("storages")]
        public IActionResult GetAllSpecificationStorage()
        {
            var result = GetListFromQuery("select distinct 0 as id,storage as name from specification");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("screensizes")]
        public IActionResult GetAllSpecificationScreenSize()
        {
            var result = GetListFromQuery("select distinct 0 as id,screen_size as name from specification");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("connectivities")]
        public IActionResult GetAllSpecificationConnectivity()
        {
            var result = GetListFromQuery("select distinct 0 as id, connectivity as name from specification");
            if (result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        private List<GenericModel> GetListFromQuery(string queryString)
        {
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = queryString;
            var reader = cmd.ExecuteReader();
            var result = new GenericModel().ReadAllDropdowns(reader);
            Db.Connection.Close();
            return result;
        }
        public AppDb Db { get; }
    }


   public  class GenericModel
    {
        public int id { get; set; }
        public string name { get; set; }
         public AppDb Db { get; }
         public GenericModel()
         {

         }
         public GenericModel(AppDb db)
         {
             Db=db;

         }


        public List<GenericModel> ReadAllDropdowns(MySqlDataReader reader)
        {
            var list = new List<GenericModel>();
            while (reader.Read())
            {
                list.Add(Readers.ReadGenericModel(reader,""));
               
            }
            return list;
        }
         public  async Task<List<GenericModel>> ReadAllDropdowns(DbDataReader reader)
        {
            var list = new List<GenericModel>();
            while (await reader.ReadAsync())
            {
                 list.Add(Readers.ReadGenericModel(reader,""));
            }
            return list;
        }
    }
}