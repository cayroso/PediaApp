using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.migrations.app
{
    public partial class app : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "App");

            migrationBuilder.CreateTable(
                name: "Calendar",
                schema: "App",
                columns: table => new
                {
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Year = table.Column<int>(type: "INTEGER", nullable: false),
                    Month = table.Column<int>(type: "INTEGER", nullable: false),
                    Day = table.Column<int>(type: "INTEGER", nullable: false),
                    Quarter = table.Column<int>(type: "INTEGER", nullable: false),
                    MonthName = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    DayOfYear = table.Column<int>(type: "INTEGER", nullable: false),
                    DayOfWeek = table.Column<int>(type: "INTEGER", nullable: false),
                    DayName = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Calendar", x => x.Date);
                });

            migrationBuilder.CreateTable(
                name: "Chat",
                schema: "App",
                columns: table => new
                {
                    ChatId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    LastChatMessageId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chat", x => x.ChatId);
                });

            migrationBuilder.CreateTable(
                name: "FileUpload",
                schema: "App",
                columns: table => new
                {
                    FileUploadId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    Url = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: true),
                    FileName = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: true),
                    ContentDisposition = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: true),
                    ContentType = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: true),
                    Content = table.Column<byte[]>(type: "BLOB", nullable: true),
                    Length = table.Column<long>(type: "INTEGER", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileUpload", x => x.FileUploadId);
                });

            migrationBuilder.CreateTable(
                name: "Notification",
                schema: "App",
                columns: table => new
                {
                    NotificationId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    NotificationType = table.Column<int>(type: "INTEGER", nullable: false),
                    IconClass = table.Column<string>(type: "TEXT", nullable: true),
                    Subject = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    ReferenceId = table.Column<string>(type: "TEXT", nullable: true),
                    DateSent = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.NotificationId);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                schema: "App",
                columns: table => new
                {
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Clinic",
                schema: "App",
                columns: table => new
                {
                    ClinicId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    MobileNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    GeoX = table.Column<double>(type: "REAL", nullable: false),
                    GeoY = table.Column<double>(type: "REAL", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ConcurrencyToken = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clinic", x => x.ClinicId);
                    table.ForeignKey(
                        name: "FK_Clinic_Chat_ClinicId",
                        column: x => x.ClinicId,
                        principalSchema: "App",
                        principalTable: "Chat",
                        principalColumn: "ChatId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "App",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ImageId = table.Column<string>(type: "TEXT", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    MiddleName = table.Column<string>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "TEXT", nullable: true),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    OverallRating = table.Column<double>(type: "REAL", nullable: true),
                    TotalRating = table.Column<double>(type: "REAL", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_User_FileUpload_ImageId",
                        column: x => x.ImageId,
                        principalSchema: "App",
                        principalTable: "FileUpload",
                        principalColumn: "FileUploadId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClinicBusinessHour",
                schema: "App",
                columns: table => new
                {
                    ClinicBusinessHourId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ClinicId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    DaysOfWeek = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    StartTime = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    EndTime = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClinicBusinessHour", x => x.ClinicBusinessHourId);
                    table.ForeignKey(
                        name: "FK_ClinicBusinessHour_Clinic_ClinicId",
                        column: x => x.ClinicId,
                        principalSchema: "App",
                        principalTable: "Clinic",
                        principalColumn: "ClinicId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChatMessage",
                schema: "App",
                columns: table => new
                {
                    ChatMessageId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ChatId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    SenderId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: true),
                    Content = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: false),
                    ChatMessageType = table.Column<int>(type: "INTEGER", nullable: false),
                    DateSent = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMessage", x => x.ChatMessageId);
                    table.ForeignKey(
                        name: "FK_ChatMessage_Chat_ChatId",
                        column: x => x.ChatId,
                        principalSchema: "App",
                        principalTable: "Chat",
                        principalColumn: "ChatId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatMessage_User_SenderId",
                        column: x => x.SenderId,
                        principalSchema: "App",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ChatReceiver",
                schema: "App",
                columns: table => new
                {
                    ChatReceiverId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ChatId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ReceiverId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    LastChatMessageId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: true),
                    IsRemoved = table.Column<bool>(type: "INTEGER", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatReceiver", x => x.ChatReceiverId);
                    table.ForeignKey(
                        name: "FK_ChatReceiver_Chat_ChatId",
                        column: x => x.ChatId,
                        principalSchema: "App",
                        principalTable: "Chat",
                        principalColumn: "ChatId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatReceiver_User_ReceiverId",
                        column: x => x.ReceiverId,
                        principalSchema: "App",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NotificationReceiver",
                schema: "App",
                columns: table => new
                {
                    NotificationReceiverId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    NotificationId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ReceiverId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    DateReceived = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateRead = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationReceiver", x => x.NotificationReceiverId);
                    table.ForeignKey(
                        name: "FK_NotificationReceiver_Notification_NotificationId",
                        column: x => x.NotificationId,
                        principalSchema: "App",
                        principalTable: "Notification",
                        principalColumn: "NotificationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NotificationReceiver_User_ReceiverId",
                        column: x => x.ReceiverId,
                        principalSchema: "App",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NotificationReceiver_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "App",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Parent",
                schema: "App",
                columns: table => new
                {
                    ParentId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parent", x => x.ParentId);
                    table.ForeignKey(
                        name: "FK_Parent_User_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "App",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Staff",
                schema: "App",
                columns: table => new
                {
                    StaffId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.StaffId);
                    table.ForeignKey(
                        name: "FK_Staff_User_StaffId",
                        column: x => x.StaffId,
                        principalSchema: "App",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                schema: "App",
                columns: table => new
                {
                    UserRoleId = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: true),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.UserRoleId);
                    table.ForeignKey(
                        name: "FK_UserRole_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "App",
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRole_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "App",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserTask",
                schema: "App",
                columns: table => new
                {
                    UserTaskId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    UserId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateAssigned = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateCompleted = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateActualCompleted = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ConcurrencyToken = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTask", x => x.UserTaskId);
                    table.ForeignKey(
                        name: "FK_UserTask_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "App",
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTask_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "App",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Child",
                schema: "App",
                columns: table => new
                {
                    ChildId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ParentId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ImageId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: true),
                    Gender = table.Column<int>(type: "INTEGER", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    MiddleName = table.Column<string>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ConcurrencyToken = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Child", x => x.ChildId);
                    table.ForeignKey(
                        name: "FK_Child_FileUpload_ImageId",
                        column: x => x.ImageId,
                        principalSchema: "App",
                        principalTable: "FileUpload",
                        principalColumn: "FileUploadId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Child_Parent_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "App",
                        principalTable: "Parent",
                        principalColumn: "ParentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClinicReview",
                schema: "App",
                columns: table => new
                {
                    ClinicReviewId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ClinicId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ParentId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    Rating = table.Column<int>(type: "INTEGER", nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClinicReview", x => x.ClinicReviewId);
                    table.ForeignKey(
                        name: "FK_ClinicReview_Clinic_ClinicId",
                        column: x => x.ClinicId,
                        principalSchema: "App",
                        principalTable: "Clinic",
                        principalColumn: "ClinicId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClinicReview_Parent_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "App",
                        principalTable: "Parent",
                        principalColumn: "ParentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ParentClinic",
                schema: "App",
                columns: table => new
                {
                    ParentClinicId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ParentId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ClinicId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParentClinic", x => x.ParentClinicId);
                    table.ForeignKey(
                        name: "FK_ParentClinic_Clinic_ClinicId",
                        column: x => x.ClinicId,
                        principalSchema: "App",
                        principalTable: "Clinic",
                        principalColumn: "ClinicId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParentClinic_Parent_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "App",
                        principalTable: "Parent",
                        principalColumn: "ParentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClinicStaff",
                schema: "App",
                columns: table => new
                {
                    ClinicStaffId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ClinicId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    StaffId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClinicStaff", x => x.ClinicStaffId);
                    table.ForeignKey(
                        name: "FK_ClinicStaff_Clinic_ClinicId",
                        column: x => x.ClinicId,
                        principalSchema: "App",
                        principalTable: "Clinic",
                        principalColumn: "ClinicId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClinicStaff_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "App",
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClinicStaff_Staff_StaffId",
                        column: x => x.StaffId,
                        principalSchema: "App",
                        principalTable: "Staff",
                        principalColumn: "StaffId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTaskItem",
                schema: "App",
                columns: table => new
                {
                    UserTaskItemId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    UserTaskId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    Number = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: false),
                    IsDone = table.Column<bool>(type: "INTEGER", nullable: false),
                    DateCompleted = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ConcurrencyToken = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTaskItem", x => x.UserTaskItemId);
                    table.ForeignKey(
                        name: "FK_UserTaskItem_UserTask_UserTaskId",
                        column: x => x.UserTaskId,
                        principalSchema: "App",
                        principalTable: "UserTask",
                        principalColumn: "UserTaskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Appointment",
                schema: "App",
                columns: table => new
                {
                    AppointmentId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    StatusReason = table.Column<string>(type: "TEXT", nullable: true),
                    ClinicId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ChildId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ReferenceNumber = table.Column<string>(type: "TEXT", nullable: true),
                    DateStart = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateEnd = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ConcurrencyToken = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointment", x => x.AppointmentId);
                    table.ForeignKey(
                        name: "FK_Appointment_Child_ChildId",
                        column: x => x.ChildId,
                        principalSchema: "App",
                        principalTable: "Child",
                        principalColumn: "ChildId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appointment_Clinic_ClinicId",
                        column: x => x.ClinicId,
                        principalSchema: "App",
                        principalTable: "Clinic",
                        principalColumn: "ClinicId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentTimeline",
                schema: "App",
                columns: table => new
                {
                    AppointmentTimelineId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    UserId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    AppointmentId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    DateTimeline = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentTimeline", x => x.AppointmentTimelineId);
                    table.ForeignKey(
                        name: "FK_AppointmentTimeline_Appointment_AppointmentId",
                        column: x => x.AppointmentId,
                        principalSchema: "App",
                        principalTable: "Appointment",
                        principalColumn: "AppointmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointmentTimeline_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "App",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChildMedicalEntry",
                schema: "App",
                columns: table => new
                {
                    ChildMedicalEntryId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    AppointmentId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    ChildId = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false),
                    Age = table.Column<double>(type: "REAL", nullable: false),
                    Weight = table.Column<double>(type: "REAL", nullable: false),
                    Height = table.Column<double>(type: "REAL", nullable: false),
                    HeadCircumference = table.Column<double>(type: "REAL", nullable: false),
                    ChestCircumference = table.Column<double>(type: "REAL", nullable: false),
                    Summary = table.Column<string>(type: "TEXT", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateReturn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ConcurrencyToken = table.Column<string>(type: "TEXT", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChildMedicalEntry", x => x.ChildMedicalEntryId);
                    table.ForeignKey(
                        name: "FK_ChildMedicalEntry_Appointment_AppointmentId",
                        column: x => x.AppointmentId,
                        principalSchema: "App",
                        principalTable: "Appointment",
                        principalColumn: "AppointmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChildMedicalEntry_Child_ChildId",
                        column: x => x.ChildId,
                        principalSchema: "App",
                        principalTable: "Child",
                        principalColumn: "ChildId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_ChildId",
                schema: "App",
                table: "Appointment",
                column: "ChildId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_ClinicId",
                schema: "App",
                table: "Appointment",
                column: "ClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentTimeline_AppointmentId",
                schema: "App",
                table: "AppointmentTimeline",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentTimeline_UserId",
                schema: "App",
                table: "AppointmentTimeline",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessage_ChatId",
                schema: "App",
                table: "ChatMessage",
                column: "ChatId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessage_SenderId",
                schema: "App",
                table: "ChatMessage",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatReceiver_ChatId",
                schema: "App",
                table: "ChatReceiver",
                column: "ChatId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatReceiver_ReceiverId",
                schema: "App",
                table: "ChatReceiver",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Child_ImageId",
                schema: "App",
                table: "Child",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Child_ParentId",
                schema: "App",
                table: "Child",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_ChildMedicalEntry_AppointmentId",
                schema: "App",
                table: "ChildMedicalEntry",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ChildMedicalEntry_ChildId",
                schema: "App",
                table: "ChildMedicalEntry",
                column: "ChildId");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicBusinessHour_ClinicId",
                schema: "App",
                table: "ClinicBusinessHour",
                column: "ClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicReview_ClinicId",
                schema: "App",
                table: "ClinicReview",
                column: "ClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicReview_ParentId",
                schema: "App",
                table: "ClinicReview",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicStaff_ClinicId",
                schema: "App",
                table: "ClinicStaff",
                column: "ClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicStaff_RoleId",
                schema: "App",
                table: "ClinicStaff",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicStaff_StaffId",
                schema: "App",
                table: "ClinicStaff",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationReceiver_NotificationId",
                schema: "App",
                table: "NotificationReceiver",
                column: "NotificationId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationReceiver_ReceiverId",
                schema: "App",
                table: "NotificationReceiver",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationReceiver_UserId",
                schema: "App",
                table: "NotificationReceiver",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ParentClinic_ClinicId",
                schema: "App",
                table: "ParentClinic",
                column: "ClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_ParentClinic_ParentId",
                schema: "App",
                table: "ParentClinic",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_User_ImageId",
                schema: "App",
                table: "User",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                schema: "App",
                table: "UserRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_UserId",
                schema: "App",
                table: "UserRole",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTask_RoleId",
                schema: "App",
                table: "UserTask",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTask_UserId",
                schema: "App",
                table: "UserTask",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTaskItem_UserTaskId",
                schema: "App",
                table: "UserTaskItem",
                column: "UserTaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentTimeline",
                schema: "App");

            migrationBuilder.DropTable(
                name: "Calendar",
                schema: "App");

            migrationBuilder.DropTable(
                name: "ChatMessage",
                schema: "App");

            migrationBuilder.DropTable(
                name: "ChatReceiver",
                schema: "App");

            migrationBuilder.DropTable(
                name: "ChildMedicalEntry",
                schema: "App");

            migrationBuilder.DropTable(
                name: "ClinicBusinessHour",
                schema: "App");

            migrationBuilder.DropTable(
                name: "ClinicReview",
                schema: "App");

            migrationBuilder.DropTable(
                name: "ClinicStaff",
                schema: "App");

            migrationBuilder.DropTable(
                name: "NotificationReceiver",
                schema: "App");

            migrationBuilder.DropTable(
                name: "ParentClinic",
                schema: "App");

            migrationBuilder.DropTable(
                name: "UserRole",
                schema: "App");

            migrationBuilder.DropTable(
                name: "UserTaskItem",
                schema: "App");

            migrationBuilder.DropTable(
                name: "Appointment",
                schema: "App");

            migrationBuilder.DropTable(
                name: "Staff",
                schema: "App");

            migrationBuilder.DropTable(
                name: "Notification",
                schema: "App");

            migrationBuilder.DropTable(
                name: "UserTask",
                schema: "App");

            migrationBuilder.DropTable(
                name: "Child",
                schema: "App");

            migrationBuilder.DropTable(
                name: "Clinic",
                schema: "App");

            migrationBuilder.DropTable(
                name: "Role",
                schema: "App");

            migrationBuilder.DropTable(
                name: "Parent",
                schema: "App");

            migrationBuilder.DropTable(
                name: "Chat",
                schema: "App");

            migrationBuilder.DropTable(
                name: "User",
                schema: "App");

            migrationBuilder.DropTable(
                name: "FileUpload",
                schema: "App");
        }
    }
}
