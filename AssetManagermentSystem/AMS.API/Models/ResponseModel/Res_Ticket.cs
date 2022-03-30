using AMS.BUS.BusinessHandle;
using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_Ticket
    {
        public request_ticket_history Ticket { get; set; }
        public List<invoice> Invoices { get; set; }
        public List<request_ticket_history> Tickets { get; set;}
        public List<asset_detail> Assets { get; set; }
        public List<usage_history> UsageList { get; set; }
        public List<VotingHistory> VotingHistory { get; set; }
    }
}