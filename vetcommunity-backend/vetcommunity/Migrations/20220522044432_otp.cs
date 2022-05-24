using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetcommunity.Migrations
{
    public partial class otp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "055c0949-64e2-4ec6-a0d6-5492ccb27433");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ff78d007-ad91-46e3-86d1-92b8a705a1d6");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "062bd069-2c48-4b7c-849a-d833a9f213cb", "a97b21c6-6ede-4b23-b654-7dabd3f21919" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "062bd069-2c48-4b7c-849a-d833a9f213cb");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a97b21c6-6ede-4b23-b654-7dabd3f21919");

            migrationBuilder.CreateTable(
                name: "OtpCodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Otp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GenerationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpireDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtpCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OtpCodes_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "88e124de-c8d7-49a2-99e1-eed336ed5659", "a0e26a8a-8880-42d1-bdef-b1daf1ba8c45", "Admin", "ADMIN" },
                    { "bd6fe49c-ee50-4b52-ad6c-55897a72e570", "89738488-8a62-44d9-a87b-15e8db2eea84", "Normal", "NORMAL" },
                    { "df53be42-d8cc-4274-a9db-4f4c9a1fe1f1", "d08faa7a-daa5-4b83-9694-6dc9876b2e39", "Vet", "VET" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AboutMe", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FullName", "IsVeterinary", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UrlPhoto", "UserName" },
                values: new object[] { "07a6cdcc-556e-4627-a967-5e7077f17bd4", null, 0, "a6628ee5-5aad-4a28-953c-0e6e4ddf6ffd", null, false, "User Admin", false, false, null, null, "ADMIN@ADMIN.COM", "AQAAAAEAACcQAAAAECKPQkGVqf2Rg06PEtIrypu4J90wr3uGvumRKVm9l3ET9INSAGHVDYhiztgsFUPN8A==", null, false, "1dd7de73-7a44-40d9-bacb-f3680d01556c", false, "https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg", "admin@admin.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "88e124de-c8d7-49a2-99e1-eed336ed5659", "07a6cdcc-556e-4627-a967-5e7077f17bd4" });

            migrationBuilder.CreateIndex(
                name: "IX_OtpCodes_UserId",
                table: "OtpCodes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OtpCodes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd6fe49c-ee50-4b52-ad6c-55897a72e570");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "df53be42-d8cc-4274-a9db-4f4c9a1fe1f1");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "88e124de-c8d7-49a2-99e1-eed336ed5659", "07a6cdcc-556e-4627-a967-5e7077f17bd4" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "88e124de-c8d7-49a2-99e1-eed336ed5659");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "07a6cdcc-556e-4627-a967-5e7077f17bd4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "055c0949-64e2-4ec6-a0d6-5492ccb27433", "e059ee15-9ee9-405c-b1ac-290a036ea73b", "Normal", "NORMAL" },
                    { "062bd069-2c48-4b7c-849a-d833a9f213cb", "b0404d5c-e76b-4973-9de6-38d6ad480fb3", "Admin", "ADMIN" },
                    { "ff78d007-ad91-46e3-86d1-92b8a705a1d6", "e51fa051-1fb8-4760-a594-cde48886d5fd", "Vet", "VET" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AboutMe", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FullName", "IsVeterinary", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UrlPhoto", "UserName" },
                values: new object[] { "a97b21c6-6ede-4b23-b654-7dabd3f21919", null, 0, "3059e82f-35d9-4aee-a3a2-7c4501d23d34", null, false, "User Admin", false, false, null, null, "ADMIN@ADMIN.COM", "AQAAAAEAACcQAAAAEJnSOeQ8/sNX88CB/4+vCzGm2hOCPFnGyc75px1gQyr4GBTj78lJYhmKsinFW2ixhQ==", null, false, "c88d1105-978b-4df2-993f-76e87d778b99", false, "https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg", "admin@admin.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "062bd069-2c48-4b7c-849a-d833a9f213cb", "a97b21c6-6ede-4b23-b654-7dabd3f21919" });
        }
    }
}
