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

        public BaseModel<Department> Edit()
        {

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
