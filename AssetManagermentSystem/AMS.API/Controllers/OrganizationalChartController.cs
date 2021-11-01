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
    public class OrganizationalChartController : ApiController
    {
        [HttpPost]
        public BaseResponse<OrganizationalChart> OrganizationalControl(BaseRequest<Organizational> req)
        {
            // validate token
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.Data.UserName);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<OrganizationalChart>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "UPDATE_ORG":
                    return new BaseResponse<OrganizationalChart>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
                case "RESTORE_ORG":
                    return new BaseResponse<OrganizationalChart>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
                default:
                    return new BaseResponse<OrganizationalChart>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}