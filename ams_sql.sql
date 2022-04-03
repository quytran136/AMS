USE [master]
GO
/****** Object:  Database [AMS_DB]    Script Date: 2022-04-03 8:47:03 PM ******/
CREATE DATABASE [AMS_DB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AMS_DB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\AMS_DB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'AMS_DB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\AMS_DB_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [AMS_DB] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AMS_DB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AMS_DB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AMS_DB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AMS_DB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AMS_DB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AMS_DB] SET ARITHABORT OFF 
GO
ALTER DATABASE [AMS_DB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AMS_DB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AMS_DB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AMS_DB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AMS_DB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AMS_DB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AMS_DB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AMS_DB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AMS_DB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AMS_DB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [AMS_DB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AMS_DB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AMS_DB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AMS_DB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AMS_DB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AMS_DB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AMS_DB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AMS_DB] SET RECOVERY FULL 
GO
ALTER DATABASE [AMS_DB] SET  MULTI_USER 
GO
ALTER DATABASE [AMS_DB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AMS_DB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AMS_DB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AMS_DB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AMS_DB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AMS_DB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [AMS_DB] SET QUERY_STORE = OFF
GO
USE [AMS_DB]
GO
/****** Object:  Table [dbo].[ams_config]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ams_config](
	[ID] [varchar](64) NOT NULL,
	[Code] [nvarchar](50) NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_ams_config] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ams_notification]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ams_notification](
	[ID] [nvarchar](64) NOT NULL,
	[NotificationContent] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[IsRead] [bit] NULL,
	[Action] [nvarchar](max) NULL,
	[NotificationFor] [varchar](64) NULL,
 CONSTRAINT [PK_ams_notification] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asset_classify]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asset_classify](
	[ID] [nvarchar](64) NOT NULL,
	[AssetClassifyName] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_asset_classify] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asset_detail]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asset_detail](
	[ID] [varchar](64) NOT NULL,
	[StoreID] [nvarchar](64) NULL,
	[AssetClassifyID] [nvarchar](64) NULL,
	[AssetFullName] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[QuantityOriginalStock] [int] NULL,
	[QuantityUsed] [int] NULL,
	[QuantityInStock] [int] NULL,
	[QuantityDestroyed] [int] NULL,
	[Price] [float] NULL,
	[IsDelete] [bit] NULL,
	[IsActive] [bit] NULL,
	[Unit] [nvarchar](50) NULL,
	[Description] [nvarchar](max) NULL,
	[SupplierID] [nvarchar](64) NULL,
 CONSTRAINT [PK_asset_detail] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chat_history]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat_history](
	[ID] [nvarchar](64) NOT NULL,
	[FromUserID] [nvarchar](64) NULL,
	[ToUserID] [nvarchar](64) NULL,
	[Message] [nvarchar](max) NULL,
	[ImageList] [nvarchar](max) NULL,
	[CreateDate] [datetime] NULL,
	[IsReaded] [bit] NULL,
 CONSTRAINT [PK_chat_history] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[ID] [varchar](64) NOT NULL,
	[DepartmentName] [nvarchar](128) NULL,
	[ParentID] [varchar](64) NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[function]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[function](
	[ID] [nvarchar](64) NOT NULL,
	[FunctionName] [nvarchar](128) NULL,
	[FunctionKey] [varchar](64) NULL,
 CONSTRAINT [PK_function] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[invoice]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[invoice](
	[ID] [nvarchar](64) NOT NULL,
	[CreateDate] [datetime] NULL,
	[CreatorID] [varchar](64) NULL,
	[TicketID] [nvarchar](64) NULL,
	[StoreID] [nvarchar](64) NULL,
	[IsReject] [bit] NULL,
	[IsPay] [bit] NULL,
 CONSTRAINT [PK_invoice] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[invoice_detail]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[invoice_detail](
	[ID] [varchar](64) NOT NULL,
	[AssetClassifyID] [varchar](64) NULL,
	[AssetFullName] [nvarchar](128) NULL,
	[SupplierID] [varchar](64) NULL,
	[InvoiceID] [nvarchar](64) NULL,
	[Price] [float] NULL,
	[Quantity] [int] NULL,
	[Description] [nvarchar](max) NULL,
	[Unit] [nvarchar](50) NULL,
 CONSTRAINT [PK_invoice_detail] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[message_list]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[message_list](
	[ID] [nvarchar](64) NOT NULL,
	[KeyCode] [nvarchar](64) NULL,
	[Code] [nvarchar](64) NULL,
	[Message_EN] [nvarchar](max) NULL,
	[Message_VN] [nvarchar](max) NULL,
 CONSTRAINT [PK_message_list] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Organizational]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organizational](
	[ID] [nvarchar](64) NOT NULL,
	[OrganizationalName] [nvarchar](128) NULL,
	[ParentID] [varchar](64) NULL,
	[DepartmentID] [varchar](64) NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_Organizational] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Process]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Process](
	[ID] [varchar](64) NOT NULL,
	[ProcessName] [nvarchar](128) NULL,
	[IsDelete] [bit] NULL,
	[IsLock] [bit] NULL,
 CONSTRAINT [PK_Process] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProcessStep]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProcessStep](
	[ID] [varchar](64) NOT NULL,
	[ProcessID] [varchar](64) NULL,
	[ParentID] [varchar](64) NULL,
	[UserID] [varchar](64) NULL,
	[Approvers] [nvarchar](max) NULL,
	[ExpiredTime] [int] NULL,
	[IsUseExpiredTime] [bit] NULL,
	[Description] [text] NULL,
	[StepName] [nvarchar](128) NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_ProcessStep] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[request_ticket_history]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[request_ticket_history](
	[ID] [nvarchar](64) NOT NULL,
	[RequestBy] [nvarchar](64) NULL,
	[CreateDate] [datetime] NULL,
	[StepID] [nvarchar](64) NULL,
	[IsApprove] [bit] NULL,
	[Description] [nvarchar](max) NULL,
	[ProcessID] [nvarchar](64) NULL,
	[RequestType] [nvarchar](50) NULL,
	[IsReject] [bit] NULL,
	[StoreID] [varchar](64) NULL,
 CONSTRAINT [PK_asset_shopping_history] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[ID] [nvarchar](64) NOT NULL,
	[RoleName] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[IsLock] [nchar](10) NULL,
 CONSTRAINT [PK_role] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_function]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role_function](
	[ID] [nvarchar](64) NOT NULL,
	[RoleID] [nvarchar](64) NULL,
	[FunctionID] [nvarchar](64) NULL,
	[CreateDate] [datetime] NULL,
	[UserID] [nvarchar](64) NULL,
 CONSTRAINT [PK_role_function] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_view]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role_view](
	[ID] [varchar](64) NOT NULL,
	[RoleID] [nvarchar](64) NULL,
	[ViewID] [nvarchar](64) NULL,
	[CreateDate] [date] NULL,
	[UserID] [nvarchar](64) NULL,
 CONSTRAINT [PK_role_view] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[store_Identifie]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[store_Identifie](
	[ID] [nvarchar](64) NOT NULL,
	[StoreName] [nchar](10) NULL,
	[CreateDate] [datetime] NULL,
	[Owner] [nvarchar](128) NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_store_Identifie] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[supplier]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[supplier](
	[ID] [nvarchar](64) NOT NULL,
	[Name] [nvarchar](128) NULL,
	[Phone] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[IsDelete] [bit] NULL,
	[Email] [nvarchar](128) NULL,
	[Image] [nvarchar](max) NULL,
 CONSTRAINT [PK_supplier] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[system_log]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[system_log](
	[ID] [nvarchar](64) NOT NULL,
	[MessageID] [nvarchar](64) NULL,
	[CreateDate] [datetime] NULL,
	[Creator] [nvarchar](64) NULL,
	[Detail] [nvarchar](max) NULL,
 CONSTRAINT [PK_system_log] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usage_history]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usage_history](
	[ID] [varchar](64) NOT NULL,
	[TicketID] [varchar](64) NULL,
	[AssetID] [varchar](64) NULL,
	[Quantity] [int] NULL,
	[UsageFor] [varchar](64) NULL,
	[IsUsed] [bit] NULL,
	[IsRecovery] [bit] NULL,
	[IsLiquidation] [bit] NULL,
	[CreateDate] [datetime] NULL,
	[IsReject] [bit] NULL,
 CONSTRAINT [PK_usage_history] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_identifie]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_identifie](
	[ID] [nvarchar](64) NOT NULL,
	[UserName] [varchar](64) NULL,
	[UserPassword] [varchar](64) NULL,
	[CreateDate] [datetime] NULL,
	[IsLock] [bit] NULL,
	[IsDelete] [bit] NULL,
	[Role] [varchar](64) NULL,
	[UserFullName] [nvarchar](128) NULL,
	[Image] [nvarchar](max) NULL,
	[Token] [nvarchar](128) NULL,
	[DepartmentID] [varchar](64) NULL,
	[OrganizationID] [varchar](64) NULL,
	[DOB] [date] NULL,
	[Email] [varchar](50) NULL,
	[Phone] [varchar](50) NULL,
 CONSTRAINT [PK_user_identifie] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[view_page]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[view_page](
	[ID] [nvarchar](64) NOT NULL,
	[ViewName] [nvarchar](128) NULL,
	[ViewKey] [nvarchar](64) NULL,
 CONSTRAINT [PK_view_page] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[voting_history]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[voting_history](
	[ID] [nvarchar](64) NOT NULL,
	[TicketID] [nvarchar](64) NULL,
	[Description] [nvarchar](max) NULL,
	[Actor] [nvarchar](64) NULL,
	[CreateDate] [datetime] NULL,
	[Action] [nvarchar](64) NULL,
	[StepID] [nvarchar](64) NULL,
 CONSTRAINT [PK_voting_history] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [NonClusteredIndex-20220401-010841]    Script Date: 2022-04-03 8:47:03 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [NonClusteredIndex-20220401-010841] ON [dbo].[chat_history]
(
	[ID] ASC,
	[CreateDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[asset_classify] ADD  CONSTRAINT [DF_asset_classify_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[asset_detail] ADD  CONSTRAINT [DF_asset_detail_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[function] ADD  CONSTRAINT [DF_function_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[message_list] ADD  CONSTRAINT [DF_message_list_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[role] ADD  CONSTRAINT [DF_role_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[role_function] ADD  CONSTRAINT [DF_role_function_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[role_view] ADD  CONSTRAINT [DF_role_view_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[store_Identifie] ADD  CONSTRAINT [DF_store_Identifie_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[user_identifie] ADD  CONSTRAINT [DF_user_identifie_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[view_page] ADD  CONSTRAINT [DF_view_page_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[asset_detail]  WITH CHECK ADD  CONSTRAINT [FK_asset_detail_asset_classify] FOREIGN KEY([AssetClassifyID])
REFERENCES [dbo].[asset_classify] ([ID])
GO
ALTER TABLE [dbo].[asset_detail] CHECK CONSTRAINT [FK_asset_detail_asset_classify]
GO
ALTER TABLE [dbo].[asset_detail]  WITH CHECK ADD  CONSTRAINT [FK_asset_detail_store_Identifie] FOREIGN KEY([StoreID])
REFERENCES [dbo].[store_Identifie] ([ID])
GO
ALTER TABLE [dbo].[asset_detail] CHECK CONSTRAINT [FK_asset_detail_store_Identifie]
GO
ALTER TABLE [dbo].[asset_detail]  WITH CHECK ADD  CONSTRAINT [FK_asset_detail_supplier] FOREIGN KEY([SupplierID])
REFERENCES [dbo].[supplier] ([ID])
GO
ALTER TABLE [dbo].[asset_detail] CHECK CONSTRAINT [FK_asset_detail_supplier]
GO
ALTER TABLE [dbo].[invoice]  WITH CHECK ADD  CONSTRAINT [FK_invoice_request_ticket_history] FOREIGN KEY([TicketID])
REFERENCES [dbo].[request_ticket_history] ([ID])
GO
ALTER TABLE [dbo].[invoice] CHECK CONSTRAINT [FK_invoice_request_ticket_history]
GO
ALTER TABLE [dbo].[invoice]  WITH CHECK ADD  CONSTRAINT [FK_invoice_store_Identifie] FOREIGN KEY([StoreID])
REFERENCES [dbo].[store_Identifie] ([ID])
GO
ALTER TABLE [dbo].[invoice] CHECK CONSTRAINT [FK_invoice_store_Identifie]
GO
ALTER TABLE [dbo].[invoice_detail]  WITH CHECK ADD  CONSTRAINT [FK_invoice_detail_invoice] FOREIGN KEY([InvoiceID])
REFERENCES [dbo].[invoice] ([ID])
GO
ALTER TABLE [dbo].[invoice_detail] CHECK CONSTRAINT [FK_invoice_detail_invoice]
GO
ALTER TABLE [dbo].[Organizational]  WITH CHECK ADD  CONSTRAINT [FK_Organizational_Department] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([ID])
GO
ALTER TABLE [dbo].[Organizational] CHECK CONSTRAINT [FK_Organizational_Department]
GO
ALTER TABLE [dbo].[ProcessStep]  WITH CHECK ADD  CONSTRAINT [FK_ProcessStep_Process] FOREIGN KEY([ProcessID])
REFERENCES [dbo].[Process] ([ID])
GO
ALTER TABLE [dbo].[ProcessStep] CHECK CONSTRAINT [FK_ProcessStep_Process]
GO
ALTER TABLE [dbo].[role_function]  WITH CHECK ADD  CONSTRAINT [FK_role_function_function] FOREIGN KEY([FunctionID])
REFERENCES [dbo].[function] ([ID])
GO
ALTER TABLE [dbo].[role_function] CHECK CONSTRAINT [FK_role_function_function]
GO
ALTER TABLE [dbo].[role_function]  WITH CHECK ADD  CONSTRAINT [FK_role_function_role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[role] ([ID])
GO
ALTER TABLE [dbo].[role_function] CHECK CONSTRAINT [FK_role_function_role]
GO
ALTER TABLE [dbo].[role_function]  WITH CHECK ADD  CONSTRAINT [FK_role_function_user_identifie] FOREIGN KEY([UserID])
REFERENCES [dbo].[user_identifie] ([ID])
GO
ALTER TABLE [dbo].[role_function] CHECK CONSTRAINT [FK_role_function_user_identifie]
GO
ALTER TABLE [dbo].[role_view]  WITH CHECK ADD  CONSTRAINT [FK_role_view_role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[role] ([ID])
GO
ALTER TABLE [dbo].[role_view] CHECK CONSTRAINT [FK_role_view_role]
GO
ALTER TABLE [dbo].[role_view]  WITH CHECK ADD  CONSTRAINT [FK_role_view_user_identifie] FOREIGN KEY([UserID])
REFERENCES [dbo].[user_identifie] ([ID])
GO
ALTER TABLE [dbo].[role_view] CHECK CONSTRAINT [FK_role_view_user_identifie]
GO
ALTER TABLE [dbo].[role_view]  WITH CHECK ADD  CONSTRAINT [FK_role_view_view_page] FOREIGN KEY([ViewID])
REFERENCES [dbo].[view_page] ([ID])
GO
ALTER TABLE [dbo].[role_view] CHECK CONSTRAINT [FK_role_view_view_page]
GO
ALTER TABLE [dbo].[system_log]  WITH CHECK ADD  CONSTRAINT [FK_system_log_message_list] FOREIGN KEY([MessageID])
REFERENCES [dbo].[message_list] ([ID])
GO
ALTER TABLE [dbo].[system_log] CHECK CONSTRAINT [FK_system_log_message_list]
GO
ALTER TABLE [dbo].[system_log]  WITH CHECK ADD  CONSTRAINT [FK_system_log_user_identifie] FOREIGN KEY([Creator])
REFERENCES [dbo].[user_identifie] ([ID])
GO
ALTER TABLE [dbo].[system_log] CHECK CONSTRAINT [FK_system_log_user_identifie]
GO
ALTER TABLE [dbo].[voting_history]  WITH CHECK ADD  CONSTRAINT [FK_voting_history_request_ticket_history] FOREIGN KEY([TicketID])
REFERENCES [dbo].[request_ticket_history] ([ID])
GO
ALTER TABLE [dbo].[voting_history] CHECK CONSTRAINT [FK_voting_history_request_ticket_history]
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoCaoTinhTrangSuDung]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_BaoCaoTinhTrangSuDung]
AS
BEGIN
-- [sp_BaoCaoTinhTrangSuDung]
	SELECT
	(SELECT SUM(QuantityInStock) from asset_detail) [Tồn Kho],
	(SELECT SUM(QuantityUsed) from asset_detail) [Đang Sử Dụng],
	(SELECT SUM(QuantityDestroyed) from asset_detail) [Đã Thanh Lý]
END
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoCaoTonKho]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_BaoCaoTonKho]
	@dateStart datetime,
	@dateEnd datetime,
	@searchContent NVARCHAR(MAX)
AS
	
-- [dbo].[sp_BaoCaoTonKho] '2021-10-14 09:57:50.200', '2021-12-14 09:57:50.200', 'Công'
	SELECT 
	si.StoreName [Kho tài sản],
	ac.AssetClassifyName [Lớp tài sản], 
	ad.AssetFullName [Tên tài sản], 
	ad.QuantityOriginalStock [Tổng lượng tài sản], 
	ad.QuantityInStock [Tổng lượng tồn kho], 
	ad.QuantityUsed [Tổng lượng đã sử dụng], 
	ad.QuantityDestroyed [Tổng lượng đã thanh lý],
	ad.Price [Giá trị],
	CONVERT(varchar, ad.CreateDate, 103) [Ngày tạo]
	FROM asset_detail ad 
	LEFT JOIN asset_classify ac on ad.AssetClassifyID = ac.ID
	LEFT JOIN store_Identifie si on si.ID = ad.StoreID
	WHERE ad.IsActive = 1 and ad.CreateDate between @dateStart and DATEADD(day, 1, @dateEnd)  and (
		ac.AssetClassifyName LIKE '%' + @searchContent + '%'
		or ad.AssetFullName LIKE '%' + @searchContent + '%'
		or si.StoreName LIKE '%' + @searchContent + '%'
	)
	order by ad.CreateDate desc
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoCaoTrangThaiTaiSan]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_BaoCaoTrangThaiTaiSan]
AS
BEGIN
-- [dbo].[sp_BaoCaoTrangThaiTaiSan]
	SELECT 
	(SELECT COUNT(ID) FROM request_ticket_history WHERE RequestType = 'SHOPPING' AND IsApprove = 1) [Mua Sắm],
	(SELECT COUNT(ID) FROM request_ticket_history WHERE RequestType = 'ALLOCATION' AND IsApprove = 1) [Cấp Phát],
	(SELECT COUNT(ID) FROM request_ticket_history WHERE RequestType = 'RECOVERY' AND IsApprove = 1) [Thu hồi],
	(SELECT COUNT(ID) FROM request_ticket_history WHERE RequestType = 'LIQUIDATION' AND IsApprove = 1) [Thanh Lý]
END
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoCaoYeuCauPheDuyet]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_BaoCaoYeuCauPheDuyet]
	@dateStart datetime,
	@dateEnd datetime,
	@searchContent NVARCHAR(MAX)
AS
-- [dbo].[sp_BaoCaoYeuCauPheDuyet] '2021-10-14 09:57:50.200', '2021-12-14 09:57:50.200', 'Công'
	SELECT 
	rt.RequestType [Loại yêu cầu],
	rt.RequestBy [Người yêu cầu],
	ISNULL(ui.UserName, si.StoreName) [Yêu cầu cho],
	ISNULL(uh.Quantity, ad.QuantityOriginalStock) [Số lượng yêu cầu],
	rt.Description [Ghi chú],
	CONVERT(varchar, rt.CreateDate, 103) [Ngày yêu cầu],
	(CASE WHEN rt.IsApprove = 1 then N'Đã duyệt xong'
	WHEN rt.IsReject = 1 then N'Từ chối duyệt'
	WHEN rt.IsApprove = 0 and rt.IsReject = 0 then N'Đang trong quá trình phê duyệt' END) [Tình trạng duyệt]
	FROM request_ticket_history rt
	LEFT JOIN usage_history uh on rt.ID = uh.TicketID
	LEFT JOIN user_identifie ui on uh.UsageFor = ui.ID
	LEFT JOIN asset_detail ad on ad.TicketID = rt.ID
	LEFT JOIN store_Identifie si on si.ID = ad.StoreID
	where rt.CreateDate between @dateStart and DATEADD(day, 1,@dateEnd) 
	and (rt.Description like '%'+@searchContent+'%' 
	or rt.RequestBy like '%'+@searchContent+'%')
	ORDER BY rt.CreateDate desc
GO
/****** Object:  StoredProcedure [dbo].[sp_NewNotification]    Script Date: 2022-04-03 8:47:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_NewNotification]
AS
BEGIN
	SELECT noti.NotificationFor FROM ams_notification noti
	WHERE noti.IsRead <> 1
	GROUP BY noti.NotificationFor
END
GO
USE [master]
GO
ALTER DATABASE [AMS_DB] SET  READ_WRITE 
GO
