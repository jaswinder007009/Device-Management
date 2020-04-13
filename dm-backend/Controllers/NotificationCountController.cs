using DeviceManagementPro.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dm_backend.Controllers
{
    [Authorize]

    [ApiController]
    [Route("api/[Controller]")]
    public class NotificationCountController
    {
      
            private readonly SagardbContext _context;

            public NotificationCountController(SagardbContext logger)
            {
                _context = logger;
            }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public int GetCount(int id)
        {
            var values = _context.Notification.Count(w => w.EmployeeId == id);
            return values;
               
            }

            
        }
}
    
