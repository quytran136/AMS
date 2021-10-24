using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
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
        public BaseResponse<UserInformation> GetUserInformation(BaseRequest<GetUserInformation> req)
        {
            try
            {
                if (Access.CheckToken(req.Token))
                {
                    return new BaseResponse<UserInformation>()
                    {
                        Code = MessagesValue.ERROR,
                        Message = "user is not login"
                    };
                }
                UserInfor user = new UserInfor();
                var userinfor = user.GetUserInfor(req.Data.UserID);
                if (userinfor == null)
                {
                    return new BaseResponse<UserInformation>()
                    {
                        Code = MessagesValue.WARNING,
                        Message = "not have user infor",
                    };
                }
                else
                {
                    return new BaseResponse<UserInformation>()
                    {
                        Code = MessagesValue.SUCCESS,
                        Message = MessagesValue.SUCCESS,
                        Response = new UserInformation()
                        {
                            UserFullName = userinfor.UserFullName,
                            UserID = userinfor.ID,
                            Roles = user.GetRole(userinfor.Role)
                        }
                    };
                }
            }
            catch (Exception ex)
            {
                return new BaseResponse<UserInformation>()
                {
                    Code = MessagesValue.ERROR,
                    Message = ex.Message
                };
            }
        }

        [HttpPost]
        public BaseResponse<UserInformation> CreateUserInformation(BaseRequest<CreateUserInformation> req)
        {
            try
            {
                if (Access.CheckToken(req.Token))
                {
                    return new BaseResponse<UserInformation>()
                    {
                        Code = MessagesValue.ERROR,
                        Message = "user is not login"
                    };
                }
                UserInfor user = new UserInfor();
                var userInfo = user.CreateUserInfor(req.Data.UserName, req.Data.UserPassword, req.Data.UserFullName, req.Data.Role);
                return new BaseResponse<UserInformation>()
                {
                    Code = MessagesValue.SUCCESS,
                    Message = MessagesValue.SUCCESS,
                    Response = new UserInformation()
                    {
                        UserFullName = userInfo.UserFullName,
                        UserID = userInfo.ID
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<UserInformation>()
                {
                    Code = MessagesValue.ERROR,
                    Message = ex.Message
                };
            }
        }
    }
}