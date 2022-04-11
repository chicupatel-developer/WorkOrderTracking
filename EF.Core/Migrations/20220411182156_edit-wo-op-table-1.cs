using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class editwooptable1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {        

            migrationBuilder.CreateIndex(
                name: "IX_Operations_WorkOrderId",
                table: "Operations",
                column: "WorkOrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {         

            migrationBuilder.CreateIndex(
                name: "IX_Operations_WorkOrderId",
                table: "Operations",
                column: "WorkOrderId",
                unique: true);
        }
    }
}
