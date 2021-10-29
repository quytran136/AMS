using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using AMS.COMMON.Encryption;
using System;
using System.Linq;

namespace AMS.BUS.BusinessHandle
{
    public class UserInfor : IBaseHandle
    {
        public BaseModel<user_identifie> GetUserInfor(string userName)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.UserName == userName).ToList().LastOrDefault();
                if (user == null)
                {
                    return new BaseModel<user_identifie>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(1)
                        }
                    };
                }

                return new BaseModel<user_identifie>()
                {
                    Result = user
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<user_identifie>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<user_identifie> CreateUserInfor(string userName, string userPassword, string userFullName)
        {
            try
            {
                var db = DBC.Init;
                var passwordEncode = SecuritiesHandle.Encode(userPassword);
                var user = db.user_identifie.Where(ptr => ptr.UserName == userName).ToList().LastOrDefault();
                if (user == null)
                {
                    user_identifie user1 = new user_identifie()
                    {
                        ID = Guid.NewGuid().ToString(),
                        UserName = userName,
                        UserPassword = passwordEncode,
                        CreateDate = DateTime.Now,
                        IsLock = false,
                        IsDelete = false,
                        UserFullName = userFullName,
                    };
                    db.user_identifie.Add(user1);
                    db.SaveChanges();
                    return new BaseModel<user_identifie>()
                    {
                        Result = user
                    };
                }

                return new BaseModel<user_identifie>()
                {
                    Exception = new ExceptionHandle()
                    {
                        // Đã tồn tại tài khoản
                        Code = BUSMessageCode(2)
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<user_identifie>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<bool> ChangePassword(string userID, string userPassword, string newPassword)
        {
            try
            {
                var db = DBC.Init;
                var passwordEncode = SecuritiesHandle.Encode(userPassword);
                var newPasswordEncode = SecuritiesHandle.Encode(newPassword);
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                if (passwordEncode == newPasswordEncode)
                {
                    return new BaseModel<bool>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            // Password cũ trùng password mới
                            Code = BUSMessageCode(3)
                        }
                    };
                }

                if (user == null)
                {
                    return new BaseModel<bool>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            // Không tồn tại user
                            Code = BUSMessageCode(1)
                        }
                    };
                }

                user.UserPassword = newPasswordEncode;
                db.SaveChanges();
                return new BaseModel<bool>()
                {
                    Result = true
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<bool>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<bool> Lock(string userID)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                if (user == null)
                {
                    return new BaseModel<bool>()
                    {
                        Exception = new ExceptionHandle
                        {
                            Code = BUSMessageCode(1),
                        }
                    };
                }

                user.IsLock = true;
                db.SaveChanges();
                return new BaseModel<bool>()
                {
                    Result = true,
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<bool>()
                {
                    Exception = new ExceptionHandle
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<bool> Unlock(string userID)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                if (user == null)
                {
                    return new BaseModel<bool>()
                    {
                        Exception = new ExceptionHandle
                        {
                            Code = BUSMessageCode(1),
                        }
                    };
                }

                user.IsLock = false;
                db.SaveChanges();
                return new BaseModel<bool>()
                {
                    Result = true,
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<bool>()
                {
                    Exception = new ExceptionHandle
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<bool> Delete(string userID)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                if (user == null)
                {
                    return new BaseModel<bool>()
                    {
                        Exception = new ExceptionHandle
                        {
                            Code = BUSMessageCode(1),
                        }
                    };
                }
                user.IsDelete = true;
                db.SaveChanges();
                return new BaseModel<bool>()
                {
                    Result = true,
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<bool>()
                {
                    Exception = new ExceptionHandle
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }
        public string BUSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.BUS_EX,
                FunctionCode.API,
                FunctionCode.USER,
                id);
        }

        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.USER,
                id);
        }
    }
}
