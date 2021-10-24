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
        public string UserFullName { get; set; }
        public string UserID { get; set; }
        public role_function Roles { get; set; }
    }
}