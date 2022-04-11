using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class editoperationtopartstable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OperationToParts_Operations_OperationId",
                table: "OperationToParts");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationToParts_Parts_PartId",
                table: "OperationToParts");

            migrationBuilder.DropIndex(
                name: "IX_OperationToParts_PartId_OperationId",
                table: "OperationToParts");

            migrationBuilder.AlterColumn<int>(
                name: "PartId",
                table: "OperationToParts",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "OperationId",
                table: "OperationToParts",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OperationToParts_PartId_OperationId",
                table: "OperationToParts",
                columns: new[] { "PartId", "OperationId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OperationToParts_Operations_OperationId",
                table: "OperationToParts",
                column: "OperationId",
                principalTable: "Operations",
                principalColumn: "OperationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OperationToParts_Parts_PartId",
                table: "OperationToParts",
                column: "PartId",
                principalTable: "Parts",
                principalColumn: "PartId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OperationToParts_Operations_OperationId",
                table: "OperationToParts");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationToParts_Parts_PartId",
                table: "OperationToParts");

            migrationBuilder.DropIndex(
                name: "IX_OperationToParts_PartId_OperationId",
                table: "OperationToParts");

            migrationBuilder.AlterColumn<int>(
                name: "PartId",
                table: "OperationToParts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "OperationId",
                table: "OperationToParts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_OperationToParts_PartId_OperationId",
                table: "OperationToParts",
                columns: new[] { "PartId", "OperationId" },
                unique: true,
                filter: "[PartId] IS NOT NULL AND [OperationId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_OperationToParts_Operations_OperationId",
                table: "OperationToParts",
                column: "OperationId",
                principalTable: "Operations",
                principalColumn: "OperationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OperationToParts_Parts_PartId",
                table: "OperationToParts",
                column: "PartId",
                principalTable: "Parts",
                principalColumn: "PartId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
