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
    }
}