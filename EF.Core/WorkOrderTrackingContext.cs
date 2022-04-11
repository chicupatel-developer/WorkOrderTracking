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
            modelBuilder.Entity<CustomerOrder>()
                .HasOne(a => a.WorkOrder)
                .WithOne(b => b.CustomerOrder)
                .HasForeignKey<WorkOrder>(b => b.CustomerOrderId);

            modelBuilder.Entity<WorkOrder>()
              .HasMany(a => a.Operations)
              .WithOne(b => b.WorkOrder);

            // unique key 
            // operation table
            // operationnumber+workorderid
            modelBuilder.Entity<Operation>()
              .HasIndex(p => new { p.OperationNumber, p.WorkOrderId }).IsUnique();

        }
        public DbSet<Part> Parts { get; set; }
        public DbSet<WorkOrder> WorkOrders { get; set; }
        public DbSet<CustomerOrder> CustomerOrders { get; set; }
        public DbSet<Operation> Operations { get; set; }
    }
}