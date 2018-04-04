using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BanqueSI.Migrations
{
    public partial class STBDBV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Mail",
                columns: table => new
                {
                    IdEmail = table.Column<string>(nullable: false),
                    CCEmail = table.Column<string>(nullable: true),
                    DateEmail = table.Column<DateTime>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    From = table.Column<string>(nullable: true),
                    MessageEmail = table.Column<string>(nullable: true),
                    ObjectEmail = table.Column<string>(nullable: true),
                    Sent = table.Column<bool>(nullable: false),
                    To = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mail", x => x.IdEmail);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mail");
        }
    }
}
