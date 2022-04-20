using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class operatorwip8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "CycleTime",
                table: "OperatorActivities",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CycleTime",
                table: "OperatorActivities",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(TimeSpan),
                oldNullable: true);
        }
    }
}
