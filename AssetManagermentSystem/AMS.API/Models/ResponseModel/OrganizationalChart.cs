using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AMS.API.Models.ResponseModel
{
    public class OrganizationalChart
    {
        private List<OrganizationalChart> list;
        public string Label { get; set; }
        public string key { get; set; }
        public List<OrganizationalChart> List
        {
            get
            {
                if (list == null)
                {
                    list = new List<OrganizationalChart>();
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