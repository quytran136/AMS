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
        public BaseResponse<Res_DepartmentChart> DepartmentControl(BaseRequest<Req_DepartmentChart> req)
        {
            // validate token
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
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
                case "DEPARTMENT_CHART":
                    BaseModel<DepartmentChart> departmentChart = new DepartmentChart().GetChart();
                    return new BaseResponse<Res_DepartmentChart>().Result(departmentChart, new BaseResponse<Res_DepartmentChart>()
                    {
                        Response = new Res_DepartmentChart()
                        {
                            Department = departmentChart.Result
                        }
                    });
                case "UPDATE_DEPARTMENT":
                    BaseModel<string> department = new DepartmentChart().UpdateChart(req.Data.Department);
                    return new BaseResponse<Res_DepartmentChart>().Result(department, new BaseResponse<Res_DepartmentChart>()
                    {
                        Response = new Res_DepartmentChart()
                    });
                case "DEPARTMENT_DETAIL":
                    BaseModel<DepartmentChart> departmentDetail = new DepartmentChart().GetDepartmentDetailByID(req.Data.DepartmentID);
                    return new BaseResponse<Res_DepartmentChart>().Result(departmentDetail, new BaseResponse<Res_DepartmentChart>()
                    {
                        Response = new Res_DepartmentChart()
                        {
                            Department = departmentDetail.Result
                        }
                    });
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