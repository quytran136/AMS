using AMS.API.Models.RequestModel;
using AMS.API.Models.RequestModel.Access;
using AMS.API.Models.ResponseModel;
using AMS.API.Models.ResponseModel.Access;
using AMS.BUS.BusinessHandle;
using AMS.COMMON.Constands;
using AMS.COMMON.Encryption;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AMS.API.Controllers
{
    public class AccessController : ApiController
    {
        [HttpPost]
        public BaseResponse<Token> Login(BaseRequest<GetToken> req)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new BaseResponse<Token>()
                    {
                        Code = MessagesValue.WARNING,
                        Message = "User or password is not available"
                    };
                }

                Access access = new Access();
                string token = access.CheckLogin(req.Data.UserName, req.Data.UserPassword);
                if (!string.IsNullOrEmpty(token))
                {
                    return new BaseResponse<Token>()
                    {
                        Code = MessagesValue.SUCCESS,
                        Message = "",
                        Response = new Token()
                        {
                            TokenString = token
                        }
                    };
                }
                else
                {
                    return new BaseResponse<Token>()
                    {
                        Code = MessagesValue.WARNING,
                        Message = "User or password is not wrong or not available"
                    };
                }
            }
            catch (Exception ex)
            {
                return new BaseResponse<Token>()
                {
                    Code = MessagesValue.ERROR,
                    Message = ex.Message
                };
            }


        }
    }
}