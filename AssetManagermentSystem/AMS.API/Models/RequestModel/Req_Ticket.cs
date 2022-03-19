using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel
{
    public class Req_Ticket
    {
        public List<asset_detail> AssetDetails { get; set; }
        public List<invoice_detail> InvoiceDetails { get; set; }
        public List<usage_history> UsageAssetList { get; set; }
        public string StoreID { get; set; }
        public string Description { get; set; }
        public string ProcessID { get; set; }
        public string RequestID { get; set; }
        public string RequestType { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }
}