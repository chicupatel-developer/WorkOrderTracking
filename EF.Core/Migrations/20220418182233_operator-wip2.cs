using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class operatorwip2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OperationQTY",
                table: "Operations");

            migrationBuilder.AddColumn<int>(
                name: "OpQTYDone",
                table: "Operations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OpQTYRequired",
                table: "Operations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OpQTYDone",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "OpQTYRequired",
                table: "Operations");

            migrationBuilder.AddColumn<int>(
                name: "OperationQTY",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
