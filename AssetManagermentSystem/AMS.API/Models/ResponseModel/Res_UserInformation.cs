using AMS.API.Models.RequestModel.Access;
using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_UserInformation
    {
        public string key { get; set; }
        public string ID { get; set; }
        public string UserName { get; set; }
        public string UserFullName { get; set; }
        public bool IsLock { get; set; }
        public bool IsDelete { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentID { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationID { get; set; }
        public List<Res_UserInformation> Users { get; set; }
    }
}