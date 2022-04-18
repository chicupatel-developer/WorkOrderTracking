using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class operatorwip1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "WorkOrderEndDate",
                table: "WorkOrders",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "OperationEndDate",
                table: "Operations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OperationQTY",
                table: "Operations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkOrderEndDate",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "OperationEndDate",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "OperationQTY",
                table: "Operations");
        }
    }
}
