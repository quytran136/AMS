using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AMS.API.Controllers
{
    public class AssetController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_Asset> AssetControl(BaseRequest<Req_Asset> req)
        {
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_Asset>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "UPDATE_ASSET_CLASSIFY":
                    BaseModel<asset_classify> ac = new Asset().UpdateAssetClassify(req.Data.AssetClassify);
                    return new BaseResponse<Res_Asset>().Result(ac, new BaseResponse<Res_Asset>()
                    {
                        Response = new Res_Asset()
                    });
                case "GET_ASSET_CLASSIFY":
                    BaseModel<List<Asset>> ac1 = new Asset().GetAssetClassify(req.Data.AssetClassify.AssetClassifyName);
                    return new BaseResponse<Res_Asset>().Result(ac1, new BaseResponse<Res_Asset>()
                    {
                        Response = new Res_Asset()
                        {
                            AssetClassifies = ac1.Result,
                        }
                    });
                case "GET_ASSET_CLASSIFY_DETAIL":
                    BaseModel<asset_classify> ac2 = new Asset().GetAssetClassifyDetail(req.Data.AssetClassify.ID);
                    return new BaseResponse<Res_Asset>().Result(ac2, new BaseResponse<Res_Asset>()
                    {
                        Response = new Res_Asset()
                        {
                            AssetClassify = ac2.Result
                        }
                    });
                case "UPDATE_ASSET_DETAIL":
                    BaseModel<string> ad = new Asset().UpdateAsset(req.Data.AssetDetail);
                    return new BaseResponse<Res_Asset>().Result(ad, new BaseResponse<Res_Asset>()
                    {
                        Response = new Res_Asset()
                    });
                case "UPDATE_LIST_ASSET_DETAIL":
                    BaseModel<string> adRanger = new Asset().UpdateAssetRanger(req.Data.AssetDetails);
                    return new BaseResponse<Res_Asset>().Result(adRanger, new BaseResponse<Res_Asset>()
                    {
                        Response = new Res_Asset()
                    });
                case "GET_ASSET":
                    BaseModel<List<asset_detail>> ad1 = new Asset().GetAsset(req.Data.AssetClassify);
                    return new BaseResponse<Res_Asset>().Result(ad1, new BaseResponse<Res_Asset>()
                    {
                        Response = new Res_Asset()
                        {
                            AssetDetails = ad1.Result
                        }
                    });
                case "GET_ASSET_DETAIL":
                    BaseModel<asset_detail> ad2 = new Asset().GetAsset(req.Data.AssetDetail.ID);
                    return new BaseResponse<Res_Asset>().Result(ad2, new BaseResponse<Res_Asset>()
                    {
                        Response = new Res_Asset()
                    });
                case "EXPORT_ASSET_DETAIL":
                    return new BaseResponse<Res_Asset>()
                    {
                        Response = new Res_Asset()
                    };
                case "GET_ASSET_ALLOCATION":
                    BaseModel<List<Asset>> ad3 = new Asset().GetAssetByUser(req.Data.UsageFor);
                    return new BaseResponse<Res_Asset>().Result(ad3, new BaseResponse<Res_Asset>()
                    {
                        Response = new Res_Asset()
                        {
                            AssetClassifies = ad3.Result,
                            UsageFor = req.Data.UsageFor,
                        }
                    });
                default:
                    return new BaseResponse<Res_Asset>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}