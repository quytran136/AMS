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

        #region Metadata

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
                    Where(ptr => ptr.IsDelete == false && ptr.AssetClassifyName.Contains(classifyname))
                    .OrderByDescending(ptr => ptr.CreateDate)
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
                        Asset_Details = db.asset_detail.Where(ptr => ptr.AssetClassifyID == item.ID && 
                                                                    ptr.IsActive == true && 
                                                                    ptr.IsDelete == false && 
                                                                    ptr.ExpirationDate.Value >= DateTime.Now &&
                                                                    ptr.QuantityInStock > 0)
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
                List<asset_detail> ad = db.asset_detail
                    .Where(ptr => ptr.IsDelete == false && ptr.AssetClassifyID == assetClassifyID.ID)
                    .ToList()
                    .Select(ptr => new asset_detail()
                    {
                        AssetFullName = ptr.AssetFullName,
                        CreateDate = ptr.CreateDate,
                        Price = ptr.Price,
                        QuantityOriginalStock = ptr.QuantityOriginalStock,
                        QuantityInStock = ptr.QuantityOriginalStock,
                        QuantityUsed = ptr.QuantityUsed,
                        QuantityDestroyed = ptr.QuantityDestroyed,
                        ExpirationDate = ptr.ExpirationDate,
                    })
                    .ToList();

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
        #endregion

        #region nhập kho
        public BaseModel<string> CreateAssetShopping(List<invoice_detail> details, string ticketID, string storeID, string requestorID)
        {
            try
            {
                var db = DBC.Init;
                string invoiceID = Guid.NewGuid().ToString();
                var userInformation = new UserInformation().GetUserInfor(requestorID);
                db.invoices.Add(new invoice()
                {
                    ID = invoiceID,
                    CreateDate = DateTime.Now,
                    StoreID = storeID,
                    CreatorID = userInformation.Result.ID,
                    TicketID = ticketID,
                    IsReject = false,
                    IsPay = false
                });

                List<invoice_detail> listAsset = new List<invoice_detail>();
                foreach (invoice_detail item in details)
                {
                    listAsset.Add(new invoice_detail()
                    {
                        ID = Guid.NewGuid().ToString(),
                        AssetClassifyID = item.AssetClassifyID,
                        AssetFullName = item.AssetFullName,
                        Description = item.Description,
                        InvoiceID = invoiceID,
                        Quantity = item.Quantity,
                        Price = item.Price,
                        Unit = item.Unit,
                        SupplierID = item.SupplierID,
                        ExpirationDate = item.ExpirationDate,
                    });
                }

                db.invoice_detail.AddRange(listAsset);
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

        public List<asset_detail> GetAssetShopping(string requestID)
        {
            try
            {
                var db = DBC.Init;
                var listAsset = (from inv in db.invoices
                                 join invd in db.invoice_detail on inv.ID equals invd.InvoiceID
                                 where inv.TicketID == requestID
                                 select new
                                 {
                                     ID = invd.ID,
                                     AssetClassifyID = invd.AssetClassifyID,
                                     CreateDate = inv.CreateDate,
                                     AssetFullName = invd.AssetFullName,
                                     Description = invd.Description,
                                     Price = invd.Price,
                                     Unit = invd.Unit,
                                     QuantityOriginalStock = invd.Quantity,
                                     SupplierID = invd.SupplierID,
                                 })
                                 .ToList()
                                 .Select(ptr => new asset_detail()
                                 {
                                     ID = ptr.ID,
                                     AssetClassifyID = ptr.AssetClassifyID,
                                     CreateDate = ptr.CreateDate,
                                     AssetFullName = ptr.AssetFullName,
                                     Description = ptr.Description,
                                     Price = ptr.Price,
                                     Unit = ptr.Unit,
                                     QuantityOriginalStock = ptr.QuantityOriginalStock,
                                     SupplierID = ptr.SupplierID,
                                 }).ToList();
                if (listAsset == null)
                {
                    return new List<asset_detail>();
                }
                return listAsset;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public BaseModel<string> ApproveAddAsset(string requestID)
        {
            try
            {
                var db = DBC.Init;
                invoice invoice = db.invoices.FirstOrDefault(ptr => ptr.TicketID == requestID);
                if (invoice == null)
                {
                    return new BaseModel<string>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(2)
                        }
                    };
                }

                var invoiceDetail = (from inv in db.invoices
                                     join invd in db.invoice_detail on inv.ID equals invd.InvoiceID
                                     where inv.TicketID == requestID
                                     select invd).ToList();

                List<asset_detail> assets = new List<asset_detail>();
                foreach (invoice_detail item in invoiceDetail)
                {
                    assets.Add(new asset_detail()
                    {
                        ID = item.ID,
                        AssetClassifyID = item.AssetClassifyID,
                        AssetFullName = item.AssetFullName,
                        Description = item.Description,
                        Price = item.Price,
                        QuantityOriginalStock = item.Quantity,
                        QuantityInStock = item.Quantity,
                        SupplierID = item.SupplierID,
                        Unit = item.Unit,
                        QuantityDestroyed = 0,
                        IsActive = true,
                        IsDelete = false,
                        StoreID = invoice.StoreID,
                        CreateDate = DateTime.Now,
                        QuantityUsed = 0,
                        ExpirationDate = item.ExpirationDate,
                    });
                }
                db.asset_detail.AddRange(assets);
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

        public BaseModel<string> RejectAddAsset(string requestID)
        {
            try
            {
                var db = DBC.Init;
                List<invoice> assets = db.invoices
                                            .Where(ptr => ptr.TicketID == requestID)
                                            .ToList();
                foreach (invoice item in assets)
                {
                    item.IsReject = true;
                }
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
        #endregion

        #region Cấp phát
        public BaseModel<string> CreateAssetAllocation(List<usage_history> details, string ticketID)
        {
            try
            {
                var db = DBC.Init;

                List<usage_history> listUsageHistory = new List<usage_history>();
                foreach (usage_history item in details)
                {
                    listUsageHistory.Add(new usage_history()
                    {
                        ID = Guid.NewGuid().ToString(),
                        TicketID = ticketID,
                        AssetID = item.AssetID,
                        Quantity = item.Quantity,
                        UsageFor = item.UsageFor,
                        CreateDate = DateTime.Now,
                        IsLiquidation = false,
                        IsRecovery = false,
                        IsUsed = false,
                    });
                }

                db.usage_history.AddRange(listUsageHistory);
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

        public List<asset_detail> GetAssetAllocation(string requestID)
        {
            try
            {
                var db = DBC.Init;
                List<usage_history> usages = db.usage_history.Where(ptr => ptr.TicketID == requestID).ToList().Select(ptr => new usage_history()
                {
                    AssetID = ptr.AssetID,
                    ID = ptr.ID,
                    Quantity = ptr.Quantity,
                    TicketID = ptr.TicketID,
                    UsageFor = ptr.UsageFor
                }).ToList();

                List<asset_detail> assets = (from usa in db.usage_history
                                             join ad in db.asset_detail on usa.AssetID equals ad.ID
                                             where usa.TicketID == requestID
                                             select new
                                             {
                                                 ID = ad.ID,
                                                 AssetClassifyID = ad.AssetClassifyID,
                                                 QuantityOriginalStock = ad.QuantityOriginalStock,
                                                 CreateDate = ad.CreateDate,
                                                 AssetFullName = ad.AssetFullName,
                                                 Description = ad.Description,
                                                 Price = ad.Price,
                                                 QuantityInStock = ad.QuantityInStock,
                                                 Unit = ad.Unit,
                                                 QuantityUsed = usa.Quantity,
                                                 UsageFor = usa.UsageFor,
                                                 SupplierID = ad.SupplierID,
                                             }).ToList().Select(ptr => new asset_detail()
                                             {
                                                 ID = ptr.ID,
                                                 AssetClassifyID = ptr.AssetClassifyID,
                                                 QuantityOriginalStock = ptr.QuantityOriginalStock,
                                                 CreateDate = ptr.CreateDate,
                                                 AssetFullName = ptr.AssetFullName,
                                                 Description = ptr.Description,
                                                 Price = ptr.Price,
                                                 QuantityInStock = ptr.QuantityInStock,
                                                 Unit = ptr.Unit,
                                                 QuantityUsed = ptr.QuantityUsed,
                                                 SupplierID = ptr.SupplierID,
                                             }).ToList();

                if (assets == null)
                {
                    return new List<asset_detail>();
                }
                return assets;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public BaseModel<string> ApproveAssetAllocation(string requestID)
        {
            try
            {
                var db = DBC.Init;
                List<usage_history> usage_Histories = db.usage_history
                                                        .Where(ptr => ptr.TicketID == requestID)
                                                        .ToList();
                if (usage_Histories == null)
                {
                    return new BaseModel<string>();
                }
                foreach (usage_history item in usage_Histories)
                {
                    item.IsUsed = true;
                    item.IsLiquidation = false;
                    item.IsRecovery = false;
                    item.IsReject = false;
                    var ase = db.asset_detail.Where(ptr => ptr.ID == item.AssetID).ToList().FirstOrDefault();
                    ase.QuantityInStock = ase.QuantityInStock - item.Quantity;
                    ase.QuantityUsed = ase.QuantityUsed + item.Quantity;
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

        public BaseModel<string> RejectAssetAllocation(string requestID)
        {
            try
            {
                var db = DBC.Init;
                List<usage_history> assets = db.usage_history
                                            .Where(ptr => ptr.TicketID == requestID)
                                            .ToList();
                foreach (usage_history item in assets)
                {
                    item.IsUsed = false;
                    item.IsLiquidation = false;
                    item.IsRecovery = false;
                    item.IsReject = true;
                }
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
        #endregion

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
