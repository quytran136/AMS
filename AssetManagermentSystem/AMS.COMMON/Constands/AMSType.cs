using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.COMMON.Constands
{
    public static class RequestType
    {
        public const string SHOPPING = "Shopping";
        public const string ALLOCATION = "Allocation";

        public static List<RType> _types = new List<RType>()
        {
            new RType()
            {
                Name = SHOPPING,
                Message = "Yêu cầu mua mới"
            },
            new RType()
            {
                Name = ALLOCATION,
                Message = "Yêu cầu cấp phát"
            },
        };

        public static RType GetMessageByName(string type)
        {
            return _types.FirstOrDefault(x => x.Name == type);
        }
    }
    public class RType
    {
        public string Name { get; set; }
        public string Key { get; set; }
        public string Message { get; set; }
    }
}
