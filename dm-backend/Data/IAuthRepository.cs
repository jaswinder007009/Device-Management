using dm_backend.EFModels;
using System.Threading.Tasks;

namespace dm_backend.Data
{
    public interface IAuthRepository
    {
        Task<UserAuth> Register(UserAuth user, string password);
        Task<UserAuth> Login(string name, string password);

        Task<bool> UserExists(string name);
       
    }
}
