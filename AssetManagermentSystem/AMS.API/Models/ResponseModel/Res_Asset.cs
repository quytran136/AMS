using AMS.BUS.BusinessHandle;
using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_Asset
    {
        public List<Asset> AssetClassifies { get; set; }
        public List<asset_detail> AssetDetails { get; set; }
        public asset_classify AssetClassify { get; set; }
        public asset_detail AssetDetail { get; set; }
    }
}