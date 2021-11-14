using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using AMS.COMMON.Encryption;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AMS.BUS.BusinessHandle
{
    public class UserInformation : IBaseHandle
    {
        public user_identifie User_Identifie { get; set; }
        public string DepartmentName { get; set; }
        public string OrganizationName { get; set; }
        private string validData(string data, bool isSpace = true)
        {
            if (string.IsNullOrEmpty(data))
            {
                return string.Format("data can not be empty");
            }
            else
            {
                if (string.IsNullOrWhiteSpace(data) && isSpace)
                {
                    return string.Format("data can not be empty or have white space");
                }
            }

            return string.Empty;
        }

        public BaseModel<List<UserInformation>> Users(string searchContent = "")
        {
            try
            {
                var db = DBC.Init;
                List<UserInformation> users = (from u in db.user_identifie
                                               join d in db.Departments on u.DepartmentID equals d.ID
                                               join o in db.Organizationals on u.OrganizationID equals o.ID
                                               where u.IsDelete == false &&
                                               (u.UserName.Contains(searchContent) ||
                                               u.UserFullName.Contains(searchContent) ||
                                               u.Phone.Contains(searchContent) ||
                                               u.Email.Contains(searchContent) ||
                                               d.DepartmentName.Contains(searchContent) ||
                                               o.OrganizationalName.Contains(searchContent))
                                               select new UserInformation
                                               {
                                                   User_Identifie = u,
                                                   DepartmentName = d.DepartmentName,
                                                   OrganizationName = o.OrganizationalName
                                               }).ToList<UserInformation>();
                if (users == null)
                {
                    return new BaseModel<List<UserInformation>>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(1)
                        }
                    };
                }

                return new BaseModel<List<UserInformation>>()
                {
                    Result = users
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<UserInformation>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<List<user_identifie>> UsersByDepartmentID(string departmentID)
        {
            try
            {
                var db = DBC.Init;
                var users = db.user_identifie.Where(ptr => ptr.DepartmentID == departmentID).ToList();
                if (users == null || users.Count == 0)
                {
                    return new BaseModel<List<user_identifie>>
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(1)
                        }
                    };
                }

                return new BaseModel<List<user_identifie>>
                {
                    Result = users
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<user_identifie>>
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

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

        public BaseModel<user_identifie> CreateUserInfor(user_identifie userId)
        {
            try
            {
                var db = DBC.Init;
                string validResult = this.validData(userId.UserFullName, false);
                validResult = this.validData(userId.UserName);
                validResult = this.validData(userId.UserPassword);
                validResult = this.validData(userId.DepartmentID);
                validResult = this.validData(userId.OrganizationID);
                validResult = this.validData(userId.DOB.ToString(), false);
                validResult = this.validData(userId.Phone.ToString(), false);
                validResult = this.validData(userId.Email.ToString(), false);

                if (!string.IsNullOrEmpty(validResult))
                {
                    return new BaseModel<user_identifie>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(4)
                        }
                    };
                }

                var passwordEncode = SecuritiesHandle.Encode(userId.UserPassword);
                var user = db.user_identifie.Where(ptr => ptr.UserName == userId.UserName).ToList().LastOrDefault();
                if (user == null)
                {
                    user_identifie user1 = new user_identifie()
                    {
                        ID = Guid.NewGuid().ToString(),
                        UserName = userId.UserName,
                        UserPassword = SecuritiesHandle.Encode(userId.UserPassword),
                        CreateDate = DateTime.Now,
                        IsLock = false,
                        IsDelete = false,
                        UserFullName = userId.UserFullName,
                        DepartmentID = userId.DepartmentID,
                        OrganizationID = userId.OrganizationID,
                        DOB = userId.DOB,
                        Phone = userId.Phone,
                        Email = userId.Email,
                    };
                    db.user_identifie.Add(user1);
                    db.SaveChanges();
                    return new BaseModel<user_identifie>()
                    {
                        Result = user1
                    };
                }

                return new BaseModel<user_identifie>()
                {
                    Exception = new ExceptionHandle()
                    {
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

        public BaseModel<user_identifie> UpdateUserInfor(user_identifie userId)
        {
            try
            {
                var db = DBC.Init;
                string validResult = this.validData(userId.UserFullName, false);
                validResult = this.validData(userId.UserName);
                validResult = this.validData(userId.UserPassword);
                validResult = this.validData(userId.DepartmentID);
                validResult = this.validData(userId.OrganizationID);
                validResult = this.validData(userId.DOB.ToString(), false);
                validResult = this.validData(userId.Phone.ToString(), false);
                validResult = this.validData(userId.Email.ToString(), false);

                if (!string.IsNullOrEmpty(validResult))
                {
                    return new BaseModel<user_identifie>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(4)
                        }
                    };
                }
                string passwordEncode = string.Empty;
                if (!string.IsNullOrEmpty(userId.UserPassword))
                {
                    passwordEncode = SecuritiesHandle.Encode(userId.UserPassword);
                }
                var user = db.user_identifie.Where(ptr => ptr.UserName == userId.UserName).ToList().LastOrDefault();
                if (user != null)
                {
                    if (!string.IsNullOrEmpty(userId.UserPassword))
                    {
                        user.UserPassword = SecuritiesHandle.Encode(userId.UserPassword);
                    }
                    user.CreateDate = DateTime.Now;
                    user.IsLock = false;
                    user.IsDelete = false;
                    user.UserFullName = userId.UserFullName;
                    user.DepartmentID = userId.DepartmentID;
                    user.OrganizationID = userId.OrganizationID;
                    user.DOB = userId.DOB;
                    user.Phone = userId.Phone;
                    user.Email = userId.Email;
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
                        Code = BUSMessageCode(10)
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
