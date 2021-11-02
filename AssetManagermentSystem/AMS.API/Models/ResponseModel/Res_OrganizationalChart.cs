using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class Res_OrganizationalChart
    {
        private List<Res_OrganizationalChart> list;
        public string Label { get; set; }
        public string key { get; set; }
        public List<Res_OrganizationalChart> List
        {
            get
            {
                if (list == null)
                {
                    list = new List<Res_OrganizationalChart>();
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