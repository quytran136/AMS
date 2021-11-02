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
    public class DepartmentChart : IBaseHandle
    {
        public Department Node { get; set; }
        public List<Department> Childs { get; set; }


        public BaseModel<DepartmentChart> GetChart()
        {
            try
            {
                var db = DBC.Init;
                Department department = db.Departments.Where(ptr => ptr.ParentID == null).ToList().FirstOrDefault();

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
                List<Department> departments = db.Departments.Where(ptr => ptr.ParentID == department.ID).ToList();
                if (departments == null)
                {
                    return new BaseModel<DepartmentChart>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(5)
                        }
                    };
                }

                DepartmentChart departmentChart = new DepartmentChart()
                {
                    Node = department,
                    Childs = departments
                };

                // get all chart
                return new BaseModel<DepartmentChart>()
                {
                    Result = this.BuildChart(departmentChart)
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

        private DepartmentChart BuildChart(DepartmentChart node)
        {
            try
            {
                var db = DBC.Init;
                foreach (var item in node.Childs)
                {
                    Department department = db.Departments.Where(ptr => ptr.ParentID == item.ID).ToList().FirstOrDefault();

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BaseModel<Department> AddNew(string parentID, List<string> DepartmentName)
        {
            try
            {
                var db = DBC.Init;
                if (string.IsNullOrEmpty(parentID))
                {
                    List<Department> departments = new List<Department>();
                    foreach (string item in DepartmentName)
                    {
                        Department department = new Department()
                        {
                            ParentID = null,
                            DepartmentName = item,
                            ID = Guid.NewGuid().ToString(),
                        };

                        departments.Add(department);
                    }
                    db.Departments.AddRange(departments);
                    db.SaveChanges();
                }
                else
                {
                    Department departmentParent = db.Departments.Where(ptr => ptr.ID == parentID).ToList().FirstOrDefault();
                    if (departmentParent == null)
                    {
                        return new BaseModel<Department>()
                        {
                            Exception = new ExceptionHandle()
                            {
                                Code = BUSMessageCode(1),
                            }
                        };
                    }
                    List<Department> departments = new List<Department>();
                    foreach (string item in DepartmentName)
                    {
                        Department department = new Department()
                        {
                            ParentID = departmentParent.ID,
                            DepartmentName = item,
                            ID = Guid.NewGuid().ToString(),
                        };

                        departments.Add(department);
                    }
                    db.Departments.AddRange(departments);
                    db.SaveChanges();
                }
                return new BaseModel<Department>();
            }
            catch (Exception ex)
            {
                return new BaseModel<Department>()
                {
                    Exception = new ExceptionHandle
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<Department> Remove(string departmentID)
        {
            try
            {
                var db = DBC.Init;
                List<Department> departments = db.Departments.Where(ptr => ptr.ID == departmentID || ptr.ParentID == departmentID).ToList();
                if (departments == null)
                {
                    return new BaseModel<Department>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(2),
                        }
                    };
                }
                db.Departments.RemoveRange(departments);
                db.SaveChanges();
                return new BaseModel<Department>();
            }
            catch (Exception ex)
            {
                return new BaseModel<Department>()
                {
                    Exception = new ExceptionHandle
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<Department> Edit(string departmentID, string departmentName)
        {
            try
            {
                var db = DBC.Init;
                Department department = db.Departments.Where(ptr => ptr.ID == departmentID).ToList().FirstOrDefault();
                if (department == null)
                {
                    return new BaseModel<Department>()
                    {
                        Exception = new ExceptionHandle()
                        {
                            Code = BUSMessageCode(3),
                        }
                    };
                }
                department.DepartmentName = departmentName;
                db.SaveChanges();
                return new BaseModel<Department>();
            }
            catch (Exception ex)
            {
                return new BaseModel<Department>()
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
