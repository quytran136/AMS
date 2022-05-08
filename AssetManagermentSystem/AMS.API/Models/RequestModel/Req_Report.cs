using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel
{
    public class Req_Report
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateEnd { get; set; }
        public string SearchContent { get; set; }
        public string Store { get; set; }
    }
}