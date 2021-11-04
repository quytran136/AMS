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
    public class DepartmentChart : IBaseHandle
    {
        public Department Node { get; set; }
        public List<DepartmentChart> Childs { get; set; }
        private List<Department> ListDepartmentUpdate = new List<Department>();
        private List<Department> ListDepartmentUpdateData = new List<Department>();


        public BaseModel<DepartmentChart> GetChart()
        {
            try
            {
                var db = DBC.Init;
                List<Department> departments = db.Departments.Where(ptr => ptr.IsDelete == false).ToList();
                Department department = db.Departments.Where(ptr => ptr.ParentID == string.Empty && ptr.IsDelete == false).ToList().FirstOrDefault();

                if (department == null)
                {
                    return new BaseModel<DepartmentChart>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(4)
                        }
                    };
                }

                // get all chart
                return new BaseModel<DepartmentChart>()
                {
                    Result = new DepartmentChart()
                    {
                        Node = department,
                        Childs = this.BuildChart(department, departments)
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<DepartmentChart>()
                {
                    Exception = new ExceptionHandle
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        private List<DepartmentChart> BuildChart(Department node, List<Department> departmentsT)
        {
            try
            {
                var db = DBC.Init;
                List<Department> departments = departmentsT.Where(ptr => ptr.ParentID == node.ID).ToList();
                if (departments == null || departments.Count == 0)
                {
                    return new List<DepartmentChart>();
                }
                else
                {
                    List<DepartmentChart> departmentCharts = new List<DepartmentChart>();
                    foreach (Department item in departments)
                    {
                        departmentCharts.Add(new DepartmentChart()
                        {
                            Node = item,
                            Childs = this.BuildChart(item, departmentsT)
                        });
                    }
                    return departmentCharts;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private BaseModel<string> UpdateChart(string nodeParent, DepartmentChart departmentNew, List<Department> departments)
        {
            try
            {
                if (departmentNew == null)
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
                    foreach (DepartmentChart item in departmentNew.Childs)
                    {
                        string ID = Guid.NewGuid().ToString();
                        if (string.IsNullOrEmpty(item.Node.ID))
                        {
                            Department dep = new Department()
                            {
                                ID = ID,
                                DepartmentName = item.Node.DepartmentName,
                                ParentID = nodeParent,
                                IsDelete = false
                            };
                            ListDepartmentUpdate.Add(dep);
                        }
                        else
                        {
                            Department node = departments.Where(ptr => ptr.ID == item.Node.ID).ToList().FirstOrDefault();
                            if (node != null)
                            {
                                if (item.Node.DepartmentName != node.DepartmentName &&
                                    item.Node.IsDelete == false &&
                                    !string.IsNullOrEmpty(item.Node.ID))
                                {
                                    ListDepartmentUpdateData.Add(new Department()
                                    {
                                        ID = item.Node.ID,
                                        DepartmentName = item.Node.DepartmentName,
                                        ParentID = item.Node.ParentID,
                                        IsDelete = false
                                    });
                                }

                                if (item.Node.IsDelete == true)
                                {
                                    ListDepartmentUpdateData.Add(new Department()
                                    {
                                        ID = item.Node.ID,
                                        DepartmentName = item.Node.DepartmentName,
                                        ParentID = item.Node.ParentID,
                                        IsDelete = true
                                    });
                                }
                            }
                        }

                        UpdateChart(ID, item, departments);
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

        public BaseModel<string> UpdateChart(DepartmentChart DepartmentChartNew)
        {
            try
            {
                var db = DBC.Init;
                List<Department> departments = db.Departments.ToList();
                if (departments == null)
                {
                    return new BaseModel<string>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(1),
                        }
                    };
                }
                else
                {
                    List<DepartmentChart> listT = new List<DepartmentChart>();
                    listT.Add(DepartmentChartNew);
                    BaseModel<string> data = UpdateChart(string.Empty, new DepartmentChart()
                    {
                        Node = new Department(),
                        Childs = listT
                    }, departments);
                    if (!string.IsNullOrEmpty(data.Exception.Code))
                    {
                        return new BaseModel<string>()
                        {
                            Exception = data.Exception
                        };
                    }

                    db.Departments.AddRange(ListDepartmentUpdate);
                    foreach (Department item in ListDepartmentUpdateData)
                    {
                        Department dep = db.Departments.Where(ptr => ptr.ID == item.ID).ToList().FirstOrDefault();
                        dep.DepartmentName = item.DepartmentName;
                        dep.IsDelete = item.IsDelete;
                        dep.ParentID = item.ParentID;
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
                FunctionCode.DEPARTMENT,
                id);
        }

        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.DEPARTMENT,
                id);
        }
    }
}
