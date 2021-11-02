using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_DepartmentChart
    {
        private List<Res_DepartmentChart> list;
        public string Label { get; set; }
        public string key { get; set; }
        public List<Res_DepartmentChart> List
        {
            get
            {
                if (list == null)
                {
                    list = new List<Res_DepartmentChart>();
                }
                return list;
            }
            set
            {
                list = value;
            }
        }
    }
}