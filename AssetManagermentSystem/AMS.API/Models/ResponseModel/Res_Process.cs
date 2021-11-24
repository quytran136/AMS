using AMS.BUS.BusinessHandle;
using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_Process
    {
        public List<Process> Process { get; set; }
        public ProcessChart ProcessFlow { get; set; }
    }
}