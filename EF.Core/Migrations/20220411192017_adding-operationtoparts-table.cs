using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class addingoperationtopartstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OperationToParts",
                columns: table => new
                {
                    OperationToPartId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OperationId = table.Column<int>(nullable: true),
                    PartId = table.Column<int>(nullable: true),
                    XFERQTY = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationToParts", x => x.OperationToPartId);
                    table.ForeignKey(
                        name: "FK_OperationToParts_Operations_OperationId",
                        column: x => x.OperationId,
                        principalTable: "Operations",
                        principalColumn: "OperationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OperationToParts_Parts_PartId",
                        column: x => x.PartId,
                        principalTable: "Parts",
                        principalColumn: "PartId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OperationToParts_OperationId",
                table: "OperationToParts",
                column: "OperationId");

            migrationBuilder.CreateIndex(
                name: "IX_OperationToParts_PartId_OperationId",
                table: "OperationToParts",
                columns: new[] { "PartId", "OperationId" },
                unique: true,
                filter: "[PartId] IS NOT NULL AND [OperationId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OperationToParts");
        }
    }
}
