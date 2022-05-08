using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusinessHandle
{
    public class ReportManager : IBaseHandle
    {
        public List<string> Headers { get; set; }
        public string Result { get; set; }

        public string BUSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.BUS_EX,
                FunctionCode.API,
                FunctionCode.REPORT,
                id);
        }
        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.REPORT,
                id);
        }

        public BaseModel<ReportManager> GetReport1(DateTime dateFrom, DateTime dateEnd, string searchContent, string store)
        {
            try
            {
                var db = DBC.Init;
                var result = db.sp_BaoCaoTonKho(dateFrom, dateEnd, searchContent, store).ToList();
                List<string> header = new List<string>();
                foreach (var index in typeof(sp_BaoCaoTonKho_Result).GetProperties())
                {
                    header.Add(index.Name);
                }
                return new BaseModel<ReportManager>()
                {
                    Result = new ReportManager()
                    {
                        Headers = header,
                        Result = JsonConvert.SerializeObject(result)
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<ReportManager>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<ReportManager> GetReport2(DateTime dateFrom, DateTime dateEnd, string searchContent, string store)
        {
            try
            {
                var db = DBC.Init;
                var result = db.sp_BaoCaoYeuCauPheDuyet(dateFrom, dateEnd, searchContent, store).ToList();
                List<string> header = new List<string>();
                foreach (var index in typeof(sp_BaoCaoYeuCauPheDuyet_Result).GetProperties())
                {
                    header.Add(index.Name);
                }
                return new BaseModel<ReportManager>()
                {
                    Result = new ReportManager()
                    {
                        Headers = header,
                        Result = JsonConvert.SerializeObject(result)
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<ReportManager>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }
    
        public BaseModel<ReportManager> GetReport3(DateTime dateFrom, DateTime dateEnd, string searchContent, string store)
        {
            try
            {
                var db = DBC.Init;
                var result = db.sp_BaoCaoNhapKho(dateFrom, dateEnd, searchContent, store).ToList();
                List<string> header = new List<string>();
                foreach (var index in typeof(sp_BaoCaoNhapKho_Result).GetProperties())
                {
                    header.Add(index.Name);
                }
                return new BaseModel<ReportManager>()
                {
                    Result = new ReportManager()
                    {
                        Headers = header,
                        Result = JsonConvert.SerializeObject(result)
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<ReportManager>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<ReportManager> GetReport4(DateTime dateFrom, DateTime dateEnd, string searchContent, string store)
        {
            try
            {
                var db = DBC.Init;
                var result = db.sp_BaoCaoXuatKho(dateFrom, dateEnd, searchContent, store).ToList();
                List<string> header = new List<string>();
                foreach (var index in typeof(sp_BaoCaoXuatKho_Result).GetProperties())
                {
                    header.Add(index.Name);
                }
                return new BaseModel<ReportManager>()
                {
                    Result = new ReportManager()
                    {
                        Headers = header,
                        Result = JsonConvert.SerializeObject(result)
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<ReportManager>()
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
