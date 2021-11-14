using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON.Constands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AMS.API.Controllers
{
    public class UserController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_UserInformation> UserInformation(BaseRequest<Req_UserInformation> req)
        {
            // validate token
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.Data.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_UserInformation>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "CREATE_USER":
                    UserInformation user = new UserInformation();
                    BaseModel<user_identifie> user_info1 = user.CreateUserInfor(new user_identifie
                    {
                        UserFullName = req.Data.UserFullName,
                        UserName = req.Data.UserLoginName,
                        UserPassword = req.Data.UserPassword,
                        DepartmentID = req.Data.DepartmentID,
                        OrganizationID = req.Data.OrganizationID,
                        Phone = req.Data.Phone,
                        Email = req.Data.Email,
                        DOB = req.Data.DOB,
                    });
                    if (!string.IsNullOrEmpty(user_info1.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info1.Exception.Code,
                            Message = user_info1.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_UserInformation>()
                    {
                        Response = new Res_UserInformation()
                        {
                            UserFullName = user_info1.Result.UserFullName ?? "",
                            IsDelete = user_info1.Result.IsDelete ?? true,
                            IsLock = user_info1.Result.IsLock ?? true,
                            UserName = user_info1.Result.UserFullName ?? "",
                            Phone = user_info1.Result.Phone ?? "",
                            Email = user_info1.Result.Email ?? "",
                            DOB = user_info1.Result.DOB ?? DateTime.Now,
                        }
                    };
                case "UPDATE_USER":
                    UserInformation user9 = new UserInformation();
                    BaseModel<user_identifie> user_info9 = user9.UpdateUserInfor(new user_identifie
                    {
                        UserFullName = req.Data.UserFullName,
                        UserName = req.Data.UserLoginName,
                        UserPassword = req.Data.UserPassword,
                        DepartmentID = req.Data.DepartmentID,
                        OrganizationID = req.Data.OrganizationID,
                        Phone = req.Data.Phone,
                        Email = req.Data.Email,
                        DOB = req.Data.DOB,
                    });
                    if (!string.IsNullOrEmpty(user_info9.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info9.Exception.Code,
                            Message = user_info9.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_UserInformation>()
                    {
                        Response = new Res_UserInformation()
                        {
                            UserFullName = user_info9.Result.UserFullName ?? "",
                            IsDelete = user_info9.Result.IsDelete ?? true,
                            IsLock = user_info9.Result.IsLock ?? true,
                            UserName = user_info9.Result.UserFullName ?? "",
                            Phone = user_info9.Result.Phone ?? "",
                            Email = user_info9.Result.Email ?? "",
                            DOB = user_info9.Result.DOB ?? DateTime.Now,
                        }
                    };
                case "CHANGE_PASSWORD":
                    UserInformation user1 = new UserInformation();
                    BaseModel<bool> user_info2 = user1.ChangePassword(req.Data.UserID, req.Data.UserPassword, req.Data.NewPassword);
                    if (!string.IsNullOrEmpty(user_info2.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info2.Exception.Code,
                            Message = user_info2.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_UserInformation>()
                    {
                        Response = new Res_UserInformation()
                        {
                            ID = req.Data.UserID
                        }
                    };
                case "LOCK_USER":
                    UserInformation user2 = new UserInformation();
                    BaseModel<bool> user_info3 = user2.Lock(req.Data.UserID);
                    if (!string.IsNullOrEmpty(user_info3.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info3.Exception.Code,
                            Message = user_info3.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_UserInformation>()
                    {
                        Response = new Res_UserInformation()
                        {
                            IsLock = true
                        }
                    };
                case "UNLOCK_USER":
                    UserInformation user4 = new UserInformation();
                    BaseModel<bool> user_info4 = user4.Unlock(req.Data.UserID);
                    if (!string.IsNullOrEmpty(user_info4.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info4.Exception.Code,
                            Message = user_info4.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_UserInformation>()
                    {
                        Response = new Res_UserInformation()
                        {
                            IsLock = false
                        }
                    };
                case "DELETE_USER":
                    UserInformation user5 = new UserInformation();
                    BaseModel<bool> user_info5 = user5.Delete(req.Data.UserID);
                    if (!string.IsNullOrEmpty(user_info5.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info5.Exception.Code,
                            Message = user_info5.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_UserInformation>()
                    {
                        Response = new Res_UserInformation()
                        {
                            IsDelete = true
                        }
                    };
                case "CHANGE_ROLE":
                    return new BaseResponse<Res_UserInformation>();
                case "USER_INFORMATION":
                    UserInformation user6 = new UserInformation();
                    BaseModel<user_identifie> user_info6 = user6.GetUserInfor(req.Data.UserLoginName);
                    if (!string.IsNullOrEmpty(user_info6.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info6.Exception.Code,
                            Message = user_info6.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_UserInformation>()
                    {
                        Response = new Res_UserInformation()
                        {
                            UserFullName = user_info6.Result.UserFullName ?? "",
                            IsDelete = user_info6.Result.IsDelete ?? true,
                            IsLock = user_info6.Result.IsLock ?? true,
                            UserName = user_info6.Result.UserName ?? "",
                            ID = user_info6.Result.ID ?? "",
                            Phone = user_info6.Result.Phone ?? "",
                            Email = user_info6.Result.Email ?? "",
                            DOB = user_info6.Result.DOB ?? DateTime.Now,
                            DepartmentID = user_info6.Result.DepartmentID,
                            OrganizationID = user_info6.Result.OrganizationID
                        }
                    };
                case "USERS":
                    UserInformation user7 = new UserInformation();
                    BaseModel<List<UserInformation>> user_info7 = user7.Users(string.IsNullOrEmpty(req.Data.SearchContent) ? "" : req.Data.SearchContent );
                    if (!string.IsNullOrEmpty(user_info7.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info7.Exception.Code,
                            Message = user_info7.Exception.Message
                        };
                    }

                    List<Res_UserInformation> users = new List<Res_UserInformation>();

                    foreach (var item in user_info7.Result)
                    {
                        users.Add(new Res_UserInformation()
                        {
                            UserFullName = item.User_Identifie.UserFullName ?? "",
                            IsDelete = item.User_Identifie.IsDelete ?? true,
                            IsLock = item.User_Identifie.IsLock ?? true,
                            UserName = item.User_Identifie.UserName ?? "",
                            ID = item.User_Identifie.ID ?? "",
                            Phone = item.User_Identifie.Phone ?? "",
                            Email = item.User_Identifie.Email ?? "",
                            DOB = item.User_Identifie.DOB ?? DateTime.Now,
                            DepartmentName = item.DepartmentName ?? "",
                            OrganizationName = item.OrganizationName ?? ""
                        });
                    }

                    return new BaseResponse<Res_UserInformation>()
                    {
                        Response = new Res_UserInformation()
                        {
                            Users = users
                        }
                    };
                case "USERS_BY_DEPARTMENT":
                    UserInformation user8 = new UserInformation();
                    BaseModel<List<user_identifie>> user_info8 = user8.UsersByDepartmentID(req.Data.DepartmentID);
                    if (!string.IsNullOrEmpty(user_info8.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info8.Exception.Code,
                            Message = user_info8.Exception.Message
                        };
                    }

                    List<Res_UserInformation> users1 = new List<Res_UserInformation>();

                    foreach (var item in user_info8.Result)
                    {
                        users1.Add(new Res_UserInformation()
                        {
                            UserFullName = item.UserFullName ?? "",
                            IsDelete = item.IsDelete ?? true,
                            IsLock = item.IsLock ?? true,
                            UserName = item.UserName ?? "",
                            ID = item.ID ?? ""
                        });
                    }

                    return new BaseResponse<Res_UserInformation>()
                    {
                        Response = new Res_UserInformation()
                        {
                            Users = users1
                        }
                    };
                default:
                    return new BaseResponse<Res_UserInformation>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}