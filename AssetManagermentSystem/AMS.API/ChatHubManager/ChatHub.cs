using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.ChatHubManager
{
    [HubName("amshub")]
    public class ChatHub : Hub
    {
        public static Dictionary<string, string> connection = new Dictionary<string, string>();

        public void RegistConnect(string username, string connectid)
        {
            UserInformation user = new UserInformation();
            BaseModel<user_identifie> ui = user.GetUserInfor(username);
            if (ui.Result == null)
            {
                return;
            }
            var userX = connection.Where(ptr => ptr.Key == ui.Result.ID).FirstOrDefault();
            if (userX.Key == null)
            {
                connection.Add(ui.Result.ID, connectid);
            }
            else
            {
                var connect = connection.Where(ptr => ptr.Key == ui.Result.ID).FirstOrDefault();
                connection.Remove(connect.Key);
                connection.Add(connect.Key, connectid);
            }
        }

        public void SendMessage(string message)
        {
            Clients.All.Message(message);
        }

        public void OnMessage(string userid, string mess)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            context.Clients.Client(connection
                .Where(ptr => ptr.Key == userid)
                .FirstOrDefault()
                .Value)
                .OnMessage(mess);

        }

        public void OnNotification(string userid)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            var user = new UserInformation().GetUserInfor(userid);
            if (user.Result == null)
            {
                return;
            }
            Notification noti = new Notification();
            BaseModel<List<ams_notification>> Notifications = noti.GetNotificationByUserID(user.Result.ID);
            var connectid = connection
                .Where(ptr => ptr.Key == user.Result.ID)
                .FirstOrDefault()
                .Value;
            if (connectid != null)
            {
                string json = JsonConvert
                .SerializeObject(new BaseResponse<Res_Notification>()
                .Result(Notifications, new BaseResponse<Res_Notification>()
                {
                    Response = new Res_Notification()
                    {
                        Notifications = Notifications.Result
                    }
                }));
                context.Clients.Client(connectid).OnNotification(json);
            }
        }
    }
}