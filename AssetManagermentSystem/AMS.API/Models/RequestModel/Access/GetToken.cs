using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel.Access
{
    public class GetToken
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserPassword { get; set; }
    }
}