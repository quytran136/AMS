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
        public user_identifie GetUserInfor(string userName)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.UserName == userName).ToList().LastOrDefault();
                if (user == null)
                {
                    throw new Exception("user does not exist");
                }
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public user_identifie CreateUserInfor(string userName, string userPassword, string userFullName)
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
                        UserFullName = userFullName,
                    };
                    db.user_identifie.Add(user1);
                    db.SaveChanges();
                    return user1;
                }
                else
                {
                    throw new Exception("user had exist");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void ChangePassword(string userID, string userPassword, string newPassword)
        {
            try
            {
                var db = DBC.Init;
                var passwordEncode = SecuritiesHandle.Encode(userPassword);
                var newPasswordEncode = SecuritiesHandle.Encode(newPassword);
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                if (passwordEncode == newPasswordEncode)
                {
                    throw new Exception("Old password equal new password");
                }
                if (user == null)
                {
                    throw new Exception("user does not exist");
                }
                user.UserPassword = newPasswordEncode;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Lock(string userID)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                if (user == null)
                {
                    throw new Exception("user does not exist");
                }
                user.IsLock = true;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Unlock(string userID)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                if (user == null)
                {
                    throw new Exception("user does not exist");
                }
                user.IsLock = false;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public void Delete(string userID)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                if (user == null)
                {
                    throw new Exception("user does not exist");
                }
                user.IsDelete = true;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
