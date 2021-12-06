using AMS.BUS.DBConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusModels
{
    public class ExceptionHandle
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private string code = string.Empty;
        private Exception exception;
        private string lang = "VN";
        public string Code
        {
            get
            {
                return code;
            }
            set
            {
                code = value;
                Message = takeMessage();
            }
        }
        public string Message { get; set; }

        public string Lang { get => lang; set => lang = value; }
        public Exception Exception
        {
            get
            {
                if (this.exception == null)
                {
                    return new Exception();
                }
                return this.exception;
            }
            set
            {
                this.exception = value;
            }
        }

        private string takeMessage()
        {
            try
            {
                if (string.IsNullOrEmpty(this.code))
                {
                    return string.Empty;
                }
                var db = DBC.Init;
                var result = db.message_list.Where(ptr => ptr.Code == this.code).ToList()?.FirstOrDefault();
                if (result == null)
                {
                    return "Có lỗi";
                }

                saveLog(result.ID);
                if (Lang == "EN")
                {
                    return result.Message_EN;
                }
                return result.Message_VN;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void saveLog(string ID)
        {
            try
            {
                var db = DBC.Init;
                system_log log = new system_log()
                {
                    ID = Guid.NewGuid().ToString(),
                    CreateDate = DateTime.Now,
                    //Creator = "",
                    MessageID = ID,
                    Detail = Exception?.Message ?? string.Empty
                };
                db.system_log.Add(log);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                log.Error(ex);
            }
        }
    }
}
