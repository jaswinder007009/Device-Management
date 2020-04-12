using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

public abstract class BaseController : Controller
{        
    protected int GetUserId()
    {
        return int.Parse(this.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value);
    }
    protected string GetUserName()
    {
        return this.User.Claims.First(i => i.Type == ClaimTypes.Name).Value;
    }
    protected List<string> GetUserRoles()
    {
        return this.User.Claims.Where(i => i.Type == ClaimTypes.Role).Select(i => i.Value).ToList();
    }
}
