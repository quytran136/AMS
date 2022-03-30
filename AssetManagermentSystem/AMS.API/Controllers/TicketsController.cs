using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using AMS.COMMON.Constands;
using System.Collections.Generic;
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
                case "TICKET_REQUESTED":
                    BaseModel<Ticket> ticketRequested = new Ticket().GetTicketRequested(req.UserNameRequest);
                    return new BaseResponse<Res_Ticket>().Result(ticketRequested, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Tickets = ticketRequested.Result.Requests,
                        }
                    });
                case "TICKET_REQUESTED_FOR_ACCOUNTANT":
                    BaseModel<Ticket> ticketRequested1 = new Ticket().GetTicketRequested(req.Data.DateFrom, req.Data.DateTo);
                    return new BaseResponse<Res_Ticket>().Result(ticketRequested1, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Invoices = ticketRequested1.Result.Invoices,
                        }
                    });
                case "CREATE_TICKET_SHOPPING":
                    BaseModel<string> tickets = new Ticket().CreateTicket(
                        RequestType.SHOPPING,
                        req.UserNameRequest,
                        req.Data.StoreID,
                        req.Data.Description,
                        req.Data.ProcessID,
                        (ticketID) => { new Asset().CreateAssetShopping(req.Data.InvoiceDetails, ticketID, req.Data.StoreID, req.UserNameRequest); });
                    return new BaseResponse<Res_Ticket>().Result(tickets, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "GET_TICKET_SHOPPING":
                    BaseModel<Ticket> tickets1 = new Ticket().GetTicket(
                                                            RequestType.SHOPPING,
                                                            req.Data.RequestID,
                                                            () => { return new Asset().GetAssetShopping(req.Data.RequestID); });
                    return new BaseResponse<Res_Ticket>().Result(tickets1, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Ticket = tickets1.Result.Request,
                            Assets = tickets1.Result.Assets,
                            VotingHistory = tickets1.Result.VotingHistory
                        }
                    });
                case "APPROVE_TICKET_SHOPPING":
                    BaseModel<Ticket> tickets2 = new Ticket().ApproveTicket(
                        RequestType.SHOPPING,
                        req.UserNameRequest,
                        req.Data.RequestID,
                        () =>
                        {
                            new Asset().ApproveAddAsset(req.Data.RequestID);
                        });
                    return new BaseResponse<Res_Ticket>().Result(tickets2, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "REJECT_TICKET_SHOPPING":
                    BaseModel<Ticket> tickets3 = new Ticket().RejectTicket(
                        RequestType.SHOPPING,
                        req.UserNameRequest,
                        req.Data.RequestID,
                        () =>
                        {
                            new Asset().RejectAddAsset(req.Data.RequestID);
                        });
                    return new BaseResponse<Res_Ticket>().Result(tickets3, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "CREATE_TICKET_ALLOCATION":
                    BaseModel<string> tickets4 = new Ticket().CreateTicket(
                        RequestType.ALLOCATION,
                        req.UserNameRequest,
                        req.Data.StoreID,
                        req.Data.Description,
                        req.Data.ProcessID,
                        (requestID) => { new Asset().CreateAssetAllocation(req.Data.UsageAssetList, requestID); });
                    return new BaseResponse<Res_Ticket>().Result(tickets4, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "GET_TICKET_ALLOCATION":
                    BaseModel<Ticket> tickets5 = new Ticket().GetTicket(
                    RequestType.ALLOCATION,
                    req.Data.RequestID,
                    () =>
                    {
                        return new Asset().GetAssetAllocation(req.Data.RequestID);
                    });
                    return new BaseResponse<Res_Ticket>().Result(tickets5, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                        {
                            Ticket = tickets5.Result.Request,
                            Assets = tickets5.Result.Assets,
                            VotingHistory = tickets5.Result.VotingHistory
                        }
                    });
                case "APPROVE_TICKET_ALLOCATION":
                    BaseModel<Ticket> tickets6 = new Ticket().ApproveTicket(
                        RequestType.ALLOCATION,
                        req.UserNameRequest,
                        req.Data.RequestID,
                        () =>
                        {
                            new Asset().ApproveAssetAllocation(req.Data.RequestID);
                        });
                    return new BaseResponse<Res_Ticket>().Result(tickets6, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "REJECT_TICKET_ALLOCATION":
                    BaseModel<Ticket> tickets7 = new Ticket().RejectTicket(
                        RequestType.ALLOCATION,
                        req.UserNameRequest,
                        req.Data.RequestID,
                        () =>
                        {
                            new Asset().RejectAssetAllocation(req.Data.RequestID);
                        });
                    return new BaseResponse<Res_Ticket>().Result(tickets7, new BaseResponse<Res_Ticket>()
                    {
                        Response = new Res_Ticket()
                    });
                case "PAY_CONFIRM_TICKET_SHOPPING":
                    BaseModel<string> ticket8 = new Ticket().PayConfirm(req.Data.RequestID);
                    return new BaseResponse<Res_Ticket>().Result(ticket8, new BaseResponse<Res_Ticket>()
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