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
    public class Chat : IBaseHandle
    {
        public string FromID { get; set; }
        public string ToID { get; set; }
        public List<chat_history> ChatHistories { get; set; }

        public BaseModel<Chat> GetMessage(string toID, string fromID, int take)
        {
            try
            {
                var db = DBC.Init;
                var listMessage = db.chat_history.Where(ptr => (ptr.FromUserID == fromID && ptr.ToUserID == toID) || (ptr.FromUserID == toID && ptr.ToUserID == fromID)).OrderByDescending(ptr => ptr.CreateDate).Take(take * 10).ToList();

                return new BaseModel<Chat>
                {
                    Result = new Chat()
                    {
                        FromID = fromID,
                        ToID = toID,
                        ChatHistories = listMessage,
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<Chat>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<string> SaveMessage(string from, string to, string content)
        {
            try
            {
                var db = DBC.Init;
                db.chat_history.Add(new chat_history()
                {
                    ID = Guid.NewGuid().ToString(),
                    CreateDate = DateTime.Now,
                    FromUserID = from,
                    IsReaded = false,
                    ToUserID = to,
                    Message = content
                });

                db.SaveChanges();
                return new BaseModel<string>();
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

        public string BUSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.BUS_EX,
                FunctionCode.API,
                FunctionCode.CHAT,
                id);
        }
        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.CHAT,
                id);
        }

    }
}
