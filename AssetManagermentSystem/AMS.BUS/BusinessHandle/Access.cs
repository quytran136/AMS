using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using AMS.COMMON.Encryption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusinessHandle
{
    public class Access : IBaseHandle
    {
        public BaseModel<string> CheckLogin(string userName, string userPassword)
        {
            try
            {
                var db = DBC.Init;
                string passwordEncode = SecuritiesHandle.Encode(userPassword);
                var user = db.user_identifie.Where(ptr => ptr.UserName == userName && 
                                                    ptr.UserPassword == passwordEncode && 
                                                    ptr.IsDelete == false && 
                                                    ptr.IsLock == false).ToList().LastOrDefault();
                if (user == null)
                {
                    return new BaseModel<string>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            // không tồn tại user
                            //B01AC01
                            Code = BUSMessageCode(1)
                        },
                    };
                }
                else
                {
                    string token = TokenHandle.Init(userName, userPassword);
                    BaseModel<string> savetoken = SaveToken(token, user.ID);
                    if (!string.IsNullOrEmpty(savetoken?.Exception?.Message))
                    {
                        return savetoken;
                    }
                    return new BaseModel<string>()
                    {
                        Result = token,
                    };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel<string>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex,
                    }
                };
            }
        }

        public BaseModel<bool> CheckToken(object token, object userNameRequest)
        {
            throw new NotImplementedException();
        }

        private BaseModel<string> SaveToken(string token, string userID)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.ID == userID).ToList().LastOrDefault();
                user.Token = token;
                db.SaveChanges();
                return new BaseModel<string>() { 
                    Result = token
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<string>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    },
                };
            }
        }

        public BaseModel<bool> CheckToken(string token, string userName)
        {
            try
            {
                var db = DBC.Init;
                var user = db.user_identifie.Where(ptr => ptr.Token == token && ptr.IsDelete == false && ptr.IsLock == false).ToList().LastOrDefault();
                if (user == null)
                {
                    return new BaseModel<bool>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(2)
                        },
                        Result = false,
                    };
                }
                else
                {
                    if (userName != user.UserName)
                    {
                        return new BaseModel<bool>()
                        {
                            Exception = new ExceptionHandle()
                            {
                                Code = BUSMessageCode(2)
                            },
                            Result = false,
                        };
                    }
                    else
                    {
                        return new BaseModel<bool>()
                        {
                            Result = true,
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                return new BaseModel<bool>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    },
                };
            }
        }

        public string BUSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.BUS_EX,
                FunctionCode.API,
                FunctionCode.ACCESS,
                id);
        }

        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.ACCESS,
                id);
        }
    }
}
