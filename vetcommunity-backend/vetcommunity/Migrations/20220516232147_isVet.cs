using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetcommunity.Migrations
{
    public partial class isVet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsVeterinary",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVeterinary",
                table: "AspNetUsers");
        }
    }
}
