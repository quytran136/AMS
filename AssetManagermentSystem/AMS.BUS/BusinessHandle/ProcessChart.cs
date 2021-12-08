using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AMS.BUS.BusinessHandle
{
    public class ProcessChart : IBaseHandle
    {
        public Process Process { get; set; }
        public ProcessStep Node { get; set; }
        public ProcessChart Child { get; set; }
        private string ProcessID { get; set; }
        private List<ProcessStep> processStepCreate = new List<ProcessStep>();
        private List<ProcessStep> processStepUpdate = new List<ProcessStep>();

        public string BUSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.BUS_EX,
                FunctionCode.API,
                FunctionCode.PROCESSFLOW,
                id);
        }

        public string SYSMessageCode(int id)
        {
            return string.Format("{0}{1}{2}{3}",
                FunctionCode.SYS_EX,
                FunctionCode.API,
                FunctionCode.PROCESSFLOW,
                id);
        }

        public BaseModel<List<Process>> GetProcess(string processName)
        {
            try
            {
                var db = DBC.Init;
                return new BaseModel<List<Process>>()
                {
                    Result = db.Processes.Where(ptr => ptr.IsDelete == false && ptr.ProcessName.Contains(processName)).ToList().Select(ptr => new Process() {
                        ID = ptr.ID,
                        IsDelete = ptr.IsDelete,
                        IsLock = ptr.IsLock,
                        ProcessName = ptr.ProcessName
                    }).ToList()
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<List<Process>>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        public BaseModel<ProcessChart> GetProcessDetail(string processID)
        {
            try
            {
                var db = DBC.Init;
                ProcessChart processFlow = new ProcessChart()
                {
                    Process = db.Processes.Where(ptr => ptr.ID == processID && ptr.IsDelete == false).ToList().Select(ptr => new Process() { 
                        ID = ptr.ID,
                        IsDelete = ptr.IsDelete,
                        IsLock = ptr.IsLock,
                        ProcessName = ptr.ProcessName
                    }).ToList().FirstOrDefault(),
                    Child = GetFlow(processID),
                };

                return new BaseModel<ProcessChart>()
                {
                    Result = processFlow
                };
            }
            catch (Exception ex)
            {
                return new BaseModel<ProcessChart>()
                {
                    Exception = new ExceptionHandle()
                    {
                        Code = SYSMessageCode(1),
                        Exception = ex
                    }
                };
            }
        }

        private ProcessChart BuildFlow(ProcessStep step, List<ProcessStep> processSteps)
        {
            ProcessStep stepT = processSteps.Where(ptr => ptr.ParentID == step.ID).FirstOrDefault();
            if (stepT == null)
            {
                return new ProcessChart();
            }

            return new ProcessChart()
            {
                Node = stepT,
                Child = this.BuildFlow(stepT, processSteps)
            };
        }

        private ProcessChart GetFlow(string processID)
        {
            try
            {
                var db = DBC.Init;
                List<ProcessStep> steps = db.ProcessSteps.Where(ptr => ptr.ProcessID == processID && ptr.IsDelete == false).ToList().Select(ptr => new ProcessStep() { 
                    ID = ptr.ID,
                    Approvers = ptr.Approvers,
                    ExpiredTime = ptr.ExpiredTime,
                    Description = ptr.Description,
                    IsUseExpiredTime = ptr.IsUseExpiredTime,
                    ParentID = ptr.ParentID,
                    ProcessID = ptr.ProcessID,
                    StepName = ptr.StepName,
                    IsDelete = ptr.IsDelete
                }).ToList();

                if (steps.Count == 0)
                {
                    return new ProcessChart();
                }

                ProcessStep firtStep = steps.Where(ptr => string.IsNullOrEmpty(ptr.ParentID)).FirstOrDefault();
                ProcessChart flow = new ProcessChart()
                {
                    Node = firtStep,
                    Child = this.BuildFlow(firtStep, steps)
                };

                return flow;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ProcessChart UpdateProcess(string ProcessName, string processID, bool isDelete, bool isLock)
        {
            try
            {
                var db = DBC.Init;
                if (string.IsNullOrEmpty(processID))
                {
                    Process process = new Process()
                    {
                        ID = Guid.NewGuid().ToString(),
                        ProcessName = ProcessName,
                        IsDelete = false,
                        IsLock = false,
                    };
                    db.Processes.Add(process);
                    this.ProcessID = process.ID;
                }
                else
                {
                    Process process = db.Processes.Where(ptr => ptr.ID == processID).ToList().FirstOrDefault();
                    if (process == null)
                    {
                        Process processT = new Process()
                        {
                            ID = Guid.NewGuid().ToString(),
                            ProcessName = ProcessName,
                            IsDelete = false,
                            IsLock = false,
                        };
                        db.Processes.Add(processT);
                        ProcessID = processT.ID;
                    }
                    else
                    {
                        process.ProcessName = ProcessName;
                        process.IsDelete = isDelete;
                        process.IsLock = isLock;
                        ProcessID = process.ID;
                    }
                }
                db.SaveChanges();
                return this;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ProcessChart UpdateFlow(string creator, ProcessChart flow, string parentID = "")
        {
            try
            {
                if (flow == null)
                {
                    return new ProcessChart();
                }
                if (string.IsNullOrEmpty(flow.Node.ID))
                {
                    string id = Guid.NewGuid().ToString();
                    ProcessStep processStep = new ProcessStep()
                    {
                        ID = id,
                        Approvers = flow.Node.Approvers,
                        Description = flow.Node.Description,
                        ExpiredTime = flow.Node.ExpiredTime,
                        IsUseExpiredTime = flow.Node.IsUseExpiredTime,
                        ParentID = parentID,
                        ProcessID = ProcessID,
                        StepName = flow.Node.StepName,
                        UserID = creator,
                        IsDelete = false
                    };
                    processStepCreate.Add(processStep);
                    this.UpdateFlow(creator, flow.Child, id);
                }
                else
                {
                    processStepUpdate.Add(flow.Node);
                    this.UpdateFlow(creator, flow.Child, flow.Node.ID);
                }

                return this;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BaseModel<string> SaveChange()
        {
            try
            {
                var db = DBC.Init;
                if (processStepCreate != null && processStepCreate.Count > 0)
                {
                    db.ProcessSteps.AddRange(processStepCreate);
                }

                if (processStepUpdate != null && processStepUpdate.Count > 0)
                {
                    foreach (var item in processStepUpdate)
                    {
                        ProcessStep processStep = db.ProcessSteps.Where(ptr => ptr.ID == item.ID).FirstOrDefault();
                        processStep.ExpiredTime = item.ExpiredTime;
                        processStep.Approvers = item.Approvers;
                        processStep.IsUseExpiredTime = item.IsUseExpiredTime;
                        processStep.Description = item.Description;
                        processStep.StepName = item.StepName;
                        processStep.IsDelete = item.IsDelete;
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
    }
}
