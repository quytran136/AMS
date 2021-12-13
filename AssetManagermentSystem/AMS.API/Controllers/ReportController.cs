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
    public class ReportController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_Report> ReportControl(BaseRequest<Req_Report> req)
        {
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_Report>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            ReportManager report = new ReportManager();
            switch (req.Key)
            {
                case "REPORT_1":
                    BaseModel<ReportManager> result = report.GetReport1(req.Data.DateFrom, req.Data.DateEnd, req.Data.SearchContent);
                    return new BaseResponse<Res_Report>().Result(result, new BaseResponse<Res_Report>()
                    {
                        Response = new Res_Report()
                        {
                            Headers = result.Result.Headers,
                            Result = result.Result.Result
                        }
                    });
                case "REPORT_2":
                    BaseModel<ReportManager> result1 = report.GetReport2(req.Data.DateFrom, req.Data.DateEnd, req.Data.SearchContent);
                    return new BaseResponse<Res_Report>().Result(result1, new BaseResponse<Res_Report>()
                    {
                        Response = new Res_Report()
                        {
                            Headers = result1.Result.Headers,
                            Result = result1.Result.Result
                        }
                    });
                default:
                    return new BaseResponse<Res_Report>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}