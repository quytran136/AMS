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
    public class DepartmentChartController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_DepartmentChart> OrganizationalControl(BaseRequest<Req_DepartmentChart> req)
        {
            // validate token
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.Data.UserName);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_DepartmentChart>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "ADD_DEPARTMENT":
                    return new BaseResponse<Res_DepartmentChart>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
                case "EDIT_DEPARTMENT":
                    return new BaseResponse<Res_DepartmentChart>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
                case "DELETE_DEPARTMENT":
                    return new BaseResponse<Res_DepartmentChart>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
                default:
                    return new BaseResponse<Res_DepartmentChart>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}