using DeviceManagementPro.Models;
using System.Threading.Tasks;

namespace DeviceManagementPro.Data
{
    public interface IAuthRepository
    {
        Task<UserAuth> Register(UserAuth user, string password);
        Task<UserAuth> Login(string name, string password);

        Task<bool> UserExists(string name);
    }
}
