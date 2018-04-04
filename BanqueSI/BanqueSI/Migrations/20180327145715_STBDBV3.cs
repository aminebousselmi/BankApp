using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BanqueSI.Migrations
{
    public partial class STBDBV3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PersonneCodePersonne",
                table: "Mail",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mail_PersonneCodePersonne",
                table: "Mail",
                column: "PersonneCodePersonne");

            migrationBuilder.AddForeignKey(
                name: "FK_Mail_Personne_PersonneCodePersonne",
                table: "Mail",
                column: "PersonneCodePersonne",
                principalTable: "Personne",
                principalColumn: "CodePersonne",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mail_Personne_PersonneCodePersonne",
                table: "Mail");

            migrationBuilder.DropIndex(
                name: "IX_Mail_PersonneCodePersonne",
                table: "Mail");

            migrationBuilder.DropColumn(
                name: "PersonneCodePersonne",
                table: "Mail");
        }
    }
}
