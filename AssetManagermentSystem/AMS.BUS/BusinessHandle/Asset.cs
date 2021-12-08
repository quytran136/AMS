using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AMS.BUS.BusinessHandle
{
    public class Asset : IBaseHandle
    {

        public asset_classify Asset_Classify { get; set; }
        public asset_detail Asset_Detail { get; set; }
        public usage_history Usage_History { get; set; }
        public List<asset_detail> Asset_Details { get; set; }

        public BaseModel<asset_classify> UpdateAssetClassify(asset_classify assetclassify)
        {
            try
            {
                var db = DBC.Init;
                if (string.IsNullOrEmpty(assetclassify.ID))
                {
                    db.asset_classify.Add(new asset_classify()
                    {
                        ID = Guid.NewGuid().ToString(),
                        AssetClassifyName = assetclassify.AssetClassifyName,
                        CreateDate = DateTime.Now,
                        IsDelete = false,
                    });
                }
                else
                {
                    asset_classify classify = db.asset_classify.Where(ptr => ptr.IsDelete == false && ptr.ID == assetclassify.ID).ToList().FirstOrDefault();
                    if (classify == null)
                    {
                        return new BaseModel<asset_classify>()
                        {
                            Exception = new ExceptionHandle()
                            {
                                Code = BUSMessageCode(1)
                            }
                        };
                    }

                    classify.AssetClassifyName = assetclassify.AssetClassifyName;
                    classify.IsDelete = assetclassify.IsDelete;
                }

                db.SaveChanges();
                return new BaseModel<asset_classify>()
                {
                    Result = new asset_classify()
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<asset_classify>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<List<Asset>> GetAssetClassify(string classifyname)
        {
            try
            {
                var db = DBC.Init;
                List<asset_classify> ac = db.asset_classify.
                    Where(ptr => ptr.IsDelete == false && ptr.AssetClassifyName.Contains(classifyname)).
                    OrderByDescending(ptr => ptr.CreateDate)
                    .ToList()
                    .Select(ptr => new asset_classify()
                    {
                        ID = ptr.ID,
                        AssetClassifyName = ptr.AssetClassifyName,
                        CreateDate = ptr.CreateDate,
                        IsDelete = ptr.IsDelete
                    }).ToList();

                List<Asset> Assets = new List<Asset>();

                foreach (asset_classify item in ac)
                {
                    Assets.Add(new Asset()
                    {
                        Asset_Classify = item,
                        Asset_Details = db.asset_detail.Where(ptr => ptr.AssetClassifyID == item.ID && ptr.IsActive == true && ptr.IsDelete == false)
                                                        .ToList()
                                                        .Select(ptr => new asset_detail()
                                                        {
                                                            ID = ptr.ID,
                                                            AssetClassifyID = ptr.AssetClassifyID,
                                                            AssetFullName = ptr.AssetFullName,
                                                            CreateDate = ptr.CreateDate,
                                                            Description = ptr.Description,
                                                            IsActive = ptr.IsActive,
                                                            IsDelete = ptr.IsDelete,
                                                            Price = ptr.Price,
                                                            QuantityDestroyed = ptr.QuantityDestroyed,
                                                            QuantityInStock = ptr.QuantityInStock,
                                                            QuantityOriginalStock = ptr.QuantityOriginalStock,
                                                            QuantityUsed = ptr.QuantityUsed,
                                                            StoreID = ptr.StoreID,
                                                            TicketID = ptr.TicketID,
                                                            Unit = ptr.Unit
                                                        }).ToList()
                    });
                }

                return new BaseModel<List<Asset>>()
                {
                    Result = Assets
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<Asset>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<asset_classify> GetAssetClassifyDetail(string id)
        {
            try
            {
                var db = DBC.Init;
                asset_classify ac = db.asset_classify.Where(ptr => ptr.IsDelete == false).ToList().Select(ptr => new asset_classify()
                {
                    ID = ptr.ID,
                    AssetClassifyName = ptr.AssetClassifyName,
                    CreateDate = ptr.CreateDate,
                    IsDelete = ptr.IsDelete
                }).FirstOrDefault();
                return new BaseModel<asset_classify>()
                {
                    Result = ac
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<asset_classify>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<List<asset_detail>> GetAsset(asset_classify assetClassifyID)
        {
            try
            {
                var db = DBC.Init;
                List<asset_detail> ad = db.asset_detail.Where(ptr => ptr.IsDelete == false && ptr.AssetClassifyID == assetClassifyID.ID).ToList().Select(ptr => new asset_detail()
                {
                    ID = ptr.ID,
                    AssetClassifyID = ptr.AssetClassifyID,
                    AssetFullName = ptr.AssetFullName,
                    CreateDate = ptr.CreateDate,
                    Price = ptr.Price,
                    QuantityOriginalStock = ptr.QuantityOriginalStock,
                    QuantityInStock = ptr.QuantityOriginalStock,
                    QuantityUsed = ptr.QuantityUsed,
                    QuantityDestroyed = ptr.QuantityDestroyed,
                    StoreID = ptr.StoreID,
                    IsDelete = ptr.IsDelete,
                }).ToList();
                return new BaseModel<List<asset_detail>>()
                {
                    Result = ad
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<asset_detail>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<asset_detail> GetAsset(string id)
        {
            try
            {
                var db = DBC.Init;
                asset_detail ad = db.asset_detail.Where(ptr => ptr.ID == id).ToList().Select(ptr => new asset_detail()
                {
                    ID = ptr.ID,
                    AssetClassifyID = ptr.AssetClassifyID,
                    AssetFullName = ptr.AssetFullName,
                    CreateDate = ptr.CreateDate,
                    Price = ptr.Price,
                    QuantityOriginalStock = ptr.QuantityOriginalStock,
                    QuantityInStock = ptr.QuantityOriginalStock,
                    QuantityUsed = ptr.QuantityUsed,
                    QuantityDestroyed = ptr.QuantityDestroyed,
                    StoreID = ptr.StoreID,
                    IsDelete = ptr.IsDelete,
                }).ToList().FirstOrDefault();
                return new BaseModel<asset_detail>()
                {
                    Result = ad
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<asset_detail>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<List<Asset>> GetAssetByUser(string id)
        {
            try
            {
                var db = DBC.Init;
                List<Asset> ad1 = (from us in db.usage_history
                                   join ad in db.asset_detail on us.AssetID equals ad.ID
                                   where us.UsageFor == id && us.IsUsed == true
                                   select new
                                   {
                                       ID = ad.ID,
                                       AssetClassifyID = ad.AssetClassifyID,
                                       AssetFullName = ad.AssetFullName,
                                       CreateDate = ad.CreateDate,
                                       Price = ad.Price,
                                       QuantityUsed = us.Quantity,
                                       StoreID = ad.StoreID,
                                       IsDelete = ad.IsDelete,
                                       Description = ad.Description,
                                       Unit = ad.Unit,
                                       UsageHistoryID = us.ID,
                                       CreateDateUsage = us.CreateDate
                                   }).ToList().Select(ptr => new Asset()
                                   {
                                       Asset_Detail = new asset_detail()
                                       {
                                           ID = ptr.ID,
                                           AssetClassifyID = ptr.AssetClassifyID,
                                           AssetFullName = ptr.AssetFullName,
                                           CreateDate = ptr.CreateDate,
                                           Price = ptr.Price,
                                           QuantityUsed = ptr.QuantityUsed,
                                           StoreID = ptr.StoreID,
                                           IsDelete = ptr.IsDelete,
                                           Description = ptr.Description,
                                           Unit = ptr.Unit
                                       },
                                       Usage_History = new usage_history()
                                       {
                                           ID = ptr.UsageHistoryID,
                                           CreateDate = ptr.CreateDateUsage
                                       }
                                   }).ToList();

                return new BaseModel<List<Asset>>()
                {
                    Result = ad1
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<Asset>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }
        public BaseModel<string> UpdateAsset(asset_detail detail)
        {
            try
            {
                var db = DBC.Init;
                if (string.IsNullOrEmpty(detail.ID))
                {
                    db.asset_detail.Add(new asset_detail()
                    {
                        ID = Guid.NewGuid().ToString(),
                        AssetClassifyID = detail.AssetClassifyID,
                        AssetFullName = detail.AssetFullName,
                        CreateDate = DateTime.Now,
                        Price = detail.Price,
                        QuantityOriginalStock = detail.QuantityOriginalStock,
                        QuantityInStock = detail.QuantityOriginalStock,
                        QuantityUsed = 0,
                        QuantityDestroyed = 0,
                        StoreID = detail.StoreID,
                        IsDelete = false,
                    });
                }
                else
                {
                    asset_detail ad = db.asset_detail.Where(ptr => ptr.ID == detail.ID && ptr.IsDelete == false).ToList().FirstOrDefault();
                    if (ad == null)
                    {
                        return new BaseModel<string>()
                        {
                            Exception = new ExceptionHandle()
                            {
                                Code = BUSMessageCode(2)
                            }
                        };
                    }
                    ad.AssetClassifyID = detail.AssetClassifyID;
                    ad.AssetFullName = detail.AssetFullName;
                    ad.Price = detail.Price;
                    ad.StoreID = detail.StoreID;
                    ad.IsDelete = detail.IsDelete;
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

        public BaseModel<string> UpdateAssetRanger(List<asset_detail> details)
        {
            try
            {
                var db = DBC.Init;
                foreach (asset_detail item in details)
                {
                    if (string.IsNullOrEmpty(item.ID))
                    {
                        db.asset_detail.Add(new asset_detail()
                        {
                            ID = Guid.NewGuid().ToString(),
                            AssetClassifyID = item.AssetClassifyID,
                            AssetFullName = item.AssetFullName,
                            CreateDate = DateTime.Now,
                            Price = item.Price,
                            QuantityOriginalStock = item.QuantityOriginalStock,
                            QuantityInStock = item.QuantityOriginalStock,
                            QuantityUsed = 0,
                            QuantityDestroyed = 0,
                            StoreID = item.StoreID,
                            IsDelete = false,
                        });
                    }
                    else
                    {
                        asset_detail ad = db.asset_detail.Where(ptr => ptr.ID == item.ID && ptr.IsDelete == false).ToList().FirstOrDefault();
                        if (ad == null)
                        {
                            return new BaseModel<string>()
                            {
                                Exception = new ExceptionHandle()
                                {
                                    Code = BUSMessageCode(2)
                                }
                            };
                        }
                        ad.AssetClassifyID = item.AssetClassifyID;
                        ad.AssetFullName = item.AssetFullName;
                        ad.Price = item.Price;
                        ad.StoreID = item.StoreID;
                        ad.IsDelete = item.IsDelete;
                    }
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
                FunctionCode.ASSET,
                id);
        }
        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.ASSET,
                id);
        }
    }
}
