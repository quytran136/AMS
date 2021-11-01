using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AMS.API.Models.RequestModel
{
    public class Information
    {
        public string UserID { get; set; }
        [Required]
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string NewPassword { get; set; }
        public string UserFullName { get; set; }
        public bool IsLock { get; set; }
        public bool IsDelete { get; set; }
        public string Role { get; set; }
    }
}