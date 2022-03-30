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
        }
        public DbSet<Part> Parts { get; set; }
        public DbSet<WorkOrder> WorkOrders { get; set; }
        public DbSet<CustomerOrder> CustomerOrders { get; set; }
    }
}