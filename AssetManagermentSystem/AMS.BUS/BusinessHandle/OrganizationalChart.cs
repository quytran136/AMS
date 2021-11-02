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
    public class OrganizationalChart : IBaseHandle
    {
        public BaseModel<Organizational> AddNew(string parentID, List<string> OrganizationalName)
        {
            try
            {
                var db = DBC.Init;
                if (string.IsNullOrEmpty(parentID))
                {
                    List<Organizational> Organizationals = new List<Organizational>();
                    foreach (string item in OrganizationalName)
                    {
                        Organizational Organizational = new Organizational()
                        {
                            ParentID = null,
                            OrganizationalName = item,
                            ID = Guid.NewGuid().ToString(),
                        };

                        Organizationals.Add(Organizational);
                    }
                    db.Organizationals.AddRange(Organizationals);
                    db.SaveChanges();
                }
                else
                {
                    Organizational OrganizationalParent = db.Organizationals.Where(ptr => ptr.ID == parentID).ToList().FirstOrDefault();
                    if (OrganizationalParent == null)
                    {
                        return new BaseModel<Organizational>()
                        {
                            Exception = new ExceptionHandle()
                            {
                                Code = BUSMessageCode(1),
                            }
                        };
                    }
                    List<Organizational> Organizationals = new List<Organizational>();
                    foreach (string item in OrganizationalName)
                    {
                        Organizational Organizational = new Organizational()
                        {
                            ParentID = OrganizationalParent.ID,
                            OrganizationalName = item,
                            ID = Guid.NewGuid().ToString(),
                        };

                        Organizationals.Add(Organizational);
                    }
                    db.Organizationals.AddRange(Organizationals);
                    db.SaveChanges();
                }
                return new BaseModel<Organizational>();
            }
            catch (Exception ex)
            {
                return new BaseModel<Organizational>()
                {
                    Exception = new ExceptionHandle
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<Organizational> Remove(string OrganizationalID)
        {
            try
            {
                var db = DBC.Init;
                List<Organizational> Organizationals = db.Organizationals.Where(ptr => ptr.ID == OrganizationalID || ptr.ParentID == OrganizationalID).ToList();
                if (Organizationals == null)
                {
                    return new BaseModel<Organizational>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(2),
                        }
                    };
                }
                db.Organizationals.RemoveRange(Organizationals);
                db.SaveChanges();
                return new BaseModel<Organizational>();
            }
            catch (Exception ex)
            {
                return new BaseModel<Organizational>()
                {
                    Exception = new ExceptionHandle
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<Organizational> Edit(string OrganizationalID, string OrganizationalName)
        {
            try
            {
                var db = DBC.Init;
                Organizational Organizational = db.Organizationals.Where(ptr => ptr.ID == OrganizationalID).ToList().FirstOrDefault();
                if (Organizational == null)
                {
                    return new BaseModel<Organizational>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(3),
                        }
                    };
                }
                Organizational.OrganizationalName = OrganizationalName;
                db.SaveChanges();
                return new BaseModel<Organizational>();
            }
            catch (Exception ex)
            {
                return new BaseModel<Organizational>()
                {
                    Exception = new ExceptionHandle
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
                FunctionCode.ORG,
                id);
        }

        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.ORG,
                id);
        }
    }
}
