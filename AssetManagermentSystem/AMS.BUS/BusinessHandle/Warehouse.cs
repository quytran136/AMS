using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AMS.BUS.BusinessHandle
{
    public class Warehouse : IBaseHandle
    {
        public BaseModel<List<store_Identifie>> GetWarehouse(store_Identifie store)
        {
            try
            {
                var db = DBC.Init;
                List<store_Identifie> si = db.store_Identifie.Where(ptr => ptr.IsDelete == false && ptr.StoreName.Contains(store.StoreName)).ToList().Select(ptr => new store_Identifie()
                {
                    ID = ptr.ID,
                    CreateDate = ptr.CreateDate,
                    IsDelete = ptr.IsDelete,
                    Owner = ptr.Owner,
                    StoreName = ptr.StoreName
                }).ToList();

                return new BaseModel<List<store_Identifie>>()
                {
                    Result = si
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<store_Identifie>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }
        public BaseModel<store_Identifie> GetWarehouse(string id)
        {
            try
            {
                var db = DBC.Init;
                store_Identifie si = db.store_Identifie.Where(ptr => ptr.IsDelete == false && ptr.ID == id).ToList().Select(ptr => new store_Identifie()
                {
                    ID = ptr.ID,
                    CreateDate = ptr.CreateDate,
                    IsDelete = ptr.IsDelete,
                    Owner = ptr.Owner,
                    StoreName = ptr.StoreName
                }).ToList().FirstOrDefault();

                return new BaseModel<store_Identifie>()
                {
                    Result = si
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<store_Identifie>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }
        public BaseModel<string> UpdateWareHouse(store_Identifie store)
        {
            try
            {
                var db = DBC.Init;
                if (string.IsNullOrEmpty(store.ID))
                {
                    db.store_Identifie.Add(new store_Identifie()
                    {
                        ID = Guid.NewGuid().ToString(),
                        CreateDate = DateTime.Now,
                        StoreName = store.StoreName,
                        Owner = store.Owner,
                        IsDelete = false
                    });
                }
                else
                {
                    store_Identifie si = db.store_Identifie.Where(ptr => ptr.ID == store.ID && ptr.IsDelete == false).ToList().FirstOrDefault();
                    if (si == null)
                    {
                        return new BaseModel<string>()
                        {
                            Exception = new ExceptionHandle()
                            {
                                Code = BUSMessageCode(1)
                            }
                        };
                    }
                    si.StoreName = store.StoreName;
                    si.Owner = store.Owner;
                    si.IsDelete = store.IsDelete;
                }

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
        public string BUSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.BUS_EX,
                FunctionCode.API,
                FunctionCode.WAREHOUSE,
                id);
        }
        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.WAREHOUSE,
                id);
        }
    }
}
