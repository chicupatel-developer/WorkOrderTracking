using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class operatorwip7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CycleTime",
                table: "OperatorActivities",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CycleTime",
                table: "OperatorActivities");
        }
    }
}
