using AMS.BUS.DBConnect;
using AMS.COMMON.Encryption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusinessHandle
{
    public class UserInfor
    {
        public user_identifie GetUserInfor(string userID)
        {
            try
            {
                var db = DBC.Init;
                return db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault(); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public role_function GetRole(string roleid)
        {
            try
            {
                var db = DBC.Init;
                return db.role_function.Where(ptr => ptr.ID == roleid).ToList().LastOrDefault(); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public user_identifie CreateUserInfor(string userName, string userPassword, string userFullName, string roleID)
        {
            try
            {
                var db = DBC.Init;
                var passwordEncode = SecuritiesHandle.Encode(userPassword);
                var user = db.user_identifie.Where(ptr => ptr.UserName == userName && ptr.UserPassword == passwordEncode).ToList().LastOrDefault();
                if (user == null)
                {
                    user_identifie user1 = new user_identifie()
                    {
                        UserName = userName,
                        UserPassword = passwordEncode,
                        CreateDate = DateTime.Now,
                        IsLock = false,
                        IsDelete = false,
                        Role = roleID,
                        UserFullName = userFullName,
                    };
                    db.user_identifie.Add(user1);
                    db.SaveChanges();
                    return user1;
                }
                else
                {
                    return user;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
