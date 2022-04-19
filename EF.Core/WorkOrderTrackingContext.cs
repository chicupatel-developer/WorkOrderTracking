using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using EF.Core.Models;

namespace EF.Core
{
    public class WorkOrderTrackingContext : DbContext
    {
        public WorkOrderTrackingContext(DbContextOptions<WorkOrderTrackingContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // customerorder - workorder
            modelBuilder.Entity<CustomerOrder>()
                .HasOne(a => a.WorkOrder)
                .WithOne(b => b.CustomerOrder)
                .HasForeignKey<WorkOrder>(b => b.CustomerOrderId);

            // workorder - operations
            modelBuilder.Entity<WorkOrder>()
              .HasMany(a => a.Operations)
              .WithOne(b => b.WorkOrder);

            // operation - operationtoparts
            modelBuilder.Entity<Operation>()
               .HasMany(a => a.OperationToParts)
               .WithOne(b => b.Operation);

            // part - operationtoparts
            modelBuilder.Entity<Part>()
            .HasMany(a => a.OperationToParts)
            .WithOne(b => b.Part);

            // unique key 
            // operation table
            // operationnumber+workorderid
            modelBuilder.Entity<Operation>()
              .HasIndex(p => new { p.OperationNumber, p.WorkOrderId }).IsUnique();

            // unique key 
            // operationtoparts table
            // operationid+partid
            modelBuilder.Entity<OperationToPart>()
              .HasIndex(p => new { p.PartId, p.OperationId }).IsUnique();


            // operator - operatoractivities
            modelBuilder.Entity<Operator>()
              .HasMany(a => a.OperatorActivities)
              .WithOne(b => b.Operator);        

        }
        public DbSet<Part> Parts { get; set; }
        public DbSet<WorkOrder> WorkOrders { get; set; }
        public DbSet<CustomerOrder> CustomerOrders { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public DbSet<OperationToPart> OperationToParts { get; set; }
        public DbSet<Operator> Operators { get; set; }
        public DbSet<OperatorActivity> OperatorActivities { get; set; }
    }
}