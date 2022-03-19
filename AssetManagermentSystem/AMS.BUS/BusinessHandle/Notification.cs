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
    public class Notification : IBaseHandle
    {
        public BaseModel<string> SentNotificationByUser(List<string> users, string ticketid, string sentByid, string key, string notificationContent, string stepid = "")
        {
            try
            {
                var db = DBC.Init;
                List<ams_notification> notis = new List<ams_notification>();
                foreach (string userid in users)
                {
                    ams_notification noti = new ams_notification()
                    {
                        ID = Guid.NewGuid().ToString(),
                        CreateDate = DateTime.Now,
                        IsRead = false,
                        NotificationContent = string.Format("{0} đã được gửi từ {1}", notificationContent, new UserInformation().GetUserInfor(sentByid).Result.UserFullName),
                        NotificationFor = userid,
                        Action = JsonConvert.SerializeObject(new RequestAction()
                        {
                            Key = key,
                            Value = ticketid,
                            Path = string.Format("/{0}", key),
                            StepID = stepid,
                        }),
                    };
                    notis.Add(noti);
                }

                db.ams_notification.AddRange(notis);
                db.SaveChanges();
                return new BaseModel<string> { Result = string.Empty };
            }
            catch (Exception ex)
            {
                return new BaseModel<string>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    },
                    Result = string.Empty
                };
            }
        }

        public BaseModel<List<ams_notification>> GetNotificationByUser(string userName)
        {
            try
            {
                var db = DBC.Init;
                user_identifie user = new UserInformation().GetUserInfor(userName).Result;
                List<ams_notification> notifications = db.ams_notification
                    .Where(ptr => ptr.NotificationFor == user.ID)
                    .OrderByDescending(ptr => ptr.CreateDate)
                    .ToList()
                    .Take(10)
                    .Select(ptr => new ams_notification()
                    {
                        ID = ptr.ID,
                        Action = ptr.Action,
                        CreateDate = ptr.CreateDate,
                        NotificationContent = ptr.NotificationContent,
                        IsRead = ptr.IsRead,
                        NotificationFor = ptr.NotificationFor
                    })
                    .ToList();

                return new BaseModel<List<ams_notification>>()
                {
                    Result = notifications
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<ams_notification>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<List<ams_notification>> GetNotificationByUserID(string id)
        {
            try
            {
                var db = DBC.Init;
                List<ams_notification> notifications = db.ams_notification
                    .Where(ptr => ptr.NotificationFor == id)
                    .OrderByDescending(ptr => ptr.CreateDate)
                    .ToList()
                    .Take(10)
                    .Select(ptr => new ams_notification()
                    {
                        ID = ptr.ID,
                        Action = ptr.Action,
                        CreateDate = ptr.CreateDate,
                        NotificationContent = ptr.NotificationContent,
                        IsRead = ptr.IsRead,
                        NotificationFor = ptr.NotificationFor
                    })
                    .ToList();

                return new BaseModel<List<ams_notification>>()
                {
                    Result = notifications
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<ams_notification>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<string> ReadNotificationByUser(string notiID)
        {
            try
            {
                var db = DBC.Init;
                ams_notification notifications = db.ams_notification.Where(ptr => ptr.ID == notiID).ToList().FirstOrDefault();
                notifications.IsRead = true;
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

        public string BUSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.BUS_EX,
                FunctionCode.API,
                FunctionCode.NOTIFICATION,
                id);
        }
        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.NOTIFICATION,
                id);
        }
    }
}
