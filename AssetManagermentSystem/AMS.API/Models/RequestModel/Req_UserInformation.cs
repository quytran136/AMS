using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel
{
    public class Req_UserInformation
    {
        public string UserID { get; set; }
        public string UserLoginName { get; set; }
        public string UserPassword { get; set; }
        public string NewPassword { get; set; }
        public string UserFullName { get; set; }
        public string DepartmentID { get; set; }
        public string OrganizationID { get; set; }
        public DateTime DOB { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string SearchContent { get; set; }
        public string Image { get; set; }
    }
}