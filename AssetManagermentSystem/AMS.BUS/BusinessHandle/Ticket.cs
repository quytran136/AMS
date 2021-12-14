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
        public List<usage_history> UsageHistories { get; set; }

        // yêu cầu mua sắm
        public BaseModel<string> CreateTicketShopping(string requestBy, string storeID, string description, string processID, List<asset_detail> details)
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

        public BaseModel<Ticket> GetTicketShopping(string requestID, string requestType)
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

        public BaseModel<Ticket> ApproveTicketShopping(string requestID, string requestType)
        {
            try
            {
                var db = DBC.Init;
                request_ticket_history request = db.request_ticket_history
                                .Where(ptr => ptr.ID == requestID && ptr.RequestType == requestType && ptr.IsApprove == false && ptr.IsReject == false)
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
                        ase.QuantityInStock = item.QuantityOriginalStock;
                    }
                    user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;
                    ams_notification noti = new ams_notification()
                    {
                        ID = Guid.NewGuid().ToString(),
                        CreateDate = DateTime.Now,
                        IsRead = false,
                        NotificationContent = "Yêu cầu mua sắm tài sản đã được phê duyệt",
                        NotificationFor = user.ID,
                        Action = JsonConvert.SerializeObject(new RequestAction()
                        {
                            Key = "REJECT",
                            Value = request.ID,
                            Path = "/Shopping"
                        }),
                    };

                    db.ams_notification.Add(noti);
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
                    else if (Approvers[1] == "")
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

        public BaseModel<Ticket> RejectTicketShopping(string requestID, string requestType)
        {
            try
            {
                var db = DBC.Init;
                request_ticket_history request = db.request_ticket_history
                                                .Where(ptr => ptr.ID == requestID && ptr.RequestType == requestType && ptr.IsApprove == false && ptr.IsReject == false)
                                                .ToList()
                                                .FirstOrDefault();
                List<asset_detail> assets = db.asset_detail
                                            .Where(ptr => ptr.TicketID == requestID)
                                            .ToList();
                ProcessStep processStep = db.ProcessSteps.Where(ptr => ptr.ParentID == request.StepID && ptr.IsDelete == false).ToList().FirstOrDefault();

                request.IsApprove = false;
                request.IsReject = true;
                foreach (asset_detail item in assets)
                {
                    item.IsActive = false;
                    item.IsDelete = true;
                }

                user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;

                // tạo request
                ams_notification noti = new ams_notification()
                {
                    ID = Guid.NewGuid().ToString(),
                    CreateDate = DateTime.Now,
                    IsRead = false,
                    NotificationContent = "Yêu cầu mua sắm tài sản đã bị từ chối bởi " + user.UserFullName,
                    NotificationFor = user.ID,
                    Action = JsonConvert.SerializeObject(new RequestAction()
                    {
                        Key = "REJECT",
                        Value = request.ID,
                        Path = "/Shopping"
                    }),
                };

                db.ams_notification.Add(noti);

                db.SaveChanges();

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

        // Yêu cầu cấp phát
        public BaseModel<Ticket> GetTicketAllocation(string requestID, string requestType)
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

                List<asset_detail> assets = (from usa in db.usage_history
                                             join ad in db.asset_detail on usa.AssetID equals ad.ID
                                             where usa.TicketID == request.ID
                                             select ad).ToList().Select(ptr => new asset_detail()
                                             {
                                                 ID = ptr.ID,
                                                 AssetClassifyID = ptr.AssetClassifyID,
                                                 QuantityOriginalStock = ptr.QuantityOriginalStock,
                                                 CreateDate = ptr.CreateDate,
                                                 AssetFullName = ptr.AssetFullName,
                                                 Description = ptr.Description,
                                                 Price = ptr.Price,
                                                 QuantityInStock = ptr.QuantityInStock,
                                                 Unit = ptr.Unit
                                             }).ToList();

                List<usage_history> usages = db.usage_history.Where(ptr => ptr.TicketID == request.ID).ToList().Select(ptr => new usage_history()
                {
                    AssetID = ptr.AssetID,
                    ID = ptr.ID,
                    Quantity = ptr.Quantity,
                    TicketID = ptr.TicketID,
                    UsageFor = ptr.UsageFor
                }).ToList();

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Request = request,
                        Assets = assets,
                        UsageHistories = usages
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

        public BaseModel<string> CreateTicketAllocation(string requestBy, string storeID, string description, string processID, List<usage_history> details)
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
                    RequestType = "ALLOCATION",
                    IsReject = false,
                    StoreID = storeID
                });

                List<usage_history> listUsageHistory = new List<usage_history>();
                foreach (usage_history item in details)
                {
                    usage_history us = db.usage_history.Where(ptr => ptr.AssetID == item.AssetID && ptr.UsageFor == item.UsageFor).ToList().FirstOrDefault();
                    if (us == null)
                    {
                        listUsageHistory.Add(new usage_history()
                        {
                            ID = Guid.NewGuid().ToString(),
                            TicketID = id,
                            AssetID = item.AssetID,
                            Quantity = item.Quantity,
                            UsageFor = item.UsageFor,
                            CreateDate = DateTime.Now,
                            IsLiquidation = false,
                            IsRecovery = false,
                            IsUsed = false,
                        });
                    }
                    else
                    {
                        us.Quantity = us.Quantity + item.Quantity;
                    }
                }

                db.usage_history.AddRange(listUsageHistory);

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
                        NotificationContent = "Yêu cầu cấp phát tài sản được gửi từ " + new UserInformation().GetUserInfor(requestBy).Result.UserFullName,
                        NotificationFor = userid,
                        Action = JsonConvert.SerializeObject(new RequestAction()
                        {
                            Key = "ALLOCATION",
                            Value = id,
                            Path = "/Allocation"
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

        public BaseModel<Ticket> ApproveTicketAllocation(string requestID, string requestType)
        {
            try
            {
                var db = DBC.Init;
                request_ticket_history request = db.request_ticket_history
                                .Where(ptr => ptr.ID == requestID && ptr.RequestType == requestType && ptr.IsApprove == false && ptr.IsReject == false)
                                .ToList()
                                .FirstOrDefault();
                List<usage_history> usage_Histories = db.usage_history
                                                        .Where(ptr => ptr.TicketID == requestID)
                                                        .ToList();

                ProcessStep processStep = db.ProcessSteps.Where(ptr => ptr.ParentID == request.StepID && ptr.IsDelete == false).ToList().FirstOrDefault();

                if (processStep == null)
                {
                    request.IsApprove = true;
                    request.IsReject = false;
                    foreach (usage_history item in usage_Histories)
                    {
                        item.IsUsed = true;
                        item.IsLiquidation = false;
                        item.IsRecovery = false;
                        var ase = db.asset_detail.Where(ptr => ptr.ID == item.AssetID).ToList().FirstOrDefault();
                        ase.QuantityInStock = ase.QuantityInStock - item.Quantity;
                        ase.QuantityUsed = ase.QuantityUsed + item.Quantity;
                    }
                    user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;
                    ams_notification noti = new ams_notification()
                    {
                        ID = Guid.NewGuid().ToString(),
                        CreateDate = DateTime.Now,
                        IsRead = false,
                        NotificationContent = "Yêu cầu cấp phát tài sản đã được phê duyệt",
                        NotificationFor = user.ID,
                        Action = JsonConvert.SerializeObject(new RequestAction()
                        {
                            Key = "REJECT",
                            Value = request.ID,
                            Path = ""
                        }),
                    };

                    db.ams_notification.Add(noti);
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
                    else if (Approvers[1] == "")
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

                    foreach (string userid in users)
                    {
                        ams_notification noti = new ams_notification()
                        {
                            ID = Guid.NewGuid().ToString(),
                            CreateDate = DateTime.Now,
                            IsRead = false,
                            NotificationContent = "Yêu cầu cấp phát tài sản được gửi từ " + new UserInformation().GetUserInfor(request.RequestBy).Result.UserFullName,
                            NotificationFor = userid,
                            Action = JsonConvert.SerializeObject(new RequestAction()
                            {
                                Key = request.RequestType,
                                Value = request.ID,
                                Path = "/Allocation"
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

        public BaseModel<Ticket> RejectTicketAllocation(string requestID, string requestType)
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

                user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;

                // tạo request
                ams_notification noti = new ams_notification()
                {
                    ID = Guid.NewGuid().ToString(),
                    CreateDate = DateTime.Now,
                    IsRead = false,
                    NotificationContent = "Yêu cầu cấp phát tài sản đã bị từ chối bởi " + user.UserFullName,
                    NotificationFor = user.ID,
                    Action = JsonConvert.SerializeObject(new RequestAction()
                    {
                        Key = "REJECT",
                        Value = request.ID,
                        Path = "/Allocation"
                    }),
                };

                db.ams_notification.Add(noti);

                db.SaveChanges();

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

        // Yêu cầu thu hồi
        public BaseModel<Ticket> GetTicketRecovery(string requestID, string requestType)
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

                List<asset_detail> assets = (from usa in db.usage_history
                                             join ad in db.asset_detail on usa.AssetID equals ad.ID
                                             where usa.TicketID == request.ID
                                             select new
                                             {
                                                 ID = ad.ID,
                                                 AssetClassifyID = ad.AssetClassifyID,
                                                 QuantityOriginalStock = ad.QuantityOriginalStock,
                                                 QuantityUsed = usa.Quantity,
                                                 CreateDate = ad.CreateDate,
                                                 AssetFullName = ad.AssetFullName,
                                                 Description = ad.Description,
                                                 Price = ad.Price,
                                                 Unit = ad.Unit,
                                             }).ToList().Select(ptr => new asset_detail()
                                             {
                                                 ID = ptr.ID,
                                                 AssetClassifyID = ptr.AssetClassifyID,
                                                 QuantityOriginalStock = ptr.QuantityOriginalStock,
                                                 QuantityUsed = ptr.QuantityUsed,
                                                 CreateDate = ptr.CreateDate,
                                                 AssetFullName = ptr.AssetFullName,
                                                 Description = ptr.Description,
                                                 Price = ptr.Price,
                                                 Unit = ptr.Unit,
                                             }).ToList();

                List<usage_history> usages = db.usage_history.Where(ptr => ptr.TicketID == request.ID).ToList().Select(ptr => new usage_history()
                {
                    AssetID = ptr.AssetID,
                    ID = ptr.ID,
                    IsLiquidation = ptr.IsLiquidation,
                    IsRecovery = ptr.IsRecovery,
                    IsUsed = ptr.IsUsed,
                    Quantity = ptr.Quantity,
                    TicketID = ptr.TicketID,
                    UsageFor = ptr.UsageFor
                }).ToList();

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Request = request,
                        Assets = assets,
                        UsageHistories = usages
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

        public BaseModel<string> CreateTicketRecovery(string requestBy, string storeID, string description, string processID, List<usage_history> details)
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
                    RequestType = "RECOVERY",
                    IsReject = false,
                    StoreID = storeID
                });

                foreach (usage_history item in details)
                {
                    usage_history us = db.usage_history.Where(ptr => ptr.ID == item.ID).FirstOrDefault();
                    us.TicketID = id;
                }

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
                        NotificationContent = "Yêu cầu thu hồi tài sản được gửi từ " + new UserInformation().GetUserInfor(requestBy).Result.UserFullName,
                        NotificationFor = userid,
                        Action = JsonConvert.SerializeObject(new RequestAction()
                        {
                            Key = "RECOVERY",
                            Value = id,
                            Path = "/Recovery"
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

        public BaseModel<Ticket> ApproveTicketRecovery(string requestID, string requestType)
        {
            try
            {
                var db = DBC.Init;
                request_ticket_history request = db.request_ticket_history
                                .Where(ptr => ptr.ID == requestID && ptr.RequestType == requestType && ptr.IsApprove == false && ptr.IsReject == false)
                                .ToList()
                                .FirstOrDefault();
                List<usage_history> usage_Histories = db.usage_history
                                                        .Where(ptr => ptr.TicketID == requestID)
                                                        .ToList();

                ProcessStep processStep = db.ProcessSteps.Where(ptr => ptr.ParentID == request.StepID && ptr.IsDelete == false).ToList().FirstOrDefault();

                if (processStep == null)
                {
                    request.IsApprove = true;
                    request.IsReject = false;
                    foreach (usage_history item in usage_Histories)
                    {
                        var ase = db.asset_detail.Where(ptr => ptr.ID == item.AssetID).ToList().FirstOrDefault();
                        ase.QuantityInStock = ase.QuantityInStock + item.Quantity;
                        ase.QuantityUsed = ase.QuantityUsed - item.Quantity;
                        item.IsUsed = false;
                        item.IsLiquidation = false;
                        item.IsRecovery = true;
                    }
                    user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;
                    ams_notification noti = new ams_notification()
                    {
                        ID = Guid.NewGuid().ToString(),
                        CreateDate = DateTime.Now,
                        IsRead = false,
                        NotificationContent = "Yêu cầu thu hồi tài sản đã được phê duyệt",
                        NotificationFor = user.ID,
                        Action = JsonConvert.SerializeObject(new RequestAction()
                        {
                            Key = "REJECT",
                            Value = request.ID,
                            Path = ""
                        }),
                    };

                    db.ams_notification.Add(noti);
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
                    else if (Approvers[1] == "")
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

                    foreach (string userid in users)
                    {
                        ams_notification noti = new ams_notification()
                        {
                            ID = Guid.NewGuid().ToString(),
                            CreateDate = DateTime.Now,
                            IsRead = false,
                            NotificationContent = "Yêu cầu thu hồi tài sản được gửi từ " + new UserInformation().GetUserInfor(request.RequestBy).Result.UserFullName,
                            NotificationFor = userid,
                            Action = JsonConvert.SerializeObject(new RequestAction()
                            {
                                Key = request.RequestType,
                                Value = request.ID,
                                Path = "/Recovery"
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

        public BaseModel<Ticket> RejectTicketRecovery(string requestID, string requestType)
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

                user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;

                // tạo request
                ams_notification noti = new ams_notification()
                {
                    ID = Guid.NewGuid().ToString(),
                    CreateDate = DateTime.Now,
                    IsRead = false,
                    NotificationContent = "Yêu cầu thu hồi tài sản đã bị từ chối bởi " + user.UserFullName,
                    NotificationFor = user.ID,
                    Action = JsonConvert.SerializeObject(new RequestAction()
                    {
                        Key = "REJECT",
                        Value = request.ID,
                        Path = "/Recovery"
                    }),
                };

                db.ams_notification.Add(noti);

                db.SaveChanges();

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

        // Yêu cầu thu hồi
        public BaseModel<Ticket> GetTicketLiquidation(string requestID, string requestType)
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
                                                    StoreID = ptr.StoreID,
                                                }).
                                                ToList()
                                                .FirstOrDefault();

                List<asset_detail> assets = (from usa in db.usage_history
                                             join ad in db.asset_detail on usa.AssetID equals ad.ID
                                             where usa.TicketID == request.ID
                                             select new
                                             {
                                                 ID = ad.ID,
                                                 AssetClassifyID = ad.AssetClassifyID,
                                                 QuantityOriginalStock = ad.QuantityOriginalStock,
                                                 QuantityUsed = usa.Quantity,
                                                 CreateDate = ad.CreateDate,
                                                 AssetFullName = ad.AssetFullName,
                                                 Description = ad.Description,
                                                 Price = ad.Price,
                                                 Unit = ad.Unit,
                                             }).ToList().Select(ptr => new asset_detail()
                                             {
                                                 ID = ptr.ID,
                                                 AssetClassifyID = ptr.AssetClassifyID,
                                                 QuantityOriginalStock = ptr.QuantityOriginalStock,
                                                 QuantityUsed = ptr.QuantityUsed,
                                                 CreateDate = ptr.CreateDate,
                                                 AssetFullName = ptr.AssetFullName,
                                                 Description = ptr.Description,
                                                 Price = ptr.Price,
                                                 Unit = ptr.Unit,
                                             }).ToList();

                List<usage_history> usages = db.usage_history.Where(ptr => ptr.TicketID == request.ID).ToList().Select(ptr => new usage_history()
                {
                    AssetID = ptr.AssetID,
                    ID = ptr.ID,
                    IsLiquidation = ptr.IsLiquidation,
                    IsRecovery = ptr.IsRecovery,
                    IsUsed = ptr.IsUsed,
                    Quantity = ptr.Quantity,
                    TicketID = ptr.TicketID,
                    UsageFor = ptr.UsageFor
                }).ToList();

                return new BaseModel<Ticket>()
                {
                    Result = new Ticket()
                    {
                        Request = request,
                        Assets = assets,
                        UsageHistories = usages
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

        public BaseModel<string> CreateTicketLiquidation(string requestBy, string storeID, string description, string processID, List<usage_history> details)
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
                    RequestType = "LIQUIDATION",
                    IsReject = false,
                    StoreID = storeID
                });
                List<usage_history> usage_Histories = new List<usage_history>();
                foreach (usage_history item in details)
                {
                    usage_Histories.Add(new usage_history()
                    {
                        ID = Guid.NewGuid().ToString(),
                        AssetID = item.AssetID,
                        CreateDate = DateTime.Now,
                        Quantity = item.Quantity,
                        TicketID = id,
                        UsageFor = ""
                    });
                }

                db.usage_history.AddRange(usage_Histories);

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
                        NotificationContent = "Yêu cầu thu thanh lý sản được gửi từ " + new UserInformation().GetUserInfor(requestBy).Result.UserFullName,
                        NotificationFor = userid,
                        Action = JsonConvert.SerializeObject(new RequestAction()
                        {
                            Key = "LIQUIDATION",
                            Value = id,
                            Path = "/Liquidation"
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

        public BaseModel<Ticket> ApproveTicketLiquidation(string requestID, string requestType)
        {
            try
            {
                var db = DBC.Init;
                request_ticket_history request = db.request_ticket_history
                                .Where(ptr => ptr.ID == requestID && ptr.RequestType == requestType && ptr.IsApprove == false && ptr.IsReject == false)
                                .ToList()
                                .FirstOrDefault();
                List<usage_history> usage_Histories = db.usage_history
                                                        .Where(ptr => ptr.TicketID == requestID)
                                                        .ToList();

                ProcessStep processStep = db.ProcessSteps.Where(ptr => ptr.ParentID == request.StepID && ptr.IsDelete == false).ToList().FirstOrDefault();

                if (processStep == null)
                {
                    request.IsApprove = true;
                    request.IsReject = false;
                    foreach (usage_history item in usage_Histories)
                    {
                        item.IsUsed = false;
                        item.IsLiquidation = true;
                        item.IsRecovery = false;
                        var ase = db.asset_detail.Where(ptr => ptr.ID == item.AssetID).ToList().FirstOrDefault();
                        ase.QuantityInStock = ase.QuantityInStock - item.Quantity;
                        ase.QuantityDestroyed = ase.QuantityDestroyed + item.Quantity;
                    }
                    user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;
                    ams_notification noti = new ams_notification()
                    {
                        ID = Guid.NewGuid().ToString(),
                        CreateDate = DateTime.Now,
                        IsRead = false,
                        NotificationContent = "Yêu cầu thanh lý tài sản đã được phê duyệt",
                        NotificationFor = user.ID,
                        Action = JsonConvert.SerializeObject(new RequestAction()
                        {
                            Key = "REJECT",
                            Value = request.ID,
                            Path = ""
                        }),
                    };

                    db.ams_notification.Add(noti);
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
                    else if (Approvers[1] == "")
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

                    foreach (string userid in users)
                    {
                        ams_notification noti = new ams_notification()
                        {
                            ID = Guid.NewGuid().ToString(),
                            CreateDate = DateTime.Now,
                            IsRead = false,
                            NotificationContent = "Yêu cầu thanh lý tài sản được gửi từ " + new UserInformation().GetUserInfor(request.RequestBy).Result.UserFullName,
                            NotificationFor = userid,
                            Action = JsonConvert.SerializeObject(new RequestAction()
                            {
                                Key = request.RequestType,
                                Value = request.ID,
                                Path = "/Liquidation"
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

        public BaseModel<Ticket> RejectTicketLiquidation(string requestID, string requestType)
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

                user_identifie user = new UserInformation().GetUserInfor(request.RequestBy).Result;

                // tạo request
                ams_notification noti = new ams_notification()
                {
                    ID = Guid.NewGuid().ToString(),
                    CreateDate = DateTime.Now,
                    IsRead = false,
                    NotificationContent = "Yêu cầu thanh lý tài sản đã bị từ chối bởi " + user.UserFullName,
                    NotificationFor = user.ID,
                    Action = JsonConvert.SerializeObject(new RequestAction()
                    {
                        Key = "REJECT",
                        Value = request.ID,
                        Path = "/Liquidation"
                    }),
                };

                db.ams_notification.Add(noti);

                db.SaveChanges();

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
}
