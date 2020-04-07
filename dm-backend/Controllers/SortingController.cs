using Microsoft.AspNetCore.Mvc;
using dm_backend.Logics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dm_backend.Models
{
    [Route("[controller]")]
    [ApiController]
    public class SortingController : Controller
    {
        public AppDb Db { get; }
        public SortingController(AppDb db)
        {
            Db = db;
        }
        [HttpGet]
        async public Task<IActionResult> Sorting()
        {
            await Db.Connection.OpenAsync();
            string status = HttpContext.Request.Query["status"];
            string sort = HttpContext.Request.Query["sort"];
            string find = HttpContext.Request.Query["user-name"];
            string deviceserialNumber = HttpContext.Request.Query["serial-number"];
            string sortType = HttpContext.Request.Query["sort-type"];
            string page = (HttpContext.Request.Query["page"]);
            string limit = (HttpContext.Request.Query["page-size"]);
            if (deviceserialNumber == null)
                deviceserialNumber = "";
            if (sortType == null)
                sortType = "";
            if (sort == null)
                sort = "";
            if (find == null)
                find = "";
            if (page == null)
                page = "";
            if (limit == null)
                limit = "";
            if (status == null)
                status = "";
            var result = new SortRequestHistoryData(Db);
            return new OkObjectResult(await result.GetSortData(find, deviceserialNumber, status, sort, sortType, page, (limit)));

        }
    }
}