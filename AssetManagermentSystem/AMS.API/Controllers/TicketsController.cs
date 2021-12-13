using AMS.API.ChatHubManager;
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
                    BaseModel<string> tickets = new Ticket().CreateTicketShopping(req.UserNameRequest, req.Data.StoreID, req.Data.Description, req.Data.ProcessID, req.Data.AssetDetails);
                    return new BaseResponse<Res_Ticket>().Result(tickets, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "GET_TICKET_SHOPPING":
                    BaseModel<Ticket> tickets1 = new Ticket().GetTicketShopping(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(tickets1, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Ticket = tickets1.Result.Request,
                            Assets = tickets1.Result.Assets
                        }
                    });
                case "APPROVE_TICKET_SHOPPING":
                    BaseModel<Ticket> tickets2 = new Ticket().ApproveTicketShopping(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(tickets2, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "REJECT_TICKET_SHOPPING":
                    BaseModel<Ticket> tickets3 = new Ticket().RejectTicketShopping(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(tickets3, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "CREATE_TICKET_ALLOCATION":
                    BaseModel<string> tickets4 = new Ticket().CreateTicketAllocation(req.UserNameRequest, req.Data.StoreID, req.Data.Description, req.Data.ProcessID, req.Data.UsageAssetList);
                    return new BaseResponse<Res_Ticket>().Result(tickets4, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "GET_TICKET_ALLOCATION":
                    BaseModel<Ticket> tickets5 = new Ticket().GetTicketAllocation(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(tickets5, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Ticket = tickets5.Result.Request,
                            Assets = tickets5.Result.Assets,
                            UsageList = tickets5.Result.UsageHistories
                        }
                    });
                case "APPROVE_TICKET_ALLOCATION":
                    BaseModel<Ticket> tickets6 = new Ticket().ApproveTicketAllocation(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(tickets6, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "REJECT_TICKET_ALLOCATION":
                    BaseModel<Ticket> tickets7 = new Ticket().RejectTicketAllocation(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(tickets7, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "CREATE_TICKET_RECOVERY":
                    BaseModel<string> recovery = new Ticket().CreateTicketRecovery(req.UserNameRequest, req.Data.StoreID, req.Data.Description, req.Data.ProcessID, req.Data.UsageAssetList);
                    return new BaseResponse<Res_Ticket>().Result(recovery, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "GET_TICKET_RECOVERY":
                    BaseModel<Ticket> recovery1 = new Ticket().GetTicketRecovery(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(recovery1, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Ticket = recovery1.Result.Request,
                            Assets = recovery1.Result.Assets,
                            UsageList = recovery1.Result.UsageHistories
                        }
                    });
                case "APPROVE_TICKET_RECOVERY":
                    BaseModel<Ticket> recovery2 = new Ticket().ApproveTicketRecovery(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(recovery2, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "REJECT_TICKET_RECOVERY":
                    BaseModel<Ticket> recovery3 = new Ticket().RejectTicketRecovery(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(recovery3, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "CREATE_TICKET_LIQUIDATION":
                    BaseModel<string> Liquidation = new Ticket().CreateTicketLiquidation(req.UserNameRequest, req.Data.StoreID, req.Data.Description, req.Data.ProcessID, req.Data.UsageAssetList);
                    return new BaseResponse<Res_Ticket>().Result(Liquidation, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "GET_TICKET_LIQUIDATION":
                    BaseModel<Ticket> Liquidation1 = new Ticket().GetTicketLiquidation(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(Liquidation1, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Ticket = Liquidation1.Result.Request,
                            Assets = Liquidation1.Result.Assets,
                            UsageList = Liquidation1.Result.UsageHistories
                        }
                    });
                case "APPROVE_TICKET_LIQUIDATION":
                    BaseModel<Ticket> Liquidation2 = new Ticket().ApproveTicketLiquidation(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(Liquidation2, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "REJECT_TICKET_LIQUIDATION":
                    BaseModel<Ticket> Liquidation3 = new Ticket().RejectTicketLiquidation(req.Data.RequestID, req.Data.RequestType);
                    return new BaseResponse<Res_Ticket>().Result(Liquidation3, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
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