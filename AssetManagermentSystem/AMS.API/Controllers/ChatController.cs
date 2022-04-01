using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AMS.API.Controllers
{
    public class ChatController : ApiController
    {
        [HttpPost]

        public BaseResponse<Res_Chat> ChatControl(BaseRequest<Req_Chat> req)
        {
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_Chat>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "GET_MESSAGE":
                    BaseModel<Chat> ch = new Chat().GetMessage(req.Data.To, req.Data.From, req.Data.Take);
                    return new BaseResponse<Res_Chat>().Result(ch, new BaseResponse<Res_Chat>()
                    {
                        Response = new Res_Chat()
                        {
                            ChatContent = ch.Result
                        }
                    });
                default:
                    return new BaseResponse<Res_Chat>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}