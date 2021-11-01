using AMS.API.Models.RequestModel.Access;
using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class UserInformation
    {
        public string ID { get; set; }
        public string UserName { get; set; }
        public string UserFullName { get; set; }
        public bool IsLock { get; set; }
        public bool IsDelete { get; set; }
    }
}