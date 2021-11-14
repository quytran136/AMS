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
        public BaseResponse<Res_OrganizationalChart> OrganizationalControl(BaseRequest<Req_OrganizationalChart> req)
        {
            // validate token
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.Data.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_OrganizationalChart>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "ORGANIZATIONAL_CHART":
                    BaseModel<OrganizationalChart> OrganizationalChart = new OrganizationalChart().GetChart(req.Data.DepartmentID);
                    if (!string.IsNullOrEmpty(OrganizationalChart.Exception.Code))
                    {
                        return new BaseResponse<Res_OrganizationalChart>()
                        {
                            Code = OrganizationalChart.Exception.Code,
                            Message = OrganizationalChart.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_OrganizationalChart>()
                    {
                        Response = new Res_OrganizationalChart()
                        {
                            Organizational = OrganizationalChart.Result
                        }
                    };
                case "UPDATE_ORGANIZATIONAL":
                    BaseModel<string> Organizational = new OrganizationalChart().UpdateChart(req.Data.DepartmentID, req.Data.Organizational);
                    if (!string.IsNullOrEmpty(Organizational.Exception.Code))
                    {
                        return new BaseResponse<Res_OrganizationalChart>()
                        {
                            Code = Organizational.Exception.Code,
                            Message = Organizational.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_OrganizationalChart>()
                    {
                        Response = new Res_OrganizationalChart()
                        {
                            Organizational = new OrganizationalChart(),
                        }
                    };
                default:
                    return new BaseResponse<Res_OrganizationalChart>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}