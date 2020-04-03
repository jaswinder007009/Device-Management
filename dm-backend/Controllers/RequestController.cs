using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RequestAdmin.Logics;
using UserManagement;

namespace RequestAdmin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RequestController : Controller
    {
        public AppDb Db { get; }

        public RequestController(AppDb db)
        {
            Db = db;
        }

        [HttpGet]
       async public Task<IActionResult> Get()
        {
            string find = (HttpContext.Request.Query["find"]);
            string page = (HttpContext.Request.Query["page"]);
            string size = (HttpContext.Request.Query["pagesize"]);
            if (find == null)
                find = "";
            if (page == null)           
                page = "1";
            if (size == null)
               size = "10";
            var low = ((int.Parse(page) * int.Parse(size)) - int.Parse(size));
            var high = int.Parse(size) * int.Parse(page);
            await Db.Connection.OpenAsync();
            var result = new SearchRequestHistory(Db);
            var data = await result.SearchDeviceRequest(find, low, high);

            return new OkObjectResult(data);
            /*  var  low = ((int.Parse(size) *  int.Parse(page) )- int.Parse(size));
              var high = (int.Parse(size) * int.Parse(page));
              await Db.Connection.OpenAsync();
              var reqDevvice = new AllDeviceRequest(Db);
              var results = await reqDevvice.deviceRequest(low , high);
              var data = await new TotalResultCount(Db).findCount(results, "count_request");

              var count = new { resultsval = "superb" };

              return new OkObjectResult(data );*/
        }




    }
}
