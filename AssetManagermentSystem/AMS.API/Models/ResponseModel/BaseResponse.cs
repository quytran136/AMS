using AMS.API.ChatHubManager;
using AMS.BUS.BusModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class BaseResponse <T>
    {
        public string Message { get; set; }
        public string Code { get; set; }
        public T Response { get; set; }

        public BaseResponse<T> Result<X>(BaseModel<X> baseModel, BaseResponse<T> TResult)
        {
            if (!string.IsNullOrEmpty(baseModel.Exception.Code))
            {
                return new BaseResponse<T>()
                {
                    Code = baseModel.Exception.Code,
                    Message = baseModel.Exception.Message
                };
            }

            return TResult;
        }
    }
}