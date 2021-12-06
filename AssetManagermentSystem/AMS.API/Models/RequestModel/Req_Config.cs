using AMS.BUS.DBConnect;
using System.Collections.Generic;

namespace AMS.API.Models.RequestModel
{
    public class Req_Config
    {
        public List<ams_config> Config { get; set; }
    }
}