using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel
{
    public class CreateUserInformation
    {
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserFullName { get; set; }
        public string Role { get; set; }
    }
}