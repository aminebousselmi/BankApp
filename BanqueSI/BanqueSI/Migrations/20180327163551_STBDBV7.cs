using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BanqueSI.Migrations
{
    public partial class STBDBV7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Mail",
                columns: table => new
                {
                    IdEmail = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CCEmail = table.Column<string>(nullable: true),
                    DateEmail = table.Column<DateTime>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    From = table.Column<string>(nullable: true),
                    MessageEmail = table.Column<string>(nullable: true),
                    ObjectEmail = table.Column<string>(nullable: true),
                    PersonneCodePersonne = table.Column<int>(nullable: true),
                    Sent = table.Column<bool>(nullable: false),
                    To = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mail", x => x.IdEmail);
                    table.ForeignKey(
                        name: "FK_Mail_Personne_PersonneCodePersonne",
                        column: x => x.PersonneCodePersonne,
                        principalTable: "Personne",
                        principalColumn: "CodePersonne",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mail_PersonneCodePersonne",
                table: "Mail",
                column: "PersonneCodePersonne");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mail");
        }
    }
}
