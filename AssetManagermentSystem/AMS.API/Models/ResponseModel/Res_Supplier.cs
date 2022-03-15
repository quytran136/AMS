using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_Supplier
    {
        public supplier Supplier { get; set; }
        public List<supplier> Suppliers { get; set; }
    }
}