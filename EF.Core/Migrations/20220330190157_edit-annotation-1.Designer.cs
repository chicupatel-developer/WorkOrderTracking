﻿// <auto-generated />
using System;
using EF.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EF.Core.Migrations
{
    [DbContext(typeof(WorkOrderTrackingContext))]
    [Migration("20220330190157_edit-annotation-1")]
    partial class editannotation1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EF.Core.Models.CustomerOrder", b =>
                {
                    b.Property<int>("CustomerOrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CustomerName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("OrderDueDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("OrderQuantity")
                        .HasColumnType("int");

                    b.Property<string>("ProductDesc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CustomerOrderId");

                    b.ToTable("CustomerOrders");
                });

            modelBuilder.Entity("EF.Core.Models.Part", b =>
                {
                    b.Property<int>("PartId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CustomerOrderId")
                        .HasColumnType("int");

                    b.Property<string>("Desc")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WorkOrderId")
                        .HasColumnType("int");

                    b.HasKey("PartId");

                    b.ToTable("Parts");
                });

            modelBuilder.Entity("EF.Core.Models.WorkOrder", b =>
                {
                    b.Property<int>("WorkOrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CustomerOrderId")
                        .HasColumnType("int");

                    b.Property<string>("StatusNote")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("WorkOrderStartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("WorkOrderStatus")
                        .HasColumnType("int");

                    b.HasKey("WorkOrderId");

                    b.HasIndex("CustomerOrderId")
                        .IsUnique();

                    b.ToTable("WorkOrders");
                });

            modelBuilder.Entity("EF.Core.Models.WorkOrder", b =>
                {
                    b.HasOne("EF.Core.Models.CustomerOrder", "CustomerOrder")
                        .WithOne("WorkOrder")
                        .HasForeignKey("EF.Core.Models.WorkOrder", "CustomerOrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
