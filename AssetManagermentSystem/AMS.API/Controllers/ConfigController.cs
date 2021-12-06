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
    public class ConfigController : ApiController
    {
        [HttpPost]
        public BaseResponse<Res_Config> ConfigControl(BaseRequest<Req_Config> req)
        {
            BaseModel<bool> access = new Access().CheckToken(req.Token, req.UserNameRequest);
            if (!string.IsNullOrEmpty(access.Exception.Message))
            {
                return new BaseResponse<Res_Config>()
                {
                    Code = access.Exception.Code,
                    Message = access.Exception.Message
                };
            }

            switch (req.Key)
            {
                case "UPDATE_CONFIG_COMMON":
                    BaseModel<string> conf = new AMS_Config().UpdateConfig(req.Data.Config);
                    return new BaseResponse<Res_Config>().Result(conf, new BaseResponse<Res_Config>()
                    {
                        Response = new Res_Config()
                    });
                case "GET_CONFIG_COMMON":
                    BaseModel<List<ams_config>> conf1 = new AMS_Config().GetConfig();
                    return new BaseResponse<Res_Config>().Result(conf1, new BaseResponse<Res_Config>()
                    {
                        Response = new Res_Config()
                        {
                            Configs = conf1.Result
                        }
                    });
                default:
                    return new BaseResponse<Res_Config>()
                    {
                        Code = "404",
                        Message = "Not found function",
                    };
            }
        }
    }
}