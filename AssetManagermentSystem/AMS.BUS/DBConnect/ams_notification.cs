//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AMS.BUS.DBConnect
{
    using System;
    using System.Collections.Generic;
    
    public partial class ams_notification
    {
        public string ID { get; set; }
        public string NotificationContent { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<bool> IsRead { get; set; }
        public string Action { get; set; }
        public string NotificationFor { get; set; }
    }
}