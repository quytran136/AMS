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
    public class WarehouseController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_Warehouse> WarehouseControl(BaseRequest<Req_Warehouse> req)
        {
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_Warehouse>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "UPDATE_WAREHOUSE":
                    BaseModel<string> wh = new Warehouse().UpdateWareHouse(req.Data.StoreIdentifie);
                    return new BaseResponse<Res_Warehouse>().Result(wh, new BaseResponse<Res_Warehouse>()
                    {
                        Response = new Res_Warehouse()
                    });
                case "GET_WAREHOUSE":
                    BaseModel<List<store_Identifie>> wh1 = new Warehouse().GetWarehouse(req.Data.StoreIdentifie);
                    return new BaseResponse<Res_Warehouse>().Result(wh1, new BaseResponse<Res_Warehouse>()
                    {
                        Response = new Res_Warehouse()
                        {
                            StoreIdentifies = wh1.Result
                        }
                    });
                case "GET_WAREHOUSE_DETAIL":
                    BaseModel<store_Identifie> wh2 = new Warehouse().GetWarehouse(req.Data.StoreIdentifie.ID);
                    return new BaseResponse<Res_Warehouse>().Result(wh2, new BaseResponse<Res_Warehouse>()
                    {
                        Response = new Res_Warehouse()
                        {
                            StoreIdentifie = wh2.Result
                        }
                    });
                case "GET_WAREHOUSE_DETAIL_2":
                    BaseModel<Warehouse> wh3 = new Warehouse().GetWarehouse2(req.Data.StoreIdentifie.ID);
                    return new BaseResponse<Res_Warehouse>().Result(wh3, new BaseResponse<Res_Warehouse>()
                    {
                        Response = new Res_Warehouse()
                        {
                            Warehouse = wh3.Result
                        }
                    });
                default:
                    return new BaseResponse<Res_Warehouse>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}