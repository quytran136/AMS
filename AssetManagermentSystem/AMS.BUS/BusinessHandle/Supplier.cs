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
    public class Supplier : IBaseHandle
    {
        public BaseModel<string> Update(supplier supplier)
        {
            try
            {
                var db = DBC.Init;
                var supp = db.suppliers.FirstOrDefault(x => x.ID == supplier.ID);
                if (supp != null)
                {
                    supp.Name = supplier.Name;
                    supp.Email = supplier.Email;
                    supp.Phone = supplier.Phone;
                    supp.IsDelete = supplier.IsDelete;
                    supp.Image = supplier.Image;
                }
                else
                {
                    db.suppliers.Add(new supplier()
                    {
                        ID = Guid.NewGuid().ToString(),
                        Name = supplier.Name,
                        CreateDate = DateTime.Now,
                        Phone = supplier.Phone,
                        Email = supplier.Email,
                        IsDelete = false,
                        Image = supplier.Image,
                    });
                }

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

        public BaseModel<List<supplier>> GetByName(string name)
        {
            try
            {
                var db = DBC.Init;
                var supplier = db.suppliers
                    .Where(x => x.IsDelete == false && x.Name.Contains(name))
                    .OrderByDescending(x => x.CreateDate)
                    .ToList()
                    .Select(x => new supplier()
                    {
                        ID = x.ID,
                        Name = x.Name,
                        Phone = x.Phone,
                        Email = x.Email,
                        Image = x.Image,
                    })
                    .ToList();
                return new BaseModel<List<supplier>>()
                {
                    Result = supplier
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<supplier>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<supplier> GetById(string id)
        {
            try
            {
                var db = DBC.Init;
                var supplier = db.suppliers.FirstOrDefault(x => x.IsDelete == false && x.ID == id);
                return new BaseModel<supplier>()
                {
                    Result = new supplier()
                    {
                        ID = supplier.ID,
                        Name = supplier.Name,
                        Email = supplier.Email,
                        Phone = supplier.Phone,
                        Image = supplier.Image,
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<supplier>()
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
                FunctionCode.SUPPLIER,
                id);
        }

        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.SUPPLIER,
                id);
        }
    }
}
