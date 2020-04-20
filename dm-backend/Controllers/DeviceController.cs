using System;
using System.Threading.Tasks;
using dm_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace dm_backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        public DeviceController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
        [Route("page")]
        public IActionResult GetAllDevices()
        {
            int limit1 = Convert.ToInt32(HttpContext.Request.Query["limit1"]);
            int offset1 = Convert.ToInt32(HttpContext.Request.Query["offset1"]);
            Db.Connection.Open();
            var query = new devices(Db);
            var result = query.GetAllDevices(limit1, offset1);
            Db.Connection.Close();
            return Ok(result);
        }
        [HttpGet]
        [Route("device_id/{device_id}")]
        public IActionResult GetOneDevice(string device_id)
        {
            Db.Connection.Open();
            var query = new devices(Db);
            var result = query.getdevicebyid(Int32.Parse(device_id));
            Db.Connection.Close();
            return Ok(result);
        }


        [HttpGet]
        [Route("search")]
        public IActionResult getDeviceswithSearch()
        {
            string device_name = (HttpContext.Request.Query["device_name"]);
            string serial_number = (HttpContext.Request.Query["serial_number"]);
            string status_name = (HttpContext.Request.Query["status_name"]);
            if(device_name==null)
            {
                device_name = "";
            }
            Db.Connection.Open();
            var query = new devices(Db);
            var result = query.getDeviceBySearch(device_name,serial_number,status_name);
            Db.Connection.Close();
            return Ok(result);

        }
        [HttpGet]
        [Route("sort")]
        public IActionResult getDeviceswithSorting()
        {
            string SortColumn = (HttpContext.Request.Query["SortColumn"]);
            string SortDirection = (HttpContext.Request.Query["SortDirection"]);
            SortDirection = (SortDirection.ToLower()) == "desc" ? "DESC" : "ASC";
            switch (SortColumn.ToLower())
            {
                case "device_name":
                    SortColumn = "concat(type ,'', brand , '' ,  model)";
                    break;
                case "specification":
                    SortColumn = "concat(RAM , ' ',storage ,' ',screen_size , ' ',connectivity)";
                    break;
              
                case "serial_number":
                    SortColumn = "serial_number*1";
                    break;
               
                default:  SortColumn = "concat(type ,'', brand , '' ,  model)";
                
                    break;
            }
            Db.Connection.Open();
            var query = new devices(Db);
            var result = query.SortAlldevices(SortColumn, SortDirection);
            Db.Connection.Close();
            return Ok(result);

        }

        [Authorize(Roles="admin")]
        [HttpDelete]
        [Route("del/{device_id}")]
        public IActionResult DeleteOne(int device_id)
        {
            Db.Connection.Open();
            devices query = new devices(Db);
            query.device_id = device_id;
            query.Delete();
            Db.Connection.Close();
            return Ok();
        }

        [Authorize(Roles="admin")]
        [HttpPost]
        [Route("add")]
        async public Task<IActionResult> Post([FromBody]val body)
        {
            Db.Connection.Open();
            var que = new logicinsert(Db);
            await que.addDevice(body);
            Db.Connection.Close();
            return Ok();
        }

        [Authorize(Roles="admin")]
        [HttpPost]
        [Route("assign")]
        async public Task<IActionResult> AssignDevice([FromBody]Assign body)
        {
            Db.Connection.Open();
            var que = new Assign(Db);
            await que.assignDevice(body);
            Db.Connection.Close();
            return Ok();
        }

        [Authorize(Roles="admin")]
        [HttpPut]
        [Route("update/{device_id}")]
        async public Task<IActionResult> Put(int device_id, [FromBody]val body)
        {
            Db.Connection.Open();
            var query = new logicinsert(Db);
            body.device_id = device_id;
            await query.updateDevice(body);
            Db.Connection.Close();
            return Ok();
        }

        //TODO below three routes
        // and same in dropdown controller

        //Specification
        [HttpGet("specid")]
        async public Task<IActionResult> get_specification_id()
        {
            string ram = (HttpContext.Request.Query["ram"]);
            string screen = (HttpContext.Request.Query["screen"]);
            string conn = (HttpContext.Request.Query["connec"]);
            string stor = (HttpContext.Request.Query["storage"]);
            await Db.Connection.OpenAsync();
            var result = new spec(Db);
            var data = await result.getSpecificationId(ram, screen, conn, stor);
            return new OkObjectResult(data);
        }

        [HttpGet("specification")]
        public async Task<IActionResult> GetAllSpecification()
        {
            await Db.Connection.OpenAsync();
            var query = new Specification(Db);
            var result = await query.getAllSpecifications();
            return new OkObjectResult(result);
        }

        [HttpGet]
        [Route("spec/{specification_id}")]
        public IActionResult GetSpec(int specification_id)
        {
            Db.Connection.Open();
            var query = new Specification(Db);
            var result = query.getspecbyid(specification_id);
            Db.Connection.Close();
            return Ok(result);
        }



        [Authorize(Roles="admin")]
        [HttpPost]
        [Route("addspecification")]
        async public Task<IActionResult> Postspec([FromBody]Specification body)
        {
            Db.Connection.Open();
            var que = new insertspec(Db);
            await que.addspecification(body);
            Db.Connection.Close();
            return Ok();
        }

        [Authorize(Roles="admin")]
        [HttpPut]
        [Route("updatespecification/{specification_id}")]
        async public Task<IActionResult> Putspec(int specification_id, [FromBody]Specification body)
        {
            Db.Connection.Open();
            var query = new updatespec(Db);
            body.specification_id = specification_id;
            await query.updatespecification(body);
            Db.Connection.Close();
            return Ok();
        }

        [Authorize(Roles="admin")]
        [HttpPost]
        [Route("type")]
        async public Task<IActionResult> PostTYPE([FromBody]type body)
        {
            Db.Connection.Open();
            var que = new type(Db);
            await que.addType(body);
            Db.Connection.Close();
            return Ok();
        }

        [Authorize(Roles="admin")]
        [HttpPost]
        [Route("brand")]
        async public Task<IActionResult> PostBrand([FromBody]Brand body)
        {
            Db.Connection.Open();
            var que = new Brand(Db);
            await que.addbrand(body);
            Db.Connection.Close();
            return Ok();
        }

        [Authorize(Roles="admin")]
        [HttpPost]
        [Route("model")]
        async public Task<IActionResult> Postmodel([FromBody]Model body)
        {
            Db.Connection.Open();
            var que = new Model(Db);
            await que.addmodel(body);
            Db.Connection.Close();
            return Ok();
        }



        [HttpGet]
        [Route("previous_device/{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            string ToSearch = String.Empty; if (!string.IsNullOrEmpty(HttpContext.Request.Query["search"])) ToSearch = HttpContext.Request.Query["search"];
            string ToSort = String.Empty; if (!string.IsNullOrEmpty(HttpContext.Request.Query["sortby"])) ToSort = HttpContext.Request.Query["sortby"];
            string Todirection = String.Empty; if (!string.IsNullOrEmpty(HttpContext.Request.Query["direction"])) Todirection = HttpContext.Request.Query["direction"];
            await Db.Connection.OpenAsync();
            var query = new devices(Db);
            var result = await query.getPreviousDevice(id, ToSearch, ToSort, Todirection);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }
        [HttpGet("current_device/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            string ToSearch = String.Empty; if (!string.IsNullOrEmpty(HttpContext.Request.Query["search"])) ToSearch = HttpContext.Request.Query["search"];
            string ToSort = String.Empty; if (!string.IsNullOrEmpty(HttpContext.Request.Query["sortby"])) ToSort = HttpContext.Request.Query["sortby"];
            string Todirection = String.Empty; if (!string.IsNullOrEmpty(HttpContext.Request.Query["direction"])) Todirection = HttpContext.Request.Query["direction"];
            await Db.Connection.OpenAsync();
            var query = new devices(Db);
            var result = await query.getCurrentDevice(id, ToSearch,ToSort, Todirection);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }
        public AppDb Db { get; }
    }

}
