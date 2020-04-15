﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dm_backend.Logics;
using System.Net;


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


        [HttpPost]
        [Route("device")]
        public  IActionResult postdeviceRequest([FromBody] DeviceRequest req)
        {
            Db.Connection.Open();
            var request = new Request(Db);
            try
            {
                request.addDevice(req);
               
            }
            catch
            {
               return BadRequest("request is incorrect");
            }
            Db.Connection.Close();
            return Ok("request Sent");

        }


        [HttpPost]
        [Route("add")]
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
            int userId=  -1;
            string searchField=(string) HttpContext.Request.Query["search"] ?? "";
            string sortField=(string) HttpContext.Request.Query["sortby"] ?? "request_device_id";
            string sortDirection=(string)HttpContext.Request.Query["direction"] ?? "asc";
            if(!string.IsNullOrEmpty(HttpContext.Request.Query["id"]))
            userId=Convert.ToInt32((string)HttpContext.Request.Query["id"]);
    
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
        public IActionResult AcceptRequest(int requestId, [System.Web.Http.FromUri]int id)
        {
            Db.Connection.Open();
            RequestModel query = new RequestModel(Db);
            query.requestId = requestId;
            string result = null;
            try{
                result =query.AcceptDeviceRequest(id);
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
                Console.WriteLine(e.Message);
                return NoContent();
            }
            Db.Connection.Close();
            return  Ok(result);
        }
        
    }
}
