using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using AMS.COMMON.Constands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusinessHandle
{
    public class OrganizationalChart : IBaseHandle
    {
        public Organizational Node { get; set; }
        public List<OrganizationalChart> Childs { get; set; }
        private List<Organizational> ListOrganizationalUpdate = new List<Organizational>();
        private List<Organizational> ListOrganizationalUpdateData = new List<Organizational>();


        public BaseModel<OrganizationalChart> GetChart(string DepartmentID)
        {
            try
            {
                var db = DBC.Init;
                List<Organizational> Organizationals = db.Organizationals.Where(ptr => ptr.DepartmentID == DepartmentID && ptr.IsDelete == false).ToList().Select(ptr => new Organizational()
                {
                    DepartmentID = ptr.DepartmentID,
                    ID = ptr.ID,
                    IsDelete = ptr.IsDelete,
                    ParentID = ptr.ParentID,
                    OrganizationalName = ptr.OrganizationalName,
                }).ToList();
                Organizational Organizational = db.Organizationals.Where(ptr => ptr.ParentID == string.Empty &&
                                                ptr.DepartmentID == DepartmentID &&
                                                ptr.IsDelete == false).ToList().Select(ptr => new Organizational()
                                                {
                                                    DepartmentID = ptr.DepartmentID,
                                                    ID = ptr.ID,
                                                    IsDelete = ptr.IsDelete,
                                                    ParentID = ptr.ParentID,
                                                    OrganizationalName = ptr.OrganizationalName,
                                                }).FirstOrDefault();

                if (Organizational == null)
                {

                    Organizational org = new Organizational()
                    {
                        OrganizationalName = "new node",
                        ID = Guid.NewGuid().ToString(),
                        DepartmentID = DepartmentID,
                        IsDelete = false,
                        ParentID = string.Empty
                    };
                    db.Organizationals.Add(org);
                    db.SaveChanges();
                    return GetChart(DepartmentID);
                }

                // get all chart
                return new BaseModel<OrganizationalChart>()
                {
                    Result = new OrganizationalChart()
                    {
                        Node = Organizational,
                        Childs = this.BuildChart(Organizational, Organizationals)
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<OrganizationalChart>()
                {
                    Exception = new ExceptionHandle
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        private List<OrganizationalChart> BuildChart(Organizational node, List<Organizational> OrganizationalsT)
        {
            try
            {
                var db = DBC.Init;
                List<Organizational> Organizationals = OrganizationalsT.Where(ptr => ptr.ParentID == node.ID).ToList();
                if (Organizationals == null || Organizationals.Count == 0)
                {
                    return new List<OrganizationalChart>();
                }
                else
                {
                    List<OrganizationalChart> OrganizationalCharts = new List<OrganizationalChart>();
                    foreach (Organizational item in Organizationals)
                    {
                        OrganizationalCharts.Add(new OrganizationalChart()
                        {
                            Node = item,
                            Childs = this.BuildChart(item, OrganizationalsT)
                        });
                    }
                    return OrganizationalCharts;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private BaseModel<string> UpdateChart(string departmentID, string parentID, OrganizationalChart OrganizationalNew, List<Organizational> Organizationals)
        {
            try
            {
                if (OrganizationalNew == null)
                {
                    return new BaseModel<string>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(5)
                        }
                    };
                }
                else
                {
                    foreach (OrganizationalChart item in OrganizationalNew.Childs)
                    {
                        string ID = Guid.NewGuid().ToString();
                        if (string.IsNullOrEmpty(item.Node.ID) && item.Node.IsDelete == false)
                        {
                            Organizational org = new Organizational()
                            {
                                ID = ID,
                                OrganizationalName = item.Node.OrganizationalName,
                                ParentID = parentID,
                                DepartmentID = departmentID,
                                IsDelete = false
                            };
                            ListOrganizationalUpdate.Add(org);
                        }
                        else
                        {
                            Organizational node = Organizationals.Where(ptr => ptr.ID == item.Node.ID).ToList().FirstOrDefault();
                            if (node != null)
                            {
                                if (item.Node.OrganizationalName != node.OrganizationalName &&
                                    item.Node.IsDelete == false &&
                                    !string.IsNullOrEmpty(item.Node.ID))
                                {
                                    ListOrganizationalUpdateData.Add(new Organizational()
                                    {
                                        ID = item.Node.ID,
                                        OrganizationalName = item.Node.OrganizationalName,
                                        ParentID = item.Node.ParentID,
                                        DepartmentID = item.Node.DepartmentID,
                                        IsDelete = false
                                    });
                                }

                                if (item.Node.IsDelete == true && string.IsNullOrEmpty(item.Node.ID) == false)
                                {
                                    ListOrganizationalUpdateData.Add(new Organizational()
                                    {
                                        ID = item.Node.ID,
                                        OrganizationalName = item.Node.OrganizationalName,
                                        ParentID = item.Node.ParentID,
                                        DepartmentID = item.Node.DepartmentID,
                                        IsDelete = true
                                    });
                                }
                            }
                        }

                        UpdateChart(departmentID, string.IsNullOrEmpty(item.Node.ID) ? ID : item.Node.ID, item, Organizationals);
                    }

                    return new BaseModel<string>()
                    {
                        Result = MessagesValue.SUCCESS
                    };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BaseModel<string> UpdateChart(string departmentID, OrganizationalChart OrganizationalChartNew)
        {
            try
            {
                var db = DBC.Init;
                List<Organizational> Organizationals = db.Organizationals.Where(ptr => ptr.DepartmentID == departmentID && ptr.IsDelete == false).ToList();
                if (Organizationals == null)
                {
                    db.Organizationals.Add(new Organizational()
                    {
                        ID = Guid.NewGuid().ToString(),
                        OrganizationalName = "New one",
                        DepartmentID = departmentID,
                        IsDelete = false,
                        ParentID = string.Empty,
                    });
                    db.SaveChanges();
                    return UpdateChart(departmentID, OrganizationalChartNew);
                }
                else
                {
                    List<OrganizationalChart> listT = new List<OrganizationalChart>();
                    listT.Add(OrganizationalChartNew);
                    BaseModel<string> data = UpdateChart(departmentID, string.Empty, new OrganizationalChart()
                    {
                        Node = new Organizational(),
                        Childs = listT
                    }, Organizationals);
                    if (!string.IsNullOrEmpty(data.Exception.Code))
                    {
                        return new BaseModel<string>()
                        {
                            Exception = data.Exception
                        };
                    }

                    db.Organizationals.AddRange(ListOrganizationalUpdate);
                    foreach (Organizational item in ListOrganizationalUpdateData)
                    {
                        Organizational org = db.Organizationals.Where(ptr => ptr.ID == item.ID).ToList().FirstOrDefault();
                        org.OrganizationalName = item.OrganizationalName;
                        org.IsDelete = item.IsDelete;
                        org.ParentID = item.ParentID;
                        org.DepartmentID = item.DepartmentID;
                    }
                    db.SaveChanges();
                    return new BaseModel<string>()
                    {
                        Result = MessagesValue.SUCCESS
                    };
                }
            }
            catch (Exception ex)
            {
                return new BaseModel<string>()
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
                FunctionCode.ORGANIZATIONAL,
                id);
        }

        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.ORGANIZATIONAL,
                id);
        }
    }
}
