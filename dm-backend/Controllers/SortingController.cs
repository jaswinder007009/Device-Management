using Microsoft.AspNetCore.Mvc;
using dm_backend.Logics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dm_backend.Models{
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
            string find = (string)HttpContext.Request.Query["find"] ?? String.Empty;
            string sortType = HttpContext.Request.Query["sort-type"];
            string page = (string)HttpContext.Request.Query["page"] ?? "0";
            string size = (string)HttpContext.Request.Query["pagesize"] ?? "9";
            if (sortType == null)
                sortType = "";
            if (sort == null)
                sort = "";
            // if (find == null)
            //     find = "";
            // if (page == null)
            //     page = "0";
            // if (size == null)
            //     size = "9";
            Console.WriteLine("Page : " + page + " -- size : " + size);
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