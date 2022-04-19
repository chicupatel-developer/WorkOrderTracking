using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Core.Migrations
{
    public partial class operatorwip4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Operators",
                columns: table => new
                {
                    OperatorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: false),
                    LastName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operators", x => x.OperatorId);
                });

            migrationBuilder.CreateTable(
                name: "OperatorActivities",
                columns: table => new
                {
                    OperatorActivityId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OperatorId = table.Column<int>(nullable: false),
                    WorkOrderId = table.Column<int>(nullable: false),
                    OperationId = table.Column<int>(nullable: false),
                    OperationNumber = table.Column<int>(nullable: false),
                    OperationStatus = table.Column<int>(nullable: false),
                    OpQtyDone = table.Column<int>(nullable: true),
                    OpStartRunTime = table.Column<DateTime>(nullable: false),
                    OpPauseRunTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperatorActivities", x => x.OperatorActivityId);
                    table.ForeignKey(
                        name: "FK_OperatorActivities_Operators_OperatorId",
                        column: x => x.OperatorId,
                        principalTable: "Operators",
                        principalColumn: "OperatorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OperatorActivities_OperatorId",
                table: "OperatorActivities",
                column: "OperatorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OperatorActivities");

            migrationBuilder.DropTable(
                name: "Operators");
        }
    }
}
