using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AMS.COMMON.Encryption
{
    public class TokenHandle
    {
        public static string Init(string key, string value)
        {
            try
            {
                string derived = string.Empty;

                string salt = "!quytt_qntech_21";

                byte[] saltBytes = new byte[24];
                saltBytes = Encoding.UTF8.GetBytes(salt);

                using (var pbkdf2 = new Rfc2898DeriveBytes(key + salt + value + DateTime.Now.ToLongTimeString(), saltBytes, 10000))
                {
                    derived = Convert.ToBase64String(pbkdf2.GetBytes(24));
                }
                return derived;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
