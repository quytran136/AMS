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
                case "DEPARTMENT_CHART":
                    BaseModel<DepartmentChart> departmentChart = new DepartmentChart().GetChart();
                    if (!string.IsNullOrEmpty(departmentChart.Exception.Code))
                    {
                        return new BaseResponse<Res_DepartmentChart>()
                        {
                            Code = departmentChart.Exception.Code,
                            Message = departmentChart.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_DepartmentChart>()
                    {
                        Response = new Res_DepartmentChart()
                        {
                            Department = departmentChart.Result
                        }
                    };
                case "UPDATE_DEPARTMENT":
                    BaseModel<string> department = new DepartmentChart().UpdateChart(req.Data.Department);
                    if (!string.IsNullOrEmpty(department.Exception.Code))
                    {
                        return new BaseResponse<Res_DepartmentChart>()
                        {
                            Code = department.Exception.Code,
                            Message = department.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_DepartmentChart>()
                    {
                        Response = new Res_DepartmentChart()
                        {
                            Department = new DepartmentChart(),
                        }
                    };
                case "DEPARTMENT_DETAIL":
                    BaseModel<DepartmentChart> departmentDetail = new DepartmentChart().GetDepartmentDetailByID(req.Data.DepartmentID);
                    if (!string.IsNullOrEmpty(departmentDetail.Exception.Code))
                    {
                        return new BaseResponse<Res_DepartmentChart>()
                        {
                            Code = departmentDetail.Exception.Code,
                            Message = departmentDetail.Exception.Message
                        };
                    }
                    return new BaseResponse<Res_DepartmentChart>()
                    {
                        Response = new Res_DepartmentChart()
                        {
                            Department = departmentDetail.Result
                        }
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