using DeviceManagementPro.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DeviceManagementPro.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly SagardbContext _context;
        public AuthRepository(SagardbContext context)
        {
            _context = context;
        }

        public async Task<UserAuth> Register(UserAuth user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);


            user.Hashpassword = passwordHash;
            user.Saltpassword = passwordSalt;


            await _context.UserAuth.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {

            using var hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        public async Task<UserAuth> Login(string email, string password)
        {

            var user = await _context.UserAuth.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                Console.WriteLine("yes");
                return null;
            }

            if (!Verify(password, user.Hashpassword, user.Saltpassword))
                return null;

            return user;

        }

        private bool Verify(string password, byte[] hashpassword, byte[] saltpassword)
        {




            using (var hmac = new System.Security.Cryptography.HMACSHA512(saltpassword))
            {
                var computerHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computerHash.Length; i++)
                    Console.Write(computerHash[i]);
                for (int i = 0; i < computerHash.Length; i++)
                {

                    if (computerHash[i] != hashpassword[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<bool> UserExists(string email)
        {
            if (await _context.User.AnyAsync(x => x.Email == email))
                return true;
            return false;
        }
    }
}
