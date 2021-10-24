using AMS.BUS.DBConnect;
using AMS.COMMON.Encryption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusinessHandle
{
    public class Access
    {
        public string CheckLogin(string userName, string userPassword)
        {
            try
            {
                var db = DBC.Init;
                string passwordEncode = SecuritiesHandle.Encode(userPassword);
                var user = db.user_identifie.Where(ptr => ptr.UserName == userName && ptr.UserPassword == passwordEncode).ToList().LastOrDefault();
                if (user == null)
                {
                    return string.Empty;
                }
                else
                {
                    string token = TokenHandle.Init(userName, userPassword);
                    SaveToken(token, user.ID);
                    return token;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void SaveToken(string token, string userID)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                user.Token = token;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool CheckToken(string token)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.Token == token).ToList().LastOrDefault();
                if (user == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
