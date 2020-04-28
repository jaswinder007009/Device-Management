
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace dm_backend.Data{
    public class PermissionAuthorize: AuthorizeAttribute, IAuthorizationFilter{
        public string Permission { get; set; }
        private EFDbContext _dbcontext { get; set; }
        public PermissionAuthorize(){}
        public void OnAuthorization(AuthorizationFilterContext context){
            _dbcontext = (EFDbContext)context.HttpContext.RequestServices.GetService(typeof(EFDbContext));
            if(string.IsNullOrEmpty(Permission)){
                context.Result = new UnauthorizedResult();
                return;
            }
            List<string> rolesFromToken = context.HttpContext.User.Claims.Where(i => i.Type == ClaimTypes.Role).Select(i => i.Value).ToList();
            IEnumerable<string> allPermissionsFromRoles = (from role in _dbcontext.Role
                                                    join rp in _dbcontext.RoleToPermission on
                                                    role.RoleId equals rp.RoleId
                                                    join perm in _dbcontext.Permission on
                                                    rp.PermissionId equals perm.PermissionId
                                                    select perm.PermissionName).ToList().Distinct();
            var NoOfCommonPerms = Permission.Split(",").Intersect(allPermissionsFromRoles).Count();
            if(NoOfCommonPerms > 0){
                return;
            }
            else{
                context.Result = new UnauthorizedResult();
                return;
            }
        }
    }
}