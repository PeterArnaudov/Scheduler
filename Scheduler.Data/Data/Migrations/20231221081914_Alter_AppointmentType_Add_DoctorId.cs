using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scheduler.Data.Migrations
{
    /// <inheritdoc />
    public partial class Alter_AppointmentType_Add_DoctorId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DoctorId",
                table: "AppointmentTypes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentTypes_DoctorId",
                table: "AppointmentTypes",
                column: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppointmentTypes_Doctors_DoctorId",
                table: "AppointmentTypes",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppointmentTypes_Doctors_DoctorId",
                table: "AppointmentTypes");

            migrationBuilder.DropIndex(
                name: "IX_AppointmentTypes_DoctorId",
                table: "AppointmentTypes");

            migrationBuilder.DropColumn(
                name: "DoctorId",
                table: "AppointmentTypes");
        }
    }
}
