using System;
using Microsoft.AspNetCore.Mvc;
using dm_backend.Models;
using System.Text;
using Newtonsoft.Json;
using dm_backend.Utilities;
using System.Collections.Generic;
using MySql.Data.MySqlClient;

namespace dm_backend.Controllers
{
    [Route("api/[controller]")]
    public class DropdownController : Controller
    {
        public AppDb Db { get; }

        public DropdownController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        [Route("brands")]
        public IActionResult GetAllDeviceBrands(){
            var result = GetListFromQuery("select brand from device_brand");
            if(result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("models")]
        public IActionResult GetAllDeviceModels(){
            var result = GetListFromQuery("select model from device_model");
            if(result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("types")]
        public IActionResult GetAllDeviceTypes(){
            var result = GetListFromQuery("select type from device_type");
            if(result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("rams")]
        public IActionResult GetAllSpecificationRAM(){
            var result = GetListFromQuery("select distinct RAM from specification");
            if(result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("storages")]
        public IActionResult GetAllSpecificationStorage(){
            var result = GetListFromQuery("select distinct storage from specification");
            if(result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("screensizes")]
        public IActionResult GetAllSpecificationScreenSize(){
            var result = GetListFromQuery("select distinct screen_size from specification");
            if(result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        [HttpGet]
        [Route("connectivities")]
        public IActionResult GetAllSpecificationConnectivity(){
            var result = GetListFromQuery("select distinct connectivity from specification");
            if(result.Count < 1)
                return NoContent();
            return Ok(result);
        }

        private List<DropdownModel> GetListFromQuery(string queryString){
            Db.Connection.Open();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = queryString;
            var reader = cmd.ExecuteReader();
            var result = new DropdownModel().ReadAllDropdowns(reader);
            Db.Connection.Close();
            return result;
        }
    }
    public class DropdownModel
    {
        // public int id { get; set; }
        public string value { get; set; }
        public List<DropdownModel> ReadAllDropdowns(MySqlDataReader reader){
            var list = new List<DropdownModel>();
            while(reader.Read()){
                list.Add(new DropdownModel(){
                    // id = reader.GetInt32(0),
                    value = reader.GetString(0)
                });
            }
            return list;
        }
    }
}