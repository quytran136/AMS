using AMS.API.ChatHubManager;
using AMS.BUS.DBConnect;
using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace AMS.API.Jobs
{
    public class JobScheduler
    {
        public static async Task Start()
        {
            var tasks = new List<Task>();
            // construct a scheduler factory
            StdSchedulerFactory factory = new StdSchedulerFactory();

            // get a scheduler
            IScheduler scheduler = await factory.GetScheduler();
            await scheduler.Start();

            IJobDetail jobSync = JobBuilder.Create<SyncNitificationJob>()
                .WithIdentity("sync24", "gr24")
                .Build();
            ITrigger triggerSync = TriggerBuilder.Create()
                .WithIdentity("trigg24", "gr24")
                .StartNow()
                .WithSimpleSchedule(x => x
                    .WithIntervalInSeconds(10)
                    .RepeatForever())
                .Build();
            tasks.Add(scheduler.ScheduleJob(jobSync, triggerSync));


            if (tasks.Count() > 0)
            {
                await Task.WhenAll(tasks.ToArray());
            }
        }
    }

    public class SyncNitificationJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            ChatHub hub = new ChatHub();
            var db = DBC.Init;
            List<string> notis = db.sp_NewNotification().ToList();
            foreach (string id in notis)
            {
                hub.OnNotification(id);
            }
            await Console.Error.WriteLineAsync("Sync...");
        }
    }
}