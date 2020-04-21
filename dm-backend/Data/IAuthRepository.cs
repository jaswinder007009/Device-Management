using dm_backend.EFModels;
using System.Threading.Tasks;

namespace dm_backend.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<UserAuth> Login(string name, string password);

        Task<bool> UserExists(string name);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);

    }
}
