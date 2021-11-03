USE [master]
GO
/****** Object:  Database [AMS_DB]    Script Date: 11/04/2021 01:07:07 ******/
CREATE DATABASE [AMS_DB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AMS_DB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\AMS_DB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'AMS_DB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\AMS_DB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
EXEC sys.sp_db_vardecimal_storage_format N'AMS_DB', N'ON'
GO
ALTER DATABASE [AMS_DB] SET QUERY_STORE = OFF
GO
USE [AMS_DB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [AMS_DB]
GO
/****** Object:  Table [dbo].[asset_allocation_history]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asset_allocation_history](
	[ID] [varchar](64) NOT NULL,
	[AssetID] [varchar](64) NULL,
	[AllocationFor] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[AllocationBy] [nvarchar](128) NULL,
	[RequestBy] [nvarchar](128) NULL,
	[LocalStep] [varchar](64) NULL,
	[isApprove] [bit] NULL,
	[IsReject] [bit] NULL,
 CONSTRAINT [PK_asset_allocation_history] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asset_classify]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asset_classify](
	[ID] [varchar](64) NOT NULL,
	[AssetName] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_asset_classify] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asset_detail]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asset_detail](
	[ID] [varchar](64) NOT NULL,
	[StoreID] [varchar](64) NULL,
	[AssetClassifyID] [varchar](64) NULL,
	[AssetFullName] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[QuantityOriginalStock] [int] NULL,
	[Unit] [int] NULL,
	[QuantityUsed] [int] NULL,
	[QuantityInStock] [int] NULL,
	[QuantityDestroyed] [int] NULL,
	[Price] [float] NULL,
 CONSTRAINT [PK_asset_detail] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asset_recovery_history]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asset_recovery_history](
	[ID] [varchar](64) NOT NULL,
	[AssetID] [varchar](64) NULL,
	[RecoveryFor] [nvarchar](128) NULL,
	[RecoveryBy] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[RequestBy] [nvarchar](128) NULL,
	[LocalStep] [varchar](64) NULL,
	[isApprove] [bit] NULL,
	[RequestBy1] [nvarchar](128) NULL,
	[LocalStep1] [varchar](64) NULL,
	[isApprove1] [bit] NULL,
 CONSTRAINT [PK_asset_recovery_history] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[assets_liquidation_history]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[assets_liquidation_history](
	[ID] [nchar](10) NOT NULL,
	[AssetID] [varchar](64) NULL,
	[LiquidationFor] [nvarchar](128) NULL,
	[LiquidationBy] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[RequestBy] [nvarchar](128) NULL,
	[LocalStep] [varchar](64) NULL,
	[isApprove] [bit] NULL,
	[Price] [float] NULL,
	[RecoveryPrice] [float] NULL,
 CONSTRAINT [PK_assets_liquidation_history] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 11/04/2021 01:07:07 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[function]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[function](
	[ID] [varchar](64) NOT NULL,
	[FunctionName] [nvarchar](128) NULL,
	[FunctionKey] [varchar](64) NULL,
 CONSTRAINT [PK_function] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[message_list]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[message_list](
	[ID] [varchar](64) NOT NULL,
	[KeyCode] [varchar](64) NULL,
	[Code] [varchar](64) NULL,
	[Message_EN] [nvarchar](max) NULL,
	[Message_VN] [nvarchar](max) NULL,
 CONSTRAINT [PK_message_list] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Organizational]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organizational](
	[ID] [nvarchar](64) NOT NULL,
	[OrganizationalName] [nvarchar](128) NULL,
	[ParentID] [varchar](64) NULL,
	[DepartmentID] [varchar](64) NULL,
 CONSTRAINT [PK_Organizational] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Process]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Process](
	[ID] [nvarchar](64) NOT NULL,
	[OrganizationalID] [nvarchar](64) NULL,
	[ParentStepID] [nvarchar](64) NULL,
 CONSTRAINT [PK_Process] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rank]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rank](
	[ID] [varchar](64) NOT NULL,
	[RankName] [nvarchar](128) NULL,
	[RankParent] [varchar](64) NULL,
	[DepartmentID] [varchar](64) NULL,
	[CreateDate] [datetime] NULL,
 CONSTRAINT [PK_rank] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[ID] [varchar](64) NOT NULL,
	[RoleName] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[IsLock] [nchar](10) NULL,
 CONSTRAINT [PK_role] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_function]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role_function](
	[ID] [varchar](64) NOT NULL,
	[RoleID] [varchar](64) NULL,
	[FunctionID] [varchar](64) NULL,
	[CreateDate] [datetime] NULL,
	[UserID] [varchar](64) NULL,
 CONSTRAINT [PK_role_function] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_view]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role_view](
	[ID] [varchar](64) NOT NULL,
	[RoleID] [varchar](64) NULL,
	[ViewID] [varchar](64) NULL,
	[CreateDate] [date] NULL,
	[UserID] [varchar](64) NULL,
 CONSTRAINT [PK_role_view] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[store_Identifie]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[store_Identifie](
	[ID] [varchar](64) NOT NULL,
	[StoreName] [nchar](10) NULL,
	[CreateDate] [datetime] NULL,
	[Owner] [nvarchar](128) NULL,
 CONSTRAINT [PK_store_Identifie] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[system_log]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[system_log](
	[ID] [varchar](64) NOT NULL,
	[MessageID] [varchar](64) NULL,
	[CreateDate] [datetime] NULL,
	[Creator] [varchar](64) NULL,
	[Detail] [nvarchar](max) NULL,
 CONSTRAINT [PK_system_log] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_identifie]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_identifie](
	[ID] [varchar](64) NOT NULL,
	[UserName] [varchar](64) NULL,
	[UserPassword] [varchar](64) NULL,
	[CreateDate] [datetime] NULL,
	[IsLock] [bit] NULL,
	[IsDelete] [bit] NULL,
	[Role] [varchar](64) NULL,
	[UserFullName] [nvarchar](128) NULL,
	[Image] [nvarchar](128) NULL,
	[Token] [nvarchar](128) NULL,
 CONSTRAINT [PK_user_identifie] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[view_page]    Script Date: 11/04/2021 01:07:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[view_page](
	[ID] [varchar](64) NOT NULL,
	[ViewName] [nvarchar](128) NULL,
	[ViewKey] [varchar](64) NULL,
 CONSTRAINT [PK_view_page] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'1E9FC8E8-B080-4804-99F8-0BF20D37231C', N'Business', N'B01B1', NULL, N'Không tìm thấy thông tin tài khoản')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', N'Business', N'B01A2', NULL, N'Người dùng không tồn tại')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'9729CAF2-2CA0-45F3-A2B8-ADF3E7C962E2', N'Business', N'B01B3', NULL, N'Password cũ trùng password mới')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', N'Business', N'B01A1', NULL, N'Sai tài khoản hoặc mật khẩu')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'D092CD4F-3FA3-4E79-866B-0A28179E2EC6', N'Business', N'B01B2', NULL, N'Tài khoản đã tồn tại')
GO
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'005797e9-f450-4219-8283-066e92c7ea42', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:09:54.127' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'020a8e84-4d48-4a23-a1fe-8cf7dad52463', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:08:55.743' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'0287c6e9-f4b8-4210-900d-b4c0c3e1e47b', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:05:46.770' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'0c881e10-0874-47df-b45c-31b7ca2fb57a', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:05:49.927' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'0d516a9d-8a80-48fc-ab95-5d70ef55a87c', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:09.533' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'11e02cfd-9999-4716-85e5-c02d100a02e2', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:11.547' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'1272cb78-b363-4406-8d90-c18da65fd08e', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:57:31.537' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'17a366ed-ead3-4691-9e98-637ed68e9c8f', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:05:58.150' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'1f7bff7f-c30b-4bda-8f3f-604dc049befd', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:08:35.920' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'23f76e16-1a41-4acf-90ca-a8a6fd29dbb7', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:04.423' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'2dec7ad6-aa58-40ad-9d4b-454be6ba1549', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:21:58.543' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'353b0ac0-07e1-42e8-b031-12f07defd1cc', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:57:37.093' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'37b690d5-d617-41c9-91ab-36d0568f3ad3', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:37:07.197' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'3d89eb45-3acd-4749-98b2-f220eb05eedd', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:38.337' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'43c33e9f-fd7e-4dff-9888-54a985213a7e', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:21:22.983' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'473796cc-0ae9-4bbd-8040-ff6820d93f6a', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:10.310' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'47a4a19e-2e19-4874-80de-331f2fb0a2a1', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:00:37.360' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'49487aa5-e307-4707-be94-d9afc2579254', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:07:05.387' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'4c7154b9-3a71-4a0e-9c81-e33d3a7ae171', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:07:35.563' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'50031210-fc27-4280-81da-aa831e06f3c8', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:35:14.893' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'504d0e6f-e364-435b-856f-06a7fb5d2422', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:10:59.230' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'50dba17e-0b55-4b69-ad9b-d5888fc21bbe', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:22:00.947' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'514e0765-54b7-47b0-979b-02885eb1f951', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:08.847' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'522604d5-7fab-4cfd-a259-38252f8d6dc7', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T13:59:48.550' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'59bffe93-c0c6-455f-8b93-cb9f66dc8685', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:38.977' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'67d2d279-17d9-4602-b8fd-28ae0bb30f6d', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:08:24.330' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'680edb8f-7602-4195-a059-37263e97165a', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T14:52:02.010' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'6939b886-af7e-4dc0-a734-51b52ecc17f1', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:33.087' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'6a6e4d92-bf71-4b30-bc74-42c9d4f5db82', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:39.003' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'6c825e59-cf5b-4735-94d4-c2533df1d4b8', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:02:58.550' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'6f6e6f4a-2012-41b6-91f5-d4c7085a4836', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:21:19.090' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'70e239f0-987f-4cf7-a31c-41d2912f5769', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:36:26.223' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'715dacc2-e8db-44e6-a22e-287e13f4e7b4', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:41.227' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'74c570c7-eb9a-4c8d-8bb8-dd7b5cb69a5e', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:09.003' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'7cb512e3-0ec1-473b-8591-ca480be859dc', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T14:53:14.450' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'84316954-1d9a-48af-a780-50affca692e9', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:40.270' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'8fb3cd34-390c-4ae5-b968-889aca46420e', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:08:40.607' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'9efeb8e8-f429-4c5a-b80e-4ce1a371f812', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:41.073' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'a34ceb94-56a5-4326-b48c-4ea747a4b58b', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:09:00.570' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'a3f7f4b9-eb86-4cf8-8e46-21a4432571bb', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T22:17:47.900' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'a6f4101b-a990-40fc-841d-954cb0f82c94', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:08.023' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'a9aa60e1-c29b-446b-b46f-2382d2f21379', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:58:11.117' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'b6a08840-2cba-4a8e-82c5-d80742d7f8ca', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:10.040' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'b71004d3-7415-422a-af85-2bb46efeea3a', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:05:42.243' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'b721a7ef-6466-451f-b623-92f10c7fee92', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:33:23.767' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'b98e1f39-4e1b-491e-bf9f-2fb9c41f50b6', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:01:07.783' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'be43e02c-19ec-4a46-b1db-f52d4b3a7cc7', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:08.670' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'be7c7378-e85a-44c4-b639-a1e889fa4d2f', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:58:39.730' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'c4b34350-7fb3-4bc9-925f-275b3c5d5287', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:03:03.883' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'c5a2ce0e-410a-4f52-adaa-8f55977ff835', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:40.887' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'c796c1c8-83ba-478c-9f35-4a8509573c67', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:38.510' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'c9ee53cb-8173-4fa8-8b42-7eb18cfbcdd7', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:34:11.000' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'cc0b597c-1f5d-411a-abb1-6c43fbb97482', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:38:44.270' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'd0c5ae85-a1ef-4c79-aeb0-49a4afae9179', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:36.287' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'd0f9d27d-bd9f-4553-a646-486a5b2c767d', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:07:42.600' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'd2fd3a58-f01d-407b-8c9b-c6ebb3805337', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:32:44.637' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'd40eff6b-d64f-4210-b72d-09833f4d1558', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:08.487' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'd5238386-a408-46a6-bc34-7ffa8d63a9d6', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:07.130' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'd8949108-cd05-49f7-bee9-a19733ce1bd4', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:09.750' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'd9c9473e-8dbe-4123-92ca-345606d35fdb', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T23:28:10.720' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'daf9314d-c8f5-4c55-9c96-d206683c4d4c', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:21:55.403' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'de1c933e-1804-428e-8cd7-52cd5c062605', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:05:37.293' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'e23d428b-70d6-4b02-982c-9d9cf9242f81', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:04:47.183' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'e9d4e81e-c232-486c-94d5-f7a659972680', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:12:24.177' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'eaf9e00f-edcc-43cb-aef8-3498757c487c', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:38.667' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'ec00ca3d-ee17-4dff-895a-d8778ec579c3', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T22:17:04.077' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'ec3475d3-9ae7-4845-8f18-9a2665d8eb37', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-10-30T14:05:54.817' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'f15155d0-ca12-4ead-89bb-900392f06f17', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:00:32.413' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'f7fbd814-ac4b-44c6-80f6-c8482408b9e5', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:14:04.767' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'faf33630-a5ec-4237-a379-259e56b6ef04', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-29T22:17:15.610' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
GO
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token]) VALUES (N'28e9ddd3-c2a8-433f-bc56-7a51135f221d', N'a', N'DB5TN+j04S1H49x87OXisZke40rYNn6b', CAST(N'2021-10-28T14:19:41.113' AS DateTime), 0, 0, NULL, N'Trần Thanh Quý', NULL, NULL)
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token]) VALUES (N'639ff11f-0e33-4a4f-b9aa-d09e5caaafde', N'admin', N'NTI5cQ6PcSyOrkllQvnmCUBI3vJAYpD2', CAST(N'2021-10-28T14:18:44.693' AS DateTime), 0, 0, NULL, N'administrator', NULL, N'c825l8sM6+Y1KihdwhEYtldjVgYD6iBL')
GO
ALTER TABLE [dbo].[asset_allocation_history] ADD  CONSTRAINT [DF_asset_allocation_history_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[asset_classify] ADD  CONSTRAINT [DF_asset_classify_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[asset_detail] ADD  CONSTRAINT [DF_asset_detail_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[asset_recovery_history] ADD  CONSTRAINT [DF_asset_recovery_history_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[assets_liquidation_history] ADD  CONSTRAINT [DF_assets_liquidation_history_ID]  DEFAULT (N'(newid())') FOR [ID]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[function] ADD  CONSTRAINT [DF_function_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[message_list] ADD  CONSTRAINT [DF_message_list_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[rank] ADD  CONSTRAINT [DF_rank_ID]  DEFAULT (newid()) FOR [ID]
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
ALTER TABLE [dbo].[asset_allocation_history]  WITH CHECK ADD  CONSTRAINT [FK_asset_allocation_history_asset_detail1] FOREIGN KEY([AssetID])
REFERENCES [dbo].[asset_detail] ([ID])
GO
ALTER TABLE [dbo].[asset_allocation_history] CHECK CONSTRAINT [FK_asset_allocation_history_asset_detail1]
GO
ALTER TABLE [dbo].[asset_allocation_history]  WITH CHECK ADD  CONSTRAINT [FK_asset_allocation_history_rank] FOREIGN KEY([LocalStep])
REFERENCES [dbo].[rank] ([ID])
GO
ALTER TABLE [dbo].[asset_allocation_history] CHECK CONSTRAINT [FK_asset_allocation_history_rank]
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
ALTER TABLE [dbo].[asset_recovery_history]  WITH CHECK ADD  CONSTRAINT [FK_asset_recovery_history_asset_detail1] FOREIGN KEY([AssetID])
REFERENCES [dbo].[asset_detail] ([ID])
GO
ALTER TABLE [dbo].[asset_recovery_history] CHECK CONSTRAINT [FK_asset_recovery_history_asset_detail1]
GO
ALTER TABLE [dbo].[assets_liquidation_history]  WITH CHECK ADD  CONSTRAINT [FK_assets_liquidation_history_asset_detail] FOREIGN KEY([AssetID])
REFERENCES [dbo].[asset_detail] ([ID])
GO
ALTER TABLE [dbo].[assets_liquidation_history] CHECK CONSTRAINT [FK_assets_liquidation_history_asset_detail]
GO
ALTER TABLE [dbo].[Organizational]  WITH CHECK ADD  CONSTRAINT [FK_Organizational_Department] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([ID])
GO
ALTER TABLE [dbo].[Organizational] CHECK CONSTRAINT [FK_Organizational_Department]
GO
ALTER TABLE [dbo].[Process]  WITH CHECK ADD  CONSTRAINT [FK_Process_Organizational] FOREIGN KEY([OrganizationalID])
REFERENCES [dbo].[Organizational] ([ID])
GO
ALTER TABLE [dbo].[Process] CHECK CONSTRAINT [FK_Process_Organizational]
GO
ALTER TABLE [dbo].[rank]  WITH CHECK ADD  CONSTRAINT [FK_rank_Department] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([ID])
GO
ALTER TABLE [dbo].[rank] CHECK CONSTRAINT [FK_rank_Department]
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
USE [master]
GO
ALTER DATABASE [AMS_DB] SET  READ_WRITE 
GO
