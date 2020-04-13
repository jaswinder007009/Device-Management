using DeviceManagementPro.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeviceManagementPro.EntityFramework
{
    public class EfQuery
    {
        public readonly SagardbContext _context;

        public EfQuery(SagardbContext context)
        {
            _context = context;
          
         
        }
       public string GetRole(int id)
        {
            var entryPoint = (from us in _context.User
                              join rl in _context.UserToRole on us.UserId equals rl.UserId
                              join r in _context.Role on rl.RoleId equals r.RoleId
                              where us.UserId == id
                              select new
                              {
                                  Role = r.RoleName
                              }).ToList();
            return entryPoint[0].ToString();

        }


    }
}
