using Microsoft.AspNetCore.Mvc;
using RequestAdmin.Logics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement;

namespace RequestAdmin.Controllers
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
            string sort = HttpContext.Request.Query["sort"];
            string find = HttpContext.Request.Query["find"];
            string sortType = HttpContext.Request.Query["sort-type"];
            string page = (HttpContext.Request.Query["page"]);
            string size = (HttpContext.Request.Query["pagesize"]);
            if (sortType == null)
                sortType = "";
            if (sort == null)
                sort = "";
            if (find == null)
                find = "";
            if (page == null)
                page = "0";
            if (size == null)
                size = "9";
            var result = new SortRequestHistoryData(Db);

            return new OkObjectResult(await result.GetSortData(find, sort, sortType, int.Parse(page), int.Parse(size)));

        }

        [HttpGet("/{status}")]
        async public Task<IActionResult> getStatus( string status )
        {
            if(status == null || status == "")
            {
                status = "";
            }

            await Db.Connection.OpenAsync();
            string sort = HttpContext.Request.Query["sort"];
            string find = HttpContext.Request.Query["find"];
            string sortType = HttpContext.Request.Query["sort-type"];
            string page = (HttpContext.Request.Query["page"]);
            string size = (HttpContext.Request.Query["pagesize"]);
            if (sortType == null)
                sortType = "";
            if (sort == null)
                sort = "";
            if (find == null)
                find = "";
            if (page == null)
                page = "0";
            if (size == null)
                size = "9";
            var result = new SortRequestHistoryData(Db);

            return new OkObjectResult(await result.GetSortData(find, sort, sortType, int.Parse(page), int.Parse(size)));

        }

    }
}