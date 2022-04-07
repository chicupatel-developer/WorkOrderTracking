using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class editoperationtable3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {          

            migrationBuilder.CreateIndex(
                name: "IX_Operations_OperationNumber_WorkOrderId",
                table: "Operations",
                columns: new[] { "OperationNumber", "WorkOrderId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Operations_OperationNumber_WorkOrderId",
                table: "Operations");        
        }
    }
}
