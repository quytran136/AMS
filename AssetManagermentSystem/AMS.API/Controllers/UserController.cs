using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
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
            try
            {
                // validate token
                if (Access.CheckToken(req.Token, req.Data.UserName))
                {
                    return new BaseResponse<UserInformation>()
                    {
                        Code = MessagesValue.ERROR,
                        Message = "user is not login"
                    };
                }

                switch (req.Key)
                {
                    case "CREATE_USER":
                        try
                        {
                            UserInfor user = new UserInfor();
                            user_identifie user_infor = user.CreateUserInfor(req.Data.UserName,req.Data.UserPassword, req.Data.UserFullName);
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = MessagesValue.SUCCESS,
                                Response = new UserInformation()
                                {
                                    UserFullName = user_infor.UserFullName ?? "",
                                    IsDelete = user_infor.IsDelete ?? true,
                                    IsLock = user_infor.IsLock ?? true,
                                    UserName = user_infor.UserFullName ?? ""
                                }
                            };
                        }
                        catch (Exception ex)
                        {
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = ex.Message,
                            };
                        }
                    case "CHANGE_PASSWORD":
                        try
                        {
                            UserInfor user = new UserInfor();
                            user.ChangePassword(req.Data.UserID, req.Data.UserPassword, req.Data.NewPassword);
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = MessagesValue.SUCCESS,
                                Response = new UserInformation()
                            };
                        }
                        catch (Exception ex)
                        {
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = ex.Message,
                            };
                        }
                    case "LOCK_USER":
                        try
                        {
                            UserInfor user = new UserInfor();
                            user.Lock(req.Data.UserID);
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = MessagesValue.SUCCESS,
                                Response = new UserInformation()
                            };
                        }
                        catch (Exception ex)
                        {
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = ex.Message,
                            };
                        }
                    case "UNLOCK_USER":
                        try
                        {
                            UserInfor user = new UserInfor();
                            user.Lock(req.Data.UserID);
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = MessagesValue.SUCCESS,
                                Response = new UserInformation()
                            };
                        }
                        catch (Exception ex)
                        {
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = ex.Message,
                            };
                        }
                    case "DELETE_USER":
                        try
                        {
                            UserInfor user = new UserInfor();
                            user.Delete(req.Data.UserID);
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = MessagesValue.SUCCESS,
                                Response = new UserInformation()
                            };
                        }
                        catch (Exception ex)
                        {
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = ex.Message,
                            };
                        }
                    case "CHANGE_ROLE":
                        try
                        {
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = MessagesValue.SUCCESS,
                            };
                        }
                        catch (Exception ex)
                        {
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = ex.Message,
                            };
                        }
                    case "GET_INFORMATION":
                        try
                        {
                            UserInfor user = new UserInfor();
                            user_identifie user_infor = user.GetUserInfor(req.Data.UserName);
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = MessagesValue.SUCCESS,
                                Response = new UserInformation()
                                {
                                    UserFullName = user_infor.UserFullName ?? "",
                                    IsDelete = user_infor.IsDelete ?? true,
                                    IsLock = user_infor.IsLock ?? true,
                                    UserName = user_infor.UserFullName ?? ""
                                }
                            };
                        }
                        catch (Exception ex)
                        {
                            return new BaseResponse<UserInformation>()
                            {
                                Code = "201",
                                Message = ex.Message,
                            };
                        }
                    default:
                        return new BaseResponse<UserInformation>()
                        {
                            Code = "404",
                            Message = "Not found function",
                        };
                }
            }
            catch (Exception ex)
            {
                // show log message
                return new BaseResponse<UserInformation>()
                {
                    Code = "500",
                    Message = ex.Message,
                };
            }
        }

    }
}