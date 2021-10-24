using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AMS.COMMON.Encryption
{
    public class SecuritiesHandle
    {
        public static string Encode(string key)
        {
            try
            {
                string derived = string.Empty;

                string salt = "!quytt_qntech_21";

                byte[] saltBytes = new byte[24];
                saltBytes = Encoding.UTF8.GetBytes(salt);

                using (var pbkdf2 = new Rfc2898DeriveBytes(key, saltBytes, 10000))
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
