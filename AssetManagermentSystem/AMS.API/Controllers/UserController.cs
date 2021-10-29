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
        public BaseResponse<UserInformation> UserInformation(BaseRequest<Information> req)
        {
            // validate token
            if (new Access().CheckToken(req.Token, req.Data.UserName).Result)
            {
                return new BaseResponse<UserInformation>()
                {
                    Code = "201",
                    Message = MessagesValue.WARNING
                };
            }

            switch (req.Key)
            {
                case "CREATE_USER":
                    UserInfor user = new UserInfor();
                    BaseModel<user_identifie> user_info1 = user.CreateUserInfor(req.Data.UserName, req.Data.UserPassword, req.Data.UserFullName);
                    if (!string.IsNullOrEmpty(user_info1.Exception.Code))
                    {
                        return new BaseResponse<UserInformation>()
                        {
                            Code = user_info1.Exception.Code,
                            Message = user_info1.Exception.Message
                        };
                    }
                    return new BaseResponse<UserInformation>()
                    {
                        Code = "201",
                        Message = MessagesValue.SUCCESS,
                        Response = new UserInformation()
                        {
                            UserFullName = user_info1.Result.UserFullName ?? "",
                            IsDelete = user_info1.Result.IsDelete ?? true,
                            IsLock = user_info1.Result.IsLock ?? true,
                            UserName = user_info1.Result.UserFullName ?? ""
                        }
                    };
                case "CHANGE_PASSWORD":
                    UserInfor user1 = new UserInfor();
                    BaseModel<bool> user_info2 = user1.ChangePassword(req.Data.UserID, req.Data.UserPassword, req.Data.NewPassword);
                    if (!string.IsNullOrEmpty(user_info2.Exception.Code))
                    {
                        return new BaseResponse<UserInformation>()
                        {
                            Code = user_info2.Exception.Code,
                            Message = user_info2.Exception.Message
                        };
                    }
                    return new BaseResponse<UserInformation>()
                    {
                        Code = "201",
                        Message = MessagesValue.SUCCESS
                    };
                case "LOCK_USER":
                    UserInfor user2 = new UserInfor();
                    BaseModel<bool> user_info3 = user2.Lock(req.Data.UserID);
                    if (!string.IsNullOrEmpty(user_info3.Exception.Code))
                    {
                        return new BaseResponse<UserInformation>()
                        {
                            Code = user_info3.Exception.Code,
                            Message = user_info3.Exception.Message
                        };
                    }
                    return new BaseResponse<UserInformation>()
                    {
                        Code = "201",
                        Message = MessagesValue.SUCCESS
                    };
                case "UNLOCK_USER":
                    UserInfor user4 = new UserInfor();
                    BaseModel<bool> user_info4 = user4.Lock(req.Data.UserID);
                    if (!string.IsNullOrEmpty(user_info4.Exception.Code))
                    {
                        return new BaseResponse<UserInformation>()
                        {
                            Code = user_info4.Exception.Code,
                            Message = user_info4.Exception.Message
                        };
                    }
                    return new BaseResponse<UserInformation>()
                    {
                        Code = "201",
                        Message = MessagesValue.SUCCESS
                    };
                case "DELETE_USER":
                    UserInfor user5 = new UserInfor();
                    BaseModel<bool> user_info5 = user5.Delete(req.Data.UserID);
                    if (!string.IsNullOrEmpty(user_info5.Exception.Code))
                    {
                        return new BaseResponse<UserInformation>()
                        {
                            Code = user_info5.Exception.Code,
                            Message = user_info5.Exception.Message
                        };
                    }
                    return new BaseResponse<UserInformation>()
                    {
                        Code = "201",
                        Message = MessagesValue.SUCCESS
                    };
                case "CHANGE_ROLE":
                    return new BaseResponse<UserInformation>()
                    {
                        Code = "201",
                        Message = MessagesValue.SUCCESS,
                    };
                case "GET_INFORMATION":
                    UserInfor user6 = new UserInfor();
                    BaseModel<user_identifie> user_info6 = user6.GetUserInfor(req.Data.UserName);
                    if (!string.IsNullOrEmpty(user_info6.Exception.Code))
                    {
                        return new BaseResponse<UserInformation>()
                        {
                            Code = user_info6.Exception.Code,
                            Message = user_info6.Exception.Message
                        };
                    }
                    return new BaseResponse<UserInformation>()
                    {
                        Code = "201",
                        Message = MessagesValue.SUCCESS,
                        Response = new UserInformation()
                        {
                            UserFullName = user_info6.Result.UserFullName ?? "",
                            IsDelete = user_info6.Result.IsDelete ?? true,
                            IsLock = user_info6.Result.IsLock ?? true,
                            UserName = user_info6.Result.UserFullName ?? ""
                        }
                    };
                default:
                    return new BaseResponse<UserInformation>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }

    }
}