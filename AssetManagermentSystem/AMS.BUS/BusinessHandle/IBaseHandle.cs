using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusinessHandle
{
    interface IBaseHandle
    {
        string BUSMessageCode(int id);
        string SYSMessageCode(int id);
    }
}
