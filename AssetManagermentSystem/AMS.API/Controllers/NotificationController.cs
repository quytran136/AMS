using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AMS.API.Controllers
{
    public class NotificationController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_Notification> NotificationControl(BaseRequest<string> req)
        {
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_Notification>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "GET_NOTIFICATION":
                    BaseModel<List<ams_notification>> Notifications = new Notification().GetNotificationByUser(req.UserNameRequest);

                    return new BaseResponse<Res_Notification>().Result(Notifications, new BaseResponse<Res_Notification>()
                    {
                        Response = new Res_Notification()
                        {
                            Notifications = Notifications.Result
                        }
                    });
                case "READED_NOTIFICATION":
                    BaseModel<string> Notifications1 = new Notification().ReadNotificationByUser(req.Data);

                    return new BaseResponse<Res_Notification>().Result(Notifications1, new BaseResponse<Res_Notification>()
                    {
                        Response = new Res_Notification()
                    });
                default:
                    return new BaseResponse<Res_Notification>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}