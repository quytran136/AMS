using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using AMS.COMMON.Constands;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusinessHandle
{
    public class Ticket : IBaseHandle
    {
        public request_ticket_history Request { get; set; }
        public invoice Invoice { get; set; }
        public List<invoice> Invoices { get; set; }
        public List<request_ticket_history> Requests { get; set; }
        public List<asset_detail> Assets { get; set; }
        public List<usage_history> UsageHistories { get; set; }
        public List<VotingHistory> VotingHistory { get; set; }

        private void saveVotingHistory(string tiketID, string actor, string note, string action)
        {
            try
            {
                var db = DBC.Init;
                db.voting_history.Add(new voting_history()
                {
                    ID = Guid.NewGuid().ToString(),
                    Action = action,
                    Actor = actor,
                    CreateDate = DateTime.Now,
                    Description = note,
                    TicketID = tiketID,
                });
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private List<VotingHistory> getVotingHistory(string ticketID)
        {
            try
            {
                var db = DBC.Init;
                List<VotingHistory> voting = (from a in db.voting_history
                                              join b in db.user_identifie on a.Actor equals b.ID
                                              where a.TicketID == ticketID
                                              orderby a.CreateDate descending
                                              select new VotingHistory()
                                              {
                                                  CreateDate = a.CreateDate,
                                                  Creator = b.UserFullName,
                                                  Message = a.Description
                                              }).ToList();
                return voting;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BaseModel<Ticket> GetTicketRequested(string requestor)
        {
            try
            {
                var db = DBC.Init;
                var user = new UserInformation().GetUserInfor(requestor);
                List<request_ticket_history> requests = db.request_ticket_history
                                                .Where(ptr => ptr.RequestBy == requestor)
                                                .OrderByDescending(ptr => ptr.CreateDate)
                                                .ToList()
                                                .Select(ptr => new request_ticket_history()
                                                {
                                                    ID = ptr.ID,
                                                    RequestBy = ptr.RequestBy,
                                                    StepID = ptr.StepID,
                                                    IsApprove = ptr.IsApprove,
                                                    CreateDate = ptr.CreateDate,
                                                    Description = ptr.Description,
                                                    IsReject = ptr.IsReject,
                                                    ProcessID = ptr.ProcessID,
                                                    RequestType = ptr.RequestType,
                                                    StoreID = ptr.StoreID
                                                }).
                                                ToList();

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Requests = requests
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<Ticket>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<Ticket> GetTicketRequested(DateTime? dateFrom, DateTime? dateTo)
        {
            try
            {
                var db = DBC.Init;
                List<invoice> invoice = (from req in db.request_ticket_history
                                         join inv in db.invoices on req.ID equals inv.TicketID
                                         where req.CreateDate >= dateFrom
                                         && req.CreateDate <= dateTo
                                         && req.RequestType == RequestType.SHOPPING
                                         && req.IsApprove == true
                                         orderby inv.IsPay descending
                                         orderby req.CreateDate descending
                                         select new
                                         {
                                             request_ticket = req,
                                             invoice = inv
                                         })
                                                        .ToList().Select(ptr => new invoice()
                                                        {
                                                            request_ticket_history = new request_ticket_history()
                                                            {
                                                                ID = ptr.request_ticket.ID,
                                                                RequestBy = ptr.request_ticket.RequestBy,
                                                                StepID = ptr.request_ticket.StepID,
                                                                IsApprove = ptr.request_ticket.IsApprove,
                                                                CreateDate = ptr.request_ticket.CreateDate,
                                                                Description = ptr.request_ticket.Description,
                                                                IsReject = ptr.request_ticket.IsReject,
                                                                ProcessID = ptr.request_ticket.ProcessID,
                                                                RequestType = ptr.request_ticket.RequestType,
                                                                StoreID = ptr.request_ticket.StoreID
                                                            },
                                                            CreateDate = ptr.invoice.CreateDate,
                                                            CreatorID = ptr.invoice.CreatorID,
                                                            ID = ptr.invoice.ID,
                                                            IsPay = ptr.invoice.IsPay,
                                                            IsReject = ptr.invoice.IsReject,
                                                        }).
                                                        ToList();

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Invoices = invoice
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<Ticket>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }
        #region Yêu cầu
        // yêu cầu
        public BaseModel<string> CreateTicket(
            string requestType,
            string requestBy,
            string storeID,
            string description,
            string processID,
            Action<string> func)
        {
            try
            {
                var db = DBC.Init;
                Process process = db.Processes.Where(ptr => ptr.ID == processID && ptr.IsDelete == false).ToList().FirstOrDefault();
                string id = Guid.NewGuid().ToString();
                string stepID = process.ProcessSteps.Where(ptr => string.IsNullOrEmpty(ptr.ParentID)).ToList().FirstOrDefault().ID;
                db.request_ticket_history.Add(new request_ticket_history()
                {
                    RequestBy = requestBy,
                    CreateDate = DateTime.Now,
                    ProcessID = process.ID,
                    Description = description,
                    ID = id,
                    IsApprove = false,
                    StepID = stepID,
                    RequestType = requestType,
                    IsReject = false,
                    StoreID = storeID
                });

                List<ams_notification> notifications = new List<ams_notification>();

                string[] Approvers = process.ProcessSteps.Where(ptr => string.IsNullOrEmpty(ptr.ParentID)).ToList().FirstOrDefault().Approvers.Split('|');

                List<string> users = new List<string>();

                if (Approvers[0].Length == 0)
                {
                    user_identifie user = new UserInformation().GetUserInfor(requestBy).Result;
                    Organizational org = new OrganizationalChart().GetChart(user.DepartmentID).Result.Node;
                    foreach (user_identifie element in new UserInformation().UsersByOrganizationID(org.ID).Result)
                    {
                        users.Add(element.ID);
                    }
                }
                else if (Approvers.Where(ptr => string.IsNullOrEmpty(ptr) == true).Count() > 0 && Approvers[0].Contains("DEP") == false)
                {
                    foreach (string item in Approvers)
                    {
                        users.Add(item);
                    }
                }
                if (users.Count == 0)
                {
                    foreach (string item in Approvers)
                    {
                        if (item.Contains("DEP"))
                        {
                            users = new List<string>();
                            string DepID = item.Split('/')[1];
                            Organizational org = new OrganizationalChart().GetChart(DepID).Result.Node;
                            foreach (user_identifie user in new UserInformation().UsersByOrganizationID(org.ID).Result)
                            {
                                users.Add(user.ID);
                            }
                        }
                        else if (item.Contains("ORG"))
                        {
                            users = new List<string>();
                            string orgID = item.Split('/')[1];
                            foreach (user_identifie user in new UserInformation().UsersByOrganizationID(orgID).Result)
                            {
                                users.Add(user.ID);
                            }
                        }
                    }
                }

                Notification notification = new Notification();
                notification.SentNotificationByUser(users, id, requestBy, requestType, RequestType.GetMessageByName(requestType).Message, stepid: stepID);
                db.SaveChanges();
                func(id);
                user_identifie user1 = new UserInformation().GetUserInfor(requestBy).Result;
                saveVotingHistory(id, user1.ID, "Tạo yêu cầu", requestType);
                return new BaseModel<string>();
            }
            catch (Exception ex)
            {
                return new BaseModel<string>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<Ticket> GetTicket(
            string requestType,
            string requestID,
            Func<List<asset_detail>> func)
        {
            try
            {
                var db = DBC.Init;
                request_ticket_history request = db.request_ticket_history
                                                .Where(ptr => ptr.ID == requestID && ptr.RequestType == requestType)
                                                .ToList()
                                                .Select(ptr => new request_ticket_history()
                                                {
                                                    ID = ptr.ID,
                                                    RequestBy = ptr.RequestBy,
                                                    StepID = ptr.StepID,
                                                    IsApprove = ptr.IsApprove,
                                                    CreateDate = ptr.CreateDate,
                                                    Description = ptr.Description,
                                                    IsReject = ptr.IsReject,
                                                    ProcessID = ptr.ProcessID,
                                                    RequestType = ptr.RequestType,
                                                    StoreID = ptr.StoreID,
                                                }).
                                                ToList()
                                                .FirstOrDefault();
                List<asset_detail> assets = func();

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Request = request,
                        Assets = assets,
                        VotingHistory = getVotingHistory(requestID),
                        Invoice = db.invoices.Where(ptr => ptr.TicketID == request.ID).ToList().Select(ptr => new invoice()
                        {
                            IsPay = ptr.IsPay
                        }).ToList().FirstOrDefault(),
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<Ticket>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<Ticket> ApproveTicket(
            string requestType,
            string requestBy,
            string requestID,
            Action func)
        {
            try
            {
                var db = DBC.Init;
                request_ticket_history request = db.request_ticket_history
                                .Where(ptr => ptr.ID == requestID && ptr.RequestType == requestType && ptr.IsApprove == false && ptr.IsReject == false)
                                .ToList()
                                .FirstOrDefault();

                ProcessStep processStep = db.ProcessSteps.Where(ptr => ptr.ParentID == request.StepID && ptr.IsDelete == false).ToList().FirstOrDefault();

                if (processStep == null)
                {
                    request.StepID = "-";
                    request.IsApprove = true;
                    request.IsReject = false;
                    func();
                    user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;
                    Notification notification = new Notification();
                    notification.SentNotificationByUser(new List<string>()
                                                        {
                                                            user.ID
                                                        },
                                                        request.ID,
                                                        requestBy,
                                                        requestType,
                                                        string.Format("{0} {1}", RequestType.GetMessageByName(requestType).Message, "chấp thuận"),
                                                        "");
                    db.SaveChanges();
                    user_identifie user1 = new UserInformation().GetUserInfor(requestBy).Result;
                    saveVotingHistory(requestID, user1.ID, "Phê duyệt", requestType);
                }
                else
                {
                    request_ticket_history req = db.request_ticket_history.Where(ptr => ptr.ID == request.ID).ToList().FirstOrDefault();
                    req.StepID = processStep.ID;
                    db.SaveChanges();
                    List<ams_notification> notis = new List<ams_notification>();
                    string[] Approvers = processStep.Approvers.Split('|');
                    List<string> users = new List<string>();

                    if (Approvers[0].Length == 0)
                    {
                        user_identifie user = new UserInformation().GetUserInforByID(request.RequestBy).Result;
                        Organizational org = new OrganizationalChart().GetChart(user.DepartmentID).Result.Node;
                        foreach (user_identifie element in new UserInformation().UsersByOrganizationID(org.ID).Result)
                        {
                            users.Add(element.ID);
                        }
                    }
                    else if (Approvers.Where(ptr => string.IsNullOrEmpty(ptr) == true).Count() > 0 && Approvers[0].Contains("DEP") == false)
                    {
                        foreach (string item in Approvers)
                        {
                            users.Add(item);
                        }
                    }
                    if (users.Count == 0)
                    {
                        foreach (string item in Approvers)
                        {
                            if (item.Contains("DEP"))
                            {
                                users = new List<string>();
                                string DepID = item.Split('/')[1];
                                Organizational org = new OrganizationalChart().GetChart(DepID).Result.Node;
                                foreach (user_identifie user in new UserInformation().UsersByOrganizationID(org.ID).Result)
                                {
                                    users.Add(user.ID);
                                }
                            }
                            else if (item.Contains("ORG"))
                            {
                                users = new List<string>();
                                string orgID = item.Split('/')[1];
                                foreach (user_identifie user in new UserInformation().UsersByOrganizationID(orgID).Result)
                                {
                                    users.Add(user.ID);
                                }
                            }
                        }
                    }

                    Notification notification = new Notification();
                    notification.SentNotificationByUser(
                        users,
                        request.ID,
                        requestBy,
                        requestType,
                        String.Format("{0} {1}", "Phê duyệt", RequestType.GetMessageByName(requestType).Message),
                        stepid: req.StepID
                        );
                    db.SaveChanges();
                    user_identifie user1 = new UserInformation().GetUserInfor(requestBy).Result;
                    saveVotingHistory(requestID, user1.ID, "Phê duyệt", requestType);
                }

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<Ticket>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<Ticket> RejectTicket(
            string requestType,
            string requestBy,
            string requestID,
            Action func)
        {
            try
            {
                var db = DBC.Init;
                request_ticket_history request = db.request_ticket_history
                                                .Where(ptr => ptr.ID == requestID && ptr.RequestType == requestType && ptr.IsApprove == false && ptr.IsReject == false)
                                                .ToList()
                                                .FirstOrDefault();
                ProcessStep processStep = db.ProcessSteps.Where(ptr => ptr.ParentID == request.StepID && ptr.IsDelete == false).ToList().FirstOrDefault();
                request.StepID = "-";
                request.IsApprove = false;
                request.IsReject = true;

                db.SaveChanges();
                func();

                user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;

                Notification notification = new Notification();
                notification.SentNotificationByUser(new List<string>() { user.ID },
                    request.ID,
                    requestBy,
                    requestType,
                    String.Format("{0} {1}", "Từ chối", RequestType.GetMessageByName(requestType).Message),
                    "");

                user_identifie user1 = new UserInformation().GetUserInfor(requestBy).Result;
                saveVotingHistory(requestID, user1.ID, "Từ chối", requestType);
                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<Ticket>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        #endregion

        #region Thanh toán

        public BaseModel<string> PayConfirm(string ticketId)
        {
            try
            {
                var db = DBC.Init;
                var invoice = db.invoices.FirstOrDefault(ptr => ptr.IsPay != true && ptr.TicketID == ticketId);
                if (invoice == null)
                {
                    return new BaseModel<string>()
                    {
                        Result = String.Empty
                    };
                }

                invoice.IsPay = true;
                db.SaveChanges();
                return new BaseModel<string>()
                {
                    Result = "Success"
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<string>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        #endregion
        public string BUSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.BUS_EX,
                FunctionCode.API,
                FunctionCode.TICKET,
                id);
        }

        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.TICKET,
                id);
        }
    }

    public class RequestAction
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string Path { get; set; }
        public bool EndOfThread { get; set; }
        public string StepID { get; set; }
    }

    public class VotingHistory
    {
        public DateTime? CreateDate { get; set; }
        public string Creator { get; set; }
        public string Message { get; set; }
    }
}
