using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_Config
    {
        public List<ams_config> Configs { get; set; }
    }
}