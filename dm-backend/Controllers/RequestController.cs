﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dm_backend.Logics;

namespace dm_backend.Models{
    [ApiController]
    [Route("[controller]")]
    public class RequestController : Controller
    {
        public AppDb Db { get; }

        public RequestController(AppDb db)
        {
            Db = db;
        }
/*
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
        }
        */
        [HttpPost]
        public IActionResult PostRequest([FromBody]RequestModel req)
        {
            Db.Connection.Open();
            req.Db = Db;
            string result = null;
            try{
                result = req.AddRequest();
            }
            catch(NullReferenceException){
                return NoContent();
            }
            Db.Connection.Close();
            return Ok(result);
        }

        [HttpGet]
        [Route("pending")]
        public IActionResult GetRequest()
        {
            int userId=-1;
            string searchField = "";
            string sortField = "request_device_id";
            int sortDirection = 0;
            if (!string.IsNullOrEmpty(HttpContext.Request.Query["id"]))
                userId = Convert.ToInt32(HttpContext.Request.Query["id"]);

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["search"]))
                searchField = HttpContext.Request.Query["search"];
            
            if (!string.IsNullOrEmpty(HttpContext.Request.Query["sort"]))
                sortField = HttpContext.Request.Query["sort"];

            if (!string.IsNullOrEmpty(HttpContext.Request.Query["direction"]))
                sortDirection = Convert.ToInt32(HttpContext.Request.Query["direction"]);

            Db.Connection.Open();
            var requestObject = new RequestModel(Db);
            var result = requestObject.GetAllPendingRequests(userId,sortField,sortDirection,searchField);
            Db.Connection.Close();
            return Ok(result);
        }


        [HttpGet]
        [Route("{requestId}/reject")]
        public IActionResult RejectRequest(int requestId, [System.Web.Http.FromUri]int id){
            Db.Connection.Open();
            RequestModel query = new RequestModel(Db);
            query.requestId = requestId;
            try{
                query.RejectDeviceRequest(id);
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                return BadRequest("An error occured while rejecting the request");
            }
            Db.Connection.Close();
            return Ok("Request rejected");
        }
        
        [HttpGet]
        [Route("{requestId}/accept")]
        public IActionResult AcceptRequest(int requestId)
        {
            Db.Connection.Open();
            RequestModel query = new RequestModel(Db);
            string result = null;
            try{
                result =query.AcceptDeviceRequest(requestId);
            }
            catch(Exception e){
                result="Device unavailable";
            }
            Db.Connection.Close();
            return  Ok(result);
        }

        [HttpDelete]
        [Route("{requestId}/cancel")]
        public IActionResult DeleteRequest(int requestId)
        {
            Db.Connection.Open();
            RequestModel query = new RequestModel(Db);
            string result = null;
            try{
                result =query.CancelRequest(requestId);
            }
            catch(Exception e){
                return NoContent();
            }
            Db.Connection.Close();
            return  Ok(result);
        }
        
    }
}
