using System;
using System.Threading.Tasks;
using dm_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace dm_backend.Controllers
{
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
        public IActionResult GetOneUser(string device_id)
        {
            Db.Connection.Open();
            var query = new devices(Db);
            var result = query.getdevicebyid(Int32.Parse(device_id));
            Db.Connection.Close();
            return Ok(result);
        }


        [HttpGet]
        [Route("{search}")]

        public IActionResult getDeviceswithSearch(String search)
        {
            Db.Connection.Open();
            var query = new devices(Db);
            var result = query.getDeviceBySearch(search);
            Db.Connection.Close();
            return Ok(result);

        }
        [HttpGet]
        [Route("sort")]

        public IActionResult getDeviceswithSorting()
        {
            string SortColumn = (HttpContext.Request.Query["SortColumn"]);
            string SortDirection = (HttpContext.Request.Query["SortDirection"]);
            SortDirection = (SortDirection.ToLower()) == "d" ? "DESC" : "ASC";
            switch (SortColumn.ToLower())
            {
                case "device_name":
                    SortColumn = "type , brand ,  model";
                    break;
                case "specification":
                    SortColumn = "RAM , storage , screen_size , connectivity";
                    break;
                case "assign_to_name":
                    SortColumn = "assign_to_first_name , assign_to_middle_name , assign_to_last_name";
                    break;

                case "assign_by_name":
                    SortColumn = "assign_by_first_name , assign_by_middle_name , assign_by_last_name";
                    break;
                case "serial_number":
                    SortColumn = "serial_number*1";
                    break;
                case "status":
                    SortColumn = "s.status_name";
                    break;
                default:
                    break;
            }
            Db.Connection.Open();
            var query = new devices(Db);
            var result = query.SortAlldevices(SortColumn, SortDirection);
            Db.Connection.Close();
            return Ok(result);

        }

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

        [HttpPut]
        [Route("update/{device_id}")]
        async public Task<IActionResult> Put(int device_id, [FromBody]val body)
        {
            Db.Connection.Open();
            var query = new logicupdate(Db);
            body.device_id = device_id;
            await query.updateDevice(body);
            Db.Connection.Close();
            return Ok();
        }



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




        [HttpPost]
        [Route("addspecification")]
        async public Task<IActionResult> Postspec([FromBody]Specification body)
        {
            Db.Connection.Open();
            var que = new insertspec(Db);
            await que.addspecification(body);
            // item.Db = Db;
            //var result = item.Insert();
            Db.Connection.Close();
            return Ok();
        }
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
        [HttpGet("type")]
        public async Task<IActionResult> GetAlltypes()
        {
            await Db.Connection.OpenAsync();
            var query = new type(Db);
            var result = await query.getalltypes();
            return new OkObjectResult(result);
        }
        [HttpGet("model")]
        public async Task<IActionResult> GetAllmodel()
        {
            await Db.Connection.OpenAsync();
            var query = new Model(Db);
            var result = await query.getallmodel();
            return new OkObjectResult(result);
        }
        [HttpGet("brand")]
        public async Task<IActionResult> GetAllbrands()
        {
            await Db.Connection.OpenAsync();
            var query = new brand(Db);
            var result = await query.getallbrands();
            return new OkObjectResult(result);
        }
        [HttpPost]
        [Route("type")]
        async public Task<IActionResult> PostTYPE([FromBody]type body)
        {
            Db.Connection.Open();
            var que = new logicaddtype(Db);
            await que.addType(body);
            Db.Connection.Close();
            return Ok();
        }
        [HttpPost]
        [Route("brand")]
        async public Task<IActionResult> PostBrand([FromBody]brand body)
        {
            Db.Connection.Open();
            var que = new logicaddbrand(Db);
            await que.addbrand(body);
            Db.Connection.Close();
            return Ok();
        }
        [HttpPost]
        [Route("model")]
        async public Task<IActionResult> Postmodel([FromBody]Model body)
        {
            Db.Connection.Open();
            var que = new logicaddmodel(Db);
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
