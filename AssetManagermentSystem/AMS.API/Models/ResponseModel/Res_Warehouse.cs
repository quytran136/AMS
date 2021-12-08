using AMS.BUS.BusinessHandle;
using AMS.BUS.DBConnect;
using System.Collections.Generic;

namespace AMS.API.Models.ResponseModel
{
    public class Res_Warehouse
    {
        public store_Identifie StoreIdentifie { get; set; }
        public List<store_Identifie> StoreIdentifies { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}