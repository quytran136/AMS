using AMS.BUS.BusinessHandle;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel
{
    public class Req_Process
    {
        public string UserLoginName { get; set; }
        public string ProcessName { get; set; }
        public string ProcessID { get; set; }
        public bool IsDelete { get; set; }
        public bool IsLock { get; set; }
        public ProcessChart ProcessFlow { get; set; }
    }
}