using AMS.API.Models.RequestModel;
using AMS.API.Models.ResponseModel;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using System.Collections.Generic;
using System.Web.Http;

namespace AMS.API.Controllers
{
    public class ProcessFlowController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_Process> ProcessControl(BaseRequest<Req_Process> req)
        {
            // validate token
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_Process>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            UserInformation user = new UserInformation();
            BaseModel<user_identifie> user_info = user.GetUserInfor(req.UserNameRequest);

            switch (req.Key)
            {
                case "GET_PROCESS":
                    BaseModel<List<Process>> list = new ProcessChart().GetProcess(req.Data.ProcessName);

                    return new BaseResponse<Res_Process>().Result<List<Process>>(list, new BaseResponse<Res_Process>() {
                        Response = new Res_Process()
                        {
                            Process = list.Result
                        }
                    });
                case "UPDATE_PROCESS":
                    BaseModel<string> ProcessFlow = new ProcessChart()
                                                    .UpdateProcess(req.Data.ProcessName, req.Data.ProcessID, req.Data.IsDelete, req.Data.IsLock)
                                                    .UpdateFlow(user_info.Result.ID, req.Data.ProcessFlow)
                                                    .SaveChange();

                    return new BaseResponse<Res_Process>().Result(ProcessFlow, new BaseResponse<Res_Process>()
                    {
                        Response = new Res_Process()
                        {
                            ProcessFlow = new ProcessChart()
                        }
                    });
                case "GET_PROCESS_DETAIL":
                    BaseModel<ProcessChart> processFlow2 = new ProcessChart().GetProcessDetail(req.Data.ProcessID);

                    return new BaseResponse<Res_Process>().Result(processFlow2, new BaseResponse<Res_Process>()
                    {
                        Response = new Res_Process()
                        {
                            ProcessFlow = processFlow2.Result
                        }
                    });
                default:
                    return new BaseResponse<Res_Process>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}