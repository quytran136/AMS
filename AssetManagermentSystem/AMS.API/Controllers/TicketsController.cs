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
    public class TicketsController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_Ticket> TicketsControl(BaseRequest<Req_Ticket> req)
        {
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_Ticket>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "CREATE_TICKET_SHOPPING":
                    BaseModel<string> tickets = new Ticket().CreateShoppingTicket(req.UserNameRequest, req.Data.StoreID, req.Data.Description, req.Data.ProcessID, req.Data.AssetDetails);
                    return new BaseResponse<Res_Ticket>().Result(tickets, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "GET_TICKET_SHOPPING":
                    BaseModel<Ticket> tickets1 = new Ticket().GetTicket(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(tickets1, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Ticket = tickets1.Result.Request,
                            Assets = tickets1.Result.Assets
                        }
                    });
                case "APPROVE_TICKET_SHOPPING":
                    BaseModel<Ticket> tickets2 = new Ticket().ApproveTicket(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(tickets2, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Ticket = tickets2.Result.Request,
                            Assets = tickets2.Result.Assets
                        }
                    });
                case "REJECT_TICKET_SHOPPING":
                    BaseModel<Ticket> tickets3 = new Ticket().ApproveTicket(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(tickets3, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Ticket = tickets3.Result.Request,
                            Assets = tickets3.Result.Assets
                        }
                    });
                default:
                    return new BaseResponse<Res_Ticket>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}