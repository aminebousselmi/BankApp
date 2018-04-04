using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BanqueSI.Migrations
{
    public partial class STBDBV10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarteBancaire");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarteBancaire",
                columns: table => new
                {
                    IdCarte = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CIN = table.Column<int>(nullable: false),
                    CompteCodeCompte = table.Column<string>(nullable: true),
                    DateCreation = table.Column<DateTime>(nullable: false),
                    DateExpiration = table.Column<DateTime>(nullable: false),
                    NomProprietaire = table.Column<string>(nullable: true),
                    NumeroCarte = table.Column<int>(nullable: false),
                    PrenomProprietaire = table.Column<string>(nullable: true),
                    SecretPassword = table.Column<int>(nullable: false),
                    TeleProprietaire = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarteBancaire", x => x.IdCarte);
                    table.ForeignKey(
                        name: "FK_CarteBancaire_Compte_CompteCodeCompte",
                        column: x => x.CompteCodeCompte,
                        principalTable: "Compte",
                        principalColumn: "CodeCompte",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarteBancaire_CompteCodeCompte",
                table: "CarteBancaire",
                column: "CompteCodeCompte");
        }
    }
}
