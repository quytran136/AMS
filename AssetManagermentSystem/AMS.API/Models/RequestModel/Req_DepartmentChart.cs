using AMS.BUS.BusinessHandle;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel
{
    public class Req_DepartmentChart
    {
        public string UserNameRequest { get; set; }
        public string DepartmentID { get; set; }
        public DepartmentChart Department { get; set; }
    }
}