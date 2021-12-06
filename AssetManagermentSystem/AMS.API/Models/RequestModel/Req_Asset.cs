using AMS.BUS.DBConnect;
using System.Collections.Generic;

namespace AMS.API.Models.RequestModel
{
    public class Req_Asset
    {
        public asset_classify AssetClassify { get; set; }
        public asset_detail AssetDetail { get; set; }
        public List<asset_detail> AssetDetails { get; set; }
        public string StoreID { get; set; }
        public string Description { get; set; }
        public string ProcessID { get; set; }
        public string RequestID { get; set; }
    }
}