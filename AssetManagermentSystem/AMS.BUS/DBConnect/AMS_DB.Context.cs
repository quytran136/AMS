﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class AMS_DBEntities : DbContext
    {
        public AMS_DBEntities()
            : base("name=AMS_DBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<asset_allocation_history> asset_allocation_history { get; set; }
        public virtual DbSet<asset_classify> asset_classify { get; set; }
        public virtual DbSet<asset_detail> asset_detail { get; set; }
        public virtual DbSet<asset_recovery_history> asset_recovery_history { get; set; }
        public virtual DbSet<assets_liquidation_history> assets_liquidation_history { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<function> functions { get; set; }
        public virtual DbSet<message_list> message_list { get; set; }
        public virtual DbSet<Organizational> Organizationals { get; set; }
        public virtual DbSet<Process> Processes { get; set; }
        public virtual DbSet<ProcessStep> ProcessSteps { get; set; }
        public virtual DbSet<rank> ranks { get; set; }
        public virtual DbSet<role> roles { get; set; }
        public virtual DbSet<role_function> role_function { get; set; }
        public virtual DbSet<role_view> role_view { get; set; }
        public virtual DbSet<store_Identifie> store_Identifie { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<system_log> system_log { get; set; }
        public virtual DbSet<user_identifie> user_identifie { get; set; }
        public virtual DbSet<view_page> view_page { get; set; }
    }
}
