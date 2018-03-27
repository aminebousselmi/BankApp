using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BanqueSI.Migrations
{
    public partial class STBDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agence",
                columns: table => new
                {
                    CodeAgence = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdresseAgence = table.Column<string>(nullable: true),
                    FondLiquideQuotidien = table.Column<double>(nullable: false),
                    HeureFermeture = table.Column<DateTime>(nullable: true),
                    HeureOuverture = table.Column<DateTime>(nullable: true),
                    NomAgence = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agence", x => x.CodeAgence);
                });

            migrationBuilder.CreateTable(
                name: "Personne",
                columns: table => new
                {
                    EmployeSupCodePersonne = table.Column<int>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    CodePersonne = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AgenceCodeAgence = table.Column<int>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    NomPersonne = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personne", x => x.CodePersonne);
                    table.ForeignKey(
                        name: "FK_Personne_Personne_EmployeSupCodePersonne",
                        column: x => x.EmployeSupCodePersonne,
                        principalTable: "Personne",
                        principalColumn: "CodePersonne",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Personne_Agence_AgenceCodeAgence",
                        column: x => x.AgenceCodeAgence,
                        principalTable: "Agence",
                        principalColumn: "CodeAgence",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Change",
                columns: table => new
                {
                    IdChange = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdresseP = table.Column<string>(nullable: true),
                    ChangeType = table.Column<int>(nullable: false),
                    DateChange = table.Column<DateTime>(nullable: false),
                    Destination = table.Column<string>(nullable: true),
                    ExchangeRate = table.Column<double>(nullable: false),
                    FromCurrencyCode = table.Column<string>(nullable: true),
                    FromCurrencyName = table.Column<string>(nullable: true),
                    Identif = table.Column<string>(nullable: true),
                    Montant = table.Column<double>(nullable: false),
                    MontantConverted = table.Column<double>(nullable: false),
                    NomP = table.Column<string>(nullable: true),
                    PrenomP = table.Column<string>(nullable: true),
                    ToCurrencyCode = table.Column<string>(nullable: true),
                    ToCurrencyName = table.Column<string>(nullable: true),
                    employeCodePersonne = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Change", x => x.IdChange);
                    table.ForeignKey(
                        name: "FK_Change_Personne_employeCodePersonne",
                        column: x => x.employeCodePersonne,
                        principalTable: "Personne",
                        principalColumn: "CodePersonne",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Compte",
                columns: table => new
                {
                    CodeCompte = table.Column<string>(nullable: false),
                    DateCreation = table.Column<DateTime>(nullable: false),
                    Decouvert = table.Column<double>(nullable: true),
                    PersonneCodePersonne = table.Column<int>(nullable: true),
                    Solde = table.Column<double>(nullable: false),
                    Taux = table.Column<double>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    clientCodePersonne = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Compte", x => x.CodeCompte);
                    table.ForeignKey(
                        name: "FK_Compte_Personne_PersonneCodePersonne",
                        column: x => x.PersonneCodePersonne,
                        principalTable: "Personne",
                        principalColumn: "CodePersonne",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Compte_Personne_clientCodePersonne",
                        column: x => x.clientCodePersonne,
                        principalTable: "Personne",
                        principalColumn: "CodePersonne",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cheque",
                columns: table => new
                {
                    idC = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BankName = table.Column<string>(nullable: true),
                    CINProprietaire = table.Column<int>(nullable: false),
                    ClientCodePersonne = table.Column<int>(nullable: true),
                    CompteCodeCompte = table.Column<string>(nullable: true),
                    DateV = table.Column<DateTime>(nullable: false),
                    EmployeCodePersonne = table.Column<int>(nullable: true),
                    Montant = table.Column<double>(nullable: false),
                    NomProprietaire = table.Column<string>(nullable: true),
                    NumeroC = table.Column<double>(nullable: false),
                    PrenomProprietaire = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cheque", x => x.idC);
                    table.ForeignKey(
                        name: "FK_Cheque_Personne_ClientCodePersonne",
                        column: x => x.ClientCodePersonne,
                        principalTable: "Personne",
                        principalColumn: "CodePersonne",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Cheque_Compte_CompteCodeCompte",
                        column: x => x.CompteCodeCompte,
                        principalTable: "Compte",
                        principalColumn: "CodeCompte",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Cheque_Personne_EmployeCodePersonne",
                        column: x => x.EmployeCodePersonne,
                        principalTable: "Personne",
                        principalColumn: "CodePersonne",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Operation",
                columns: table => new
                {
                    NumeroOperation = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CompteCodeCompte = table.Column<string>(nullable: true),
                    DateOperation = table.Column<DateTime>(nullable: false),
                    EmployeCodePersonne = table.Column<int>(nullable: true),
                    Montant = table.Column<double>(nullable: false),
                    TypeO = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operation", x => x.NumeroOperation);
                    table.ForeignKey(
                        name: "FK_Operation_Compte_CompteCodeCompte",
                        column: x => x.CompteCodeCompte,
                        principalTable: "Compte",
                        principalColumn: "CodeCompte",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Operation_Personne_EmployeCodePersonne",
                        column: x => x.EmployeCodePersonne,
                        principalTable: "Personne",
                        principalColumn: "CodePersonne",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Change_employeCodePersonne",
                table: "Change",
                column: "employeCodePersonne");

            migrationBuilder.CreateIndex(
                name: "IX_Cheque_ClientCodePersonne",
                table: "Cheque",
                column: "ClientCodePersonne");

            migrationBuilder.CreateIndex(
                name: "IX_Cheque_CompteCodeCompte",
                table: "Cheque",
                column: "CompteCodeCompte");

            migrationBuilder.CreateIndex(
                name: "IX_Cheque_EmployeCodePersonne",
                table: "Cheque",
                column: "EmployeCodePersonne");

            migrationBuilder.CreateIndex(
                name: "IX_Compte_PersonneCodePersonne",
                table: "Compte",
                column: "PersonneCodePersonne");

            migrationBuilder.CreateIndex(
                name: "IX_Compte_clientCodePersonne",
                table: "Compte",
                column: "clientCodePersonne");

            migrationBuilder.CreateIndex(
                name: "IX_Operation_CompteCodeCompte",
                table: "Operation",
                column: "CompteCodeCompte");

            migrationBuilder.CreateIndex(
                name: "IX_Operation_EmployeCodePersonne",
                table: "Operation",
                column: "EmployeCodePersonne");

            migrationBuilder.CreateIndex(
                name: "IX_Personne_EmployeSupCodePersonne",
                table: "Personne",
                column: "EmployeSupCodePersonne");

            migrationBuilder.CreateIndex(
                name: "IX_Personne_AgenceCodeAgence",
                table: "Personne",
                column: "AgenceCodeAgence");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Change");

            migrationBuilder.DropTable(
                name: "Cheque");

            migrationBuilder.DropTable(
                name: "Operation");

            migrationBuilder.DropTable(
                name: "Compte");

            migrationBuilder.DropTable(
                name: "Personne");

            migrationBuilder.DropTable(
                name: "Agence");
        }
    }
}
