using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_Notification
    {
        public List<ams_notification> Notifications { get; set; }
    }
}