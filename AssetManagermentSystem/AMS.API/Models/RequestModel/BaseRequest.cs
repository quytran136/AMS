using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel
{
    public class BaseRequest<T>
    {
        public string Token { get; set; }
        public string Key { get; set; }
        public string UserNameRequest { get; set; }
        public T Data { get; set; }
    }
}