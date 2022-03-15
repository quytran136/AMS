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
                    TicketID = tiketID
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
                db.request_ticket_history.Add(new request_ticket_history()
                {
                    RequestBy = requestBy,
                    CreateDate = DateTime.Now,
                    ProcessID = process.ID,
                    Description = description,
                    ID = id,
                    IsApprove = false,
                    StepID = process.ProcessSteps.Where(ptr => string.IsNullOrEmpty(ptr.ParentID)).ToList().FirstOrDefault().ID,
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
                else if (Approvers[1] == "" && Approvers[0].Contains("DEP") == false)
                {
                    users.Add(Approvers[0]);
                }

                foreach (string item in Approvers)
                {
                    if (item.Contains("DEP"))
                    {
                        string DepID = item.Split('/')[1];
                        Organizational org = new OrganizationalChart().GetChart(DepID).Result.Node;
                        foreach (user_identifie user in new UserInformation().UsersByOrganizationID(org.ID).Result)
                        {
                            users.Add(user.ID);
                        }
                    }
                    else if (item.Contains("ORG"))
                    {
                        string orgID = item.Split('/')[1];
                        foreach (user_identifie user in new UserInformation().UsersByOrganizationID(orgID).Result)
                        {
                            users.Add(user.ID);
                        }
                    }
                }

                Notification notification = new Notification();
                notification.SentNotificationByUser(users, id, requestBy, requestType, RequestType.GetMessageByName(requestType).Message);
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
                                                .Where(ptr => ptr.ID == requestID && ptr.RequestType == requestType && ptr.IsApprove == false && ptr.IsReject == false)
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
                                                ToList()
                                                .FirstOrDefault();
                List<asset_detail> assets = func();


                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Request = request,
                        Assets = assets,
                        VotingHistory = getVotingHistory(requestID)
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
                                                        string.Format("{0} {1}", RequestType.GetMessageByName(requestType).Message, "chấp thuận"));
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
                    else if (Approvers[1] == "" && Approvers[0].Contains("DEP") == false)
                    {
                        users.Add(Approvers[0]);
                    }

                    foreach (string item in Approvers)
                    {
                        if (item.Contains("DEP"))
                        {
                            string DepID = item.Split('/')[1];
                            Organizational org = new OrganizationalChart().GetChart(DepID).Result.Node;
                            foreach (user_identifie user in new UserInformation().UsersByOrganizationID(org.ID).Result)
                            {
                                users = new List<string>();
                                users.Add(user.ID);
                            }
                        }
                        else if (item.Contains("ORG"))
                        {
                            string orgID = item.Split('/')[1];
                            foreach (user_identifie user in new UserInformation().UsersByOrganizationID(orgID).Result)
                            {
                                users = new List<string>();
                                users.Add(user.ID);
                            }
                        }
                    }

                    //foreach (string userid in users)
                    //{
                    //    ams_notification noti = new ams_notification()
                    //    {
                    //        ID = Guid.NewGuid().ToString(),
                    //        CreateDate = DateTime.Now,
                    //        IsRead = false,
                    //        NotificationContent = "Yêu cầu mua sắm tài sản được gửi từ " + new UserInformation().GetUserInfor(request.RequestBy).Result.UserFullName,
                    //        NotificationFor = userid,
                    //        Action = JsonConvert.SerializeObject(new RequestAction()
                    //        {
                    //            Key = request.RequestType,
                    //            Value = request.ID,
                    //            Path = "/Shopping"
                    //        }),
                    //    };
                    //    notis.Add(noti);
                    //}

                    //db.ams_notification.AddRange(notis);
                    Notification notification = new Notification();
                    notification.SentNotificationByUser(users, request.ID, requestBy, requestType, RequestType.GetMessageByName(requestType).Message);
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

                request.IsApprove = false;
                request.IsReject = true;

                func();

                user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;

                Notification notification = new Notification();
                notification.SentNotificationByUser(new List<string>() { user.ID }, request.ID, requestBy, requestType, RequestType.GetMessageByName(requestType).Message);

                db.SaveChanges();
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
    }

    public class VotingHistory
    {
        public DateTime? CreateDate { get; set; }
        public string Creator { get; set; }
        public string Message { get; set; }
    }
}
