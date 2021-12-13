using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusinessHandle
{
    public class Notification : IBaseHandle
    {
        public BaseModel<List<ams_notification>> GetNotificationByUser(string userName)
        {
            try
            {
                var db = DBC.Init;
                user_identifie user = new UserInformation().GetUserInfor(userName).Result;
                List<ams_notification> notifications = db.ams_notification
                    .Where(ptr => ptr.NotificationFor == user.ID && ptr.IsRead == false)
                    .ToList()
                    .OrderByDescending(ptr => ptr.CreateDate)
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
                    .Where(ptr => ptr.NotificationFor == id && ptr.IsRead == false)
                    .ToList()
                    .OrderByDescending(ptr => ptr.CreateDate)
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
