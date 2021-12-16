using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_Report
    {
        public List<string> Headers { get; set; }
        public string Result { get; set; }
        public List<Res_Report> Res_Reports { get; set; }
    }
}