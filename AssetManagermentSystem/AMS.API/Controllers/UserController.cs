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
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.Data.UserName);
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
                    BaseModel<user_identifie> user_info1 = user.CreateUserInfor(req.Data.UserName, req.Data.UserPassword, req.Data.UserFullName);
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
                            UserName = user_info1.Result.UserFullName ?? ""
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
                    return new BaseResponse<Res_UserInformation>();
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
                    return new BaseResponse<Res_UserInformation>();
                case "UNLOCK_USER":
                    UserInformation user4 = new UserInformation();
                    BaseModel<bool> user_info4 = user4.Lock(req.Data.UserID);
                    if (!string.IsNullOrEmpty(user_info4.Exception.Code))
                    {
                        return new BaseResponse<Res_UserInformation>()
                        {
                            Code = user_info4.Exception.Code,
                            Message = user_info4.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_UserInformation>();
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
                    return new BaseResponse<Res_UserInformation>();
                case "CHANGE_ROLE":
                    return new BaseResponse<Res_UserInformation>();
                case "GET_INFORMATION":
                    UserInformation user6 = new UserInformation();
                    BaseModel<user_identifie> user_info6 = user6.GetUserInfor(req.Data.UserName);
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
                            ID = user_info6.Result.ID ?? ""
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