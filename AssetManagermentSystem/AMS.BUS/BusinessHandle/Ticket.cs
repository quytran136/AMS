using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
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


        public BaseModel<string> CreateShoppingTicket(string requestBy, string storeID, string description, string processID, List<asset_detail> details)
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
                    RequestType = "SHOPPING",
                    IsReject = false,
                    StoreID = storeID
                });

                List<asset_detail> listAsset = new List<asset_detail>();
                foreach (asset_detail item in details)
                {
                    listAsset.Add(new asset_detail()
                    {
                        ID = Guid.NewGuid().ToString(),
                        AssetClassifyID = item.AssetClassifyID,
                        CreateDate = DateTime.Now,
                        AssetFullName = item.AssetFullName,
                        Description = item.Description,
                        Price = item.Price,
                        IsDelete = false,
                        IsActive = false,
                        TicketID = id,
                        StoreID = storeID,
                        QuantityDestroyed = 0,
                        QuantityInStock = 0,
                        QuantityOriginalStock = item.QuantityOriginalStock,
                        QuantityUsed = 0,
                        Unit = item.Unit
                    });
                }

                db.asset_detail.AddRange(listAsset);

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

                List<ams_notification> notis = new List<ams_notification>();

                foreach (string userid in users)
                {
                    ams_notification noti = new ams_notification()
                    {
                        ID = Guid.NewGuid().ToString(),
                        CreateDate = DateTime.Now,
                        IsRead = false,
                        NotificationContent = "Yêu cầu mua sắm tài sản được gửi từ " + new UserInformation().GetUserInfor(requestBy).Result.UserFullName,
                        NotificationFor = userid,
                        Action = JsonConvert.SerializeObject(new RequestAction()
                        {
                            Key = "SHOPPING",
                            Value = id,
                            Path = "/Shopping"
                        }),
                    };
                    notis.Add(noti);
                }

                db.ams_notification.AddRange(notis);

                db.SaveChanges();
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

        public BaseModel<Ticket> GetTicket(string requestID, string requestType)
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
                List<asset_detail> assets = db.asset_detail.Where(ptr => ptr.TicketID == requestID)
                    .ToList()
                    .Select(ptr => new asset_detail()
                    {
                        ID = ptr.ID,
                        AssetClassifyID = ptr.AssetClassifyID,
                        QuantityOriginalStock = ptr.QuantityOriginalStock,
                        CreateDate = ptr.CreateDate,
                        AssetFullName = ptr.AssetFullName,
                        Description = ptr.Description,
                        Price = ptr.Price,
                        Unit = ptr.Unit
                    }).ToList();

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Request = request,
                        Assets = assets,
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

        public BaseModel<Ticket> ApproveTicket(string requestID, string requestType)
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
                                })
                                .ToList()
                                .FirstOrDefault();
                List<asset_detail> assets = db.asset_detail
                                            .Where(ptr => ptr.TicketID == requestID)
                                            .ToList()
                                            .Select(ptr => new asset_detail()
                                            {
                                                ID = ptr.ID,
                                                AssetClassifyID = ptr.AssetClassifyID,
                                                QuantityOriginalStock = ptr.QuantityOriginalStock,
                                                CreateDate = ptr.CreateDate,
                                                AssetFullName = ptr.AssetFullName,
                                                Description = ptr.Description,
                                                Price = ptr.Price,
                                                Unit = ptr.Unit
                                            }).ToList();
                ProcessStep processStep = db.ProcessSteps.Where(ptr => ptr.ParentID == request.StepID && ptr.IsDelete == false).ToList().FirstOrDefault();

                if (processStep == null)
                {
                    request.IsApprove = true;
                    request.IsReject = false;
                    foreach (asset_detail item in assets)
                    {
                        var ase = db.asset_detail.Where(ptr => ptr.ID == item.ID).ToList().FirstOrDefault();
                        ase.IsActive = true;
                    }
                    db.SaveChanges();
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

                    foreach (string userid in users)
                    {
                        ams_notification noti = new ams_notification()
                        {
                            ID = Guid.NewGuid().ToString(),
                            CreateDate = DateTime.Now,
                            IsRead = false,
                            NotificationContent = "Yêu cầu mua sắm tài sản được gửi từ " + new UserInformation().GetUserInfor(request.RequestBy).Result.UserFullName,
                            NotificationFor = userid,
                            Action = JsonConvert.SerializeObject(new RequestAction()
                            {
                                Key = request.RequestType,
                                Value = request.ID,
                                Path = "/Shopping"
                            }),
                        };
                        notis.Add(noti);
                    }

                    db.ams_notification.AddRange(notis);
                    db.SaveChanges();
                }

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Request = request,
                        Assets = assets
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

        public BaseModel<Ticket> RejectTicket(string requestID, string requestType)
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
                                                })
                                                .ToList()
                                                .FirstOrDefault();
                List<asset_detail> assets = db.asset_detail
                                            .Where(ptr => ptr.TicketID == requestID)
                                            .ToList()
                                            .Select(ptr => new asset_detail()
                                            {
                                                ID = ptr.ID,
                                                AssetClassifyID = ptr.AssetClassifyID,
                                                QuantityOriginalStock = ptr.QuantityOriginalStock,
                                                CreateDate = ptr.CreateDate,
                                                AssetFullName = ptr.AssetFullName,
                                                Description = ptr.Description,
                                                Price = ptr.Price,
                                                Unit = ptr.Unit
                                            }).ToList();
                ProcessStep processStep = db.ProcessSteps.Where(ptr => ptr.ParentID == request.StepID && ptr.IsDelete == false).ToList().FirstOrDefault();

                request.IsApprove = false;
                request.IsReject = true;
                foreach (asset_detail item in assets)
                {
                    item.IsActive = false;
                    item.IsDelete = true;
                }

                // tạo request
                ams_notification noti = new ams_notification()
                {
                    ID = Guid.NewGuid().ToString(),
                    CreateDate = DateTime.Now,
                    IsRead = false,
                    NotificationContent = "Yêu cầu mua sắm tài sản đã bị từ chối bởi " + new UserInformation().GetUserInfor(request.RequestBy).Result.UserFullName,
                    NotificationFor = request.RequestBy,
                    Action = JsonConvert.SerializeObject(new RequestAction()
                    {
                        Key = request.RequestType,
                        Value = request.ID,
                        Path = "/Shopping"
                    }),
                };

                db.ams_notification.Add(noti);

                db.SaveChanges();

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Request = request,
                        Assets = assets
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
}
