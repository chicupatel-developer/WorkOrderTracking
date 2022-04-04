using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class addqtytopart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Qty",
                table: "Parts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Qty",
                table: "Parts");
        }
    }
}
