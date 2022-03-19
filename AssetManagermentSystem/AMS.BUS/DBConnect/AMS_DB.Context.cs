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
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
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
    
        public virtual DbSet<ams_config> ams_config { get; set; }
        public virtual DbSet<ams_notification> ams_notification { get; set; }
        public virtual DbSet<asset_classify> asset_classify { get; set; }
        public virtual DbSet<asset_detail> asset_detail { get; set; }
        public virtual DbSet<chat_history> chat_history { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<function> functions { get; set; }
        public virtual DbSet<invoice> invoices { get; set; }
        public virtual DbSet<invoice_detail> invoice_detail { get; set; }
        public virtual DbSet<message_list> message_list { get; set; }
        public virtual DbSet<Organizational> Organizationals { get; set; }
        public virtual DbSet<Process> Processes { get; set; }
        public virtual DbSet<ProcessStep> ProcessSteps { get; set; }
        public virtual DbSet<request_ticket_history> request_ticket_history { get; set; }
        public virtual DbSet<role> roles { get; set; }
        public virtual DbSet<role_function> role_function { get; set; }
        public virtual DbSet<role_view> role_view { get; set; }
        public virtual DbSet<store_Identifie> store_Identifie { get; set; }
        public virtual DbSet<supplier> suppliers { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<system_log> system_log { get; set; }
        public virtual DbSet<usage_history> usage_history { get; set; }
        public virtual DbSet<user_identifie> user_identifie { get; set; }
        public virtual DbSet<view_page> view_page { get; set; }
        public virtual DbSet<voting_history> voting_history { get; set; }
    
        public virtual int sp_alterdiagram(string diagramname, Nullable<int> owner_id, Nullable<int> version, byte[] definition)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            var versionParameter = version.HasValue ?
                new ObjectParameter("version", version) :
                new ObjectParameter("version", typeof(int));
    
            var definitionParameter = definition != null ?
                new ObjectParameter("definition", definition) :
                new ObjectParameter("definition", typeof(byte[]));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_alterdiagram", diagramnameParameter, owner_idParameter, versionParameter, definitionParameter);
        }
    
        public virtual ObjectResult<sp_BaoCaoTinhTrangSuDung_Result> sp_BaoCaoTinhTrangSuDung()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_BaoCaoTinhTrangSuDung_Result>("sp_BaoCaoTinhTrangSuDung");
        }
    
        public virtual ObjectResult<sp_BaoCaoTonKho_Result> sp_BaoCaoTonKho(Nullable<System.DateTime> dateStart, Nullable<System.DateTime> dateEnd, string searchContent)
        {
            var dateStartParameter = dateStart.HasValue ?
                new ObjectParameter("dateStart", dateStart) :
                new ObjectParameter("dateStart", typeof(System.DateTime));
    
            var dateEndParameter = dateEnd.HasValue ?
                new ObjectParameter("dateEnd", dateEnd) :
                new ObjectParameter("dateEnd", typeof(System.DateTime));
    
            var searchContentParameter = searchContent != null ?
                new ObjectParameter("searchContent", searchContent) :
                new ObjectParameter("searchContent", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_BaoCaoTonKho_Result>("sp_BaoCaoTonKho", dateStartParameter, dateEndParameter, searchContentParameter);
        }
    
        public virtual ObjectResult<sp_BaoCaoTrangThaiTaiSan_Result> sp_BaoCaoTrangThaiTaiSan()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_BaoCaoTrangThaiTaiSan_Result>("sp_BaoCaoTrangThaiTaiSan");
        }
    
        public virtual ObjectResult<sp_BaoCaoYeuCauPheDuyet_Result> sp_BaoCaoYeuCauPheDuyet(Nullable<System.DateTime> dateStart, Nullable<System.DateTime> dateEnd, string searchContent)
        {
            var dateStartParameter = dateStart.HasValue ?
                new ObjectParameter("dateStart", dateStart) :
                new ObjectParameter("dateStart", typeof(System.DateTime));
    
            var dateEndParameter = dateEnd.HasValue ?
                new ObjectParameter("dateEnd", dateEnd) :
                new ObjectParameter("dateEnd", typeof(System.DateTime));
    
            var searchContentParameter = searchContent != null ?
                new ObjectParameter("searchContent", searchContent) :
                new ObjectParameter("searchContent", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_BaoCaoYeuCauPheDuyet_Result>("sp_BaoCaoYeuCauPheDuyet", dateStartParameter, dateEndParameter, searchContentParameter);
        }
    
        public virtual int sp_creatediagram(string diagramname, Nullable<int> owner_id, Nullable<int> version, byte[] definition)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            var versionParameter = version.HasValue ?
                new ObjectParameter("version", version) :
                new ObjectParameter("version", typeof(int));
    
            var definitionParameter = definition != null ?
                new ObjectParameter("definition", definition) :
                new ObjectParameter("definition", typeof(byte[]));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_creatediagram", diagramnameParameter, owner_idParameter, versionParameter, definitionParameter);
        }
    
        public virtual int sp_dropdiagram(string diagramname, Nullable<int> owner_id)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_dropdiagram", diagramnameParameter, owner_idParameter);
        }
    
        public virtual ObjectResult<sp_helpdiagramdefinition_Result> sp_helpdiagramdefinition(string diagramname, Nullable<int> owner_id)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_helpdiagramdefinition_Result>("sp_helpdiagramdefinition", diagramnameParameter, owner_idParameter);
        }
    
        public virtual ObjectResult<sp_helpdiagrams_Result> sp_helpdiagrams(string diagramname, Nullable<int> owner_id)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_helpdiagrams_Result>("sp_helpdiagrams", diagramnameParameter, owner_idParameter);
        }
    
        public virtual ObjectResult<string> sp_NewNotification()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("sp_NewNotification");
        }
    
        public virtual int sp_renamediagram(string diagramname, Nullable<int> owner_id, string new_diagramname)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            var new_diagramnameParameter = new_diagramname != null ?
                new ObjectParameter("new_diagramname", new_diagramname) :
                new ObjectParameter("new_diagramname", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_renamediagram", diagramnameParameter, owner_idParameter, new_diagramnameParameter);
        }
    
        public virtual int sp_upgraddiagrams()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_upgraddiagrams");
        }
    }
}
