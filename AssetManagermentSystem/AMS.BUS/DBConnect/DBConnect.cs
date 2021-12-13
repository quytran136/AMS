using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.DBConnect
{
    public class DBC : AMS_DBEntities
    {
        public static AMS_DBEntities DB;
        public static AMS_DBEntities Init
        {
            get
            {
                if (DB == null)
                {
                    DB = new AMS_DBEntities();
                    return DB;
                }

                return new AMS_DBEntities();
            }
        }
    }
}
