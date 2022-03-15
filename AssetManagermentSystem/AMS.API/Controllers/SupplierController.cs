using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AMS.API.Controllers
{
    public class SupplierController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_Supplier> SupplierControl(BaseRequest<Req_Supplier> req)
        {
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_Supplier>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "UPDATE_SUPPLIER":
                    var supplier = new Supplier().Update(req.Data.Supplier);
                    return new BaseResponse<Res_Supplier>().Result(supplier, new BaseResponse<Res_Supplier>()
                    {
                        Response = new Res_Supplier()
                    });
                case "GET_SUPPLIER":
                    var supplier1 = new Supplier().GetByName(req.Data.Supplier.Name);
                    return new BaseResponse<Res_Supplier>().Result(supplier1, new BaseResponse<Res_Supplier>()
                    {
                        Response = new Res_Supplier()
                        {
                            Suppliers = supplier1.Result
                        }
                    });
                case "GET_SUPPLIER_DETAIL":
                    var supplier2 = new Supplier().GetById(req.Data.Supplier.ID);
                    return new BaseResponse<Res_Supplier>().Result(supplier2, new BaseResponse<Res_Supplier>()
                    {
                        Response = new Res_Supplier()
                        {
                            Supplier = supplier2.Result
                        }
                    });
                default:
                    return new BaseResponse<Res_Supplier>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}