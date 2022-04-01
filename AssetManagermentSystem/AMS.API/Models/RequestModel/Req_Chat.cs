using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel
{
    public class Req_Chat
    {
        public string To { get; set; }
        public string From { get; set; }
        public int Take { get; set; }
    }
}