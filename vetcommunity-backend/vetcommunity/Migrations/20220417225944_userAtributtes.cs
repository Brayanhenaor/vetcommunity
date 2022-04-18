using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetcommunity.Migrations
{
    public partial class userAtributtes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3f20cc96-958c-46a5-8dd8-7c6e579e3b5f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e0b1d9de-292a-4bf9-9937-b270af77fa42");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "cec1cb5d-08ce-4fd5-b9aa-87976ea3facd", "f92a84cc-2222-42ef-b7bf-d140d289745e" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cec1cb5d-08ce-4fd5-b9aa-87976ea3facd");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f92a84cc-2222-42ef-b7bf-d140d289745e");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8fa0a9e7-5357-44b5-b1c4-ddddfd5ce6af", "64490b65-e261-4744-bdba-e300dff44e80", "Admin", "ADMIN" },
                    { "e4686b3c-91e0-446c-b26b-d26445558d96", "808c0a1f-18a8-41b6-a59c-d54212d1f70b", "Vet", "VET" },
                    { "fa97eac1-9f20-48a4-9a36-801eb5b3cbbb", "84c53898-1566-498a-9ede-b48e27b96ad3", "Normal", "NORMAL" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AboutMe", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FullName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UrlPhoto", "UserName" },
                values: new object[] { "37b5377e-aa27-4108-aa3e-e64f9a78f243", null, 0, "927fc877-b346-44f7-a20d-c67a50bb2682", null, false, null, false, null, null, "ADMIN@ADMIN.COM", "AQAAAAEAACcQAAAAEKIjRkplXFUFGNJtj6d6+/eGOj5H+VD9TVp/HE2KUlNSALEtY522b5noloLfMzcD3A==", null, false, "81432c0c-1363-4fb3-acb7-dc1122f9078f", false, null, "admin@admin.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "8fa0a9e7-5357-44b5-b1c4-ddddfd5ce6af", "37b5377e-aa27-4108-aa3e-e64f9a78f243" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e4686b3c-91e0-446c-b26b-d26445558d96");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fa97eac1-9f20-48a4-9a36-801eb5b3cbbb");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "8fa0a9e7-5357-44b5-b1c4-ddddfd5ce6af", "37b5377e-aa27-4108-aa3e-e64f9a78f243" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fa0a9e7-5357-44b5-b1c4-ddddfd5ce6af");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "37b5377e-aa27-4108-aa3e-e64f9a78f243");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3f20cc96-958c-46a5-8dd8-7c6e579e3b5f", "282a90f0-b0fe-4402-94d9-330452d73151", "Normal", "NORMAL" },
                    { "cec1cb5d-08ce-4fd5-b9aa-87976ea3facd", "850d2426-4187-4fbf-bbb8-63132ea72fb2", "Admin", "ADMIN" },
                    { "e0b1d9de-292a-4bf9-9937-b270af77fa42", "4829f96a-c733-4e04-a65e-1a0454957145", "Vet", "VET" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AboutMe", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UrlPhoto", "UserName" },
                values: new object[] { "f92a84cc-2222-42ef-b7bf-d140d289745e", null, 0, "25789e46-653e-42e1-bbb3-10b2e84b8a19", null, false, false, null, null, "ADMIN@ADMIN.COM", "AQAAAAEAACcQAAAAEFrZnHKI5j96+3ulXTJoclaiX53hqg6U8259uKL+ZmawLX1Inz1wyGD/sOr1VkBpMw==", null, false, "8d211d9a-808d-454f-9f7c-7a3a3cc5316d", false, null, "admin@admin.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "cec1cb5d-08ce-4fd5-b9aa-87976ea3facd", "f92a84cc-2222-42ef-b7bf-d140d289745e" });
        }
    }
}
