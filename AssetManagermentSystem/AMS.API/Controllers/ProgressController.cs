using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AMS.API.Controllers
{
    public class ProgressController : Controller
    {
        //public BaseResponse<Res_Progress> ProgressControl(BaseRequest<Req_Progress> req)
        //{
        //    // validate token
        //    BaseModel<bool> access = new Access().CheckToken(req.Token, req.Data.UserName);
        //    if (!string.IsNullOrEmpty(access.Exception.Message))
        //    {
        //        return new BaseResponse<Res_Progress>()
        //        {
        //            Code = access.Exception.Code,
        //            Message = access.Exception.Message
        //        };
        //    }
        //}
    }
}