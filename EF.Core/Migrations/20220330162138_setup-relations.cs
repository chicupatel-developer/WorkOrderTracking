using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class setuprelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_WorkOrders_CustomerOrderId",
                table: "WorkOrders",
                column: "CustomerOrderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkOrders_CustomerOrders_CustomerOrderId",
                table: "WorkOrders",
                column: "CustomerOrderId",
                principalTable: "CustomerOrders",
                principalColumn: "CustomerOrderId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkOrders_CustomerOrders_CustomerOrderId",
                table: "WorkOrders");

            migrationBuilder.DropIndex(
                name: "IX_WorkOrders_CustomerOrderId",
                table: "WorkOrders");
        }
    }
}
