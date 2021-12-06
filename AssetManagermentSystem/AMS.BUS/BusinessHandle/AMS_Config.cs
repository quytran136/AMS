using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusinessHandle
{
    public class AMS_Config : IBaseHandle
    {
        public string BUSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.BUS_EX,
                FunctionCode.API,
                FunctionCode.CONFIG,
                id);
        }
        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.CONFIG,
                id);
        }

        public BaseModel<string> UpdateConfig(List<ams_config> configs)
        {
            try
            {
                var db = DBC.Init;
                List<ams_config> ac = db.ams_config.ToList();
                db.ams_config.RemoveRange(ac);
                db.SaveChanges();
                List<ams_config> configsT = new List<ams_config>();
                foreach (var item in configs)
                {
                    configsT.Add(new ams_config()
                    {
                        ID = Guid.NewGuid().ToString(),
                        Code = item.Code,
                        Value = item.Value
                    });
                }

                db.ams_config.AddRange(configsT);
                db.SaveChanges();
                return new BaseModel<string>()
                {
                    Result = string.Empty
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<string>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<List<ams_config>> GetConfig()
        {
            try
            {
                var db = DBC.Init;
                List<ams_config> config = db.ams_config.ToList();
                return new BaseModel<List<ams_config>>()
                {
                    Result = config
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<ams_config>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }
    }
}
