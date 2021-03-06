USE [AMS_DB]
GO
/****** Object:  Table [dbo].[ams_config]    Script Date: 2021-12-09 3:12:05 AM ******/
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
/****** Object:  Table [dbo].[ams_notification]    Script Date: 2021-12-09 3:12:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ams_notification](
	[ID] [varchar](64) NOT NULL,
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
/****** Object:  Table [dbo].[asset_classify]    Script Date: 2021-12-09 3:12:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asset_classify](
	[ID] [varchar](64) NOT NULL,
	[AssetClassifyName] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_asset_classify] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asset_detail]    Script Date: 2021-12-09 3:12:05 AM ******/
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
	[QuantityUsed] [int] NULL,
	[QuantityInStock] [int] NULL,
	[QuantityDestroyed] [int] NULL,
	[Price] [float] NULL,
	[IsDelete] [bit] NULL,
	[TicketID] [nvarchar](64) NULL,
	[IsActive] [bit] NULL,
	[Unit] [nvarchar](50) NULL,
	[Description] [text] NULL,
 CONSTRAINT [PK_asset_detail] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 2021-12-09 3:12:05 AM ******/
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
/****** Object:  Table [dbo].[function]    Script Date: 2021-12-09 3:12:05 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[message_list]    Script Date: 2021-12-09 3:12:05 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Organizational]    Script Date: 2021-12-09 3:12:05 AM ******/
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
/****** Object:  Table [dbo].[Process]    Script Date: 2021-12-09 3:12:05 AM ******/
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
/****** Object:  Table [dbo].[ProcessStep]    Script Date: 2021-12-09 3:12:05 AM ******/
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
/****** Object:  Table [dbo].[request_ticket_history]    Script Date: 2021-12-09 3:12:05 AM ******/
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
	[Description] [text] NULL,
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
/****** Object:  Table [dbo].[role]    Script Date: 2021-12-09 3:12:05 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_function]    Script Date: 2021-12-09 3:12:05 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_view]    Script Date: 2021-12-09 3:12:05 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[store_Identifie]    Script Date: 2021-12-09 3:12:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[store_Identifie](
	[ID] [varchar](64) NOT NULL,
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
/****** Object:  Table [dbo].[system_log]    Script Date: 2021-12-09 3:12:05 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usage_history]    Script Date: 2021-12-09 3:12:05 AM ******/
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
 CONSTRAINT [PK_usage_history] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_identifie]    Script Date: 2021-12-09 3:12:05 AM ******/
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
	[DepartmentID] [varchar](64) NULL,
	[OrganizationID] [varchar](64) NULL,
	[DOB] [date] NULL,
	[Email] [varchar](50) NULL,
	[Phone] [varchar](50) NULL,
 CONSTRAINT [PK_user_identifie] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[view_page]    Script Date: 2021-12-09 3:12:05 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[ams_config] ([ID], [Code], [Value]) VALUES (N'3d56b011-c00a-4c3f-9ab3-b080f886d8bc', N'FUNCTION', N'[{"ID":1638629763949,"FunctionKey":"SHOPPING","FunctionName":"Mua sắm tài sản","FunctionTitle":"Yêu cầu mua sắm tài sản","FunctionPath":"/Shopping","FunctionProcess":"3295cf82-a66c-4523-b41b-69b724108236"},{"ID":1638630530446,"FunctionKey":"ALLOCATION","FunctionName":"Cấp phát tài sản","FunctionTitle":"Yêu cầu cấp phát tài sản","FunctionPath":"/Allocation","FunctionProcess":"3295cf82-a66c-4523-b41b-69b724108236"},{"ID":1638630549742,"FunctionKey":"LIQUIDATION","FunctionName":"Thanh lý tài sản","FunctionTitle":"Yêu cầu thanh ký tài sản","FunctionPath":"/Liquidation","FunctionProcess":"3295cf82-a66c-4523-b41b-69b724108236"},{"ID":1638630586678,"FunctionKey":"RECOVERY","FunctionName":"Thu hồi tài sản","FunctionTitle":"Yêu cầu thu hồi tài sản","FunctionPath":"/Recovery","FunctionProcess":"3295cf82-a66c-4523-b41b-69b724108236"},{"ID":1638993670132,"FunctionKey":"XXXXXX","FunctionName":"XXX","FunctionProcess":"3295cf82-a66c-4523-b41b-69b724108236","FunctionPath":"/xxxx"}]')
GO
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'79e94f66-9b88-4db1-9b0d-fa0c850212a4', N'Yêu cầu mua sắm tài sản được gửi từ quytss', CAST(N'2021-12-09T02:40:20.223' AS DateTime), 1, N'{"Key":"SHOPPING","Value":"57dfb347-5033-48da-b04a-6e68e16c359b","Path":"/Shopping"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'80cd6a5b-bb50-41f9-979e-8ea6f5075ec6', N'Yêu cầu cấp phát tài sản được gửi từ quytss', CAST(N'2021-12-09T02:41:58.863' AS DateTime), 1, N'{"Key":"ALLOCATION","Value":"b14ccbdd-7eba-491a-b760-4c422f60a9bc","Path":"/Allocation"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'8c6e1573-b7d4-4471-be1f-771449fb8c23', N'Yêu cầu mua sắm tài sản được gửi từ quytss', CAST(N'2021-12-09T02:36:46.920' AS DateTime), 1, N'{"Key":"SHOPPING","Value":"57dfb347-5033-48da-b04a-6e68e16c359b","Path":"/Shopping"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'8c745a38-6228-4fb3-a454-37b00324eb30', N'Yêu cầu mua sắm tài sản được gửi từ quytss', CAST(N'2021-12-09T02:34:29.040' AS DateTime), 1, N'{"Key":"SHOPPING","Value":"df9f88a0-87d1-4654-bc57-ac3faf502384","Path":"/Shopping"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'ba6cab77-09ca-4089-8bfc-2cad048a0653', N'Yêu cầu thu hồi tài sản được gửi từ quytss', CAST(N'2021-12-09T02:42:34.370' AS DateTime), 1, N'{"Key":"RECOVERY","Value":"c2eece33-8431-47bd-946f-11b245822d36","Path":"/Recovery"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'bb0a1b2c-f786-4f4b-8ea2-196e6a92bd1e', N'Yêu cầu mua sắm tài sản được gửi từ quytss', CAST(N'2021-12-09T02:40:16.457' AS DateTime), 1, N'{"Key":"SHOPPING","Value":"49a662d4-ef4e-4049-a569-efdfe9dac307","Path":"/Shopping"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'c9a31c02-350b-4794-9420-7dc8c4fb55aa', N'Yêu cầu cấp phát tài sản được gửi từ quytss', CAST(N'2021-12-09T02:42:07.517' AS DateTime), 1, N'{"Key":"ALLOCATION","Value":"b14ccbdd-7eba-491a-b760-4c422f60a9bc","Path":"/Allocation"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'cbdfb0fa-dc04-4643-acbb-52f70369d854', N'Yêu cầu mua sắm tài sản được gửi từ quytss', CAST(N'2021-12-09T02:39:58.590' AS DateTime), 1, N'{"Key":"SHOPPING","Value":"49a662d4-ef4e-4049-a569-efdfe9dac307","Path":"/Shopping"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'cf4a89d7-8d43-40ee-a634-402adeb7b13f', N'Yêu cầu mua sắm tài sản được gửi từ quytss', CAST(N'2021-12-09T02:40:44.843' AS DateTime), 1, N'{"Key":"SHOPPING","Value":"df9f88a0-87d1-4654-bc57-ac3faf502384","Path":"/Shopping"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
INSERT [dbo].[ams_notification] ([ID], [NotificationContent], [CreateDate], [IsRead], [Action], [NotificationFor]) VALUES (N'e59f7cd7-07a4-4b58-8afe-8a2df1208cec', N'Yêu cầu thu hồi tài sản được gửi từ quytss', CAST(N'2021-12-09T02:42:39.040' AS DateTime), 1, N'{"Key":"RECOVERY","Value":"c2eece33-8431-47bd-946f-11b245822d36","Path":"/Recovery"}', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81')
GO
INSERT [dbo].[asset_classify] ([ID], [AssetClassifyName], [CreateDate], [IsDelete]) VALUES (N'1c82d775-a8cf-4c72-874a-e1f5559b0861', NULL, CAST(N'2021-12-02T01:04:34.263' AS DateTime), 1)
INSERT [dbo].[asset_classify] ([ID], [AssetClassifyName], [CreateDate], [IsDelete]) VALUES (N'4136cca7-6b82-477e-97d5-e478d62f1209', NULL, CAST(N'2021-12-02T01:04:48.190' AS DateTime), 1)
INSERT [dbo].[asset_classify] ([ID], [AssetClassifyName], [CreateDate], [IsDelete]) VALUES (N'64974f2a-29a1-4c64-bfd6-a10f092e442b', N'Công cụ dụng cụ', CAST(N'2021-12-02T01:02:16.267' AS DateTime), 0)
INSERT [dbo].[asset_classify] ([ID], [AssetClassifyName], [CreateDate], [IsDelete]) VALUES (N'76800ee0-addb-4fe5-a42b-5fc35559dda5', N'Thiết bị sinh hoạt', CAST(N'2021-12-02T01:03:38.460' AS DateTime), 0)
INSERT [dbo].[asset_classify] ([ID], [AssetClassifyName], [CreateDate], [IsDelete]) VALUES (N'b0c2fb30-ce00-4a72-a273-a4529bc0c34b', N'Văn phòng phẩm', CAST(N'2021-12-02T01:02:25.983' AS DateTime), 0)
INSERT [dbo].[asset_classify] ([ID], [AssetClassifyName], [CreateDate], [IsDelete]) VALUES (N'd5432e07-3076-4f81-8a1c-fd6a87edec9d', NULL, CAST(N'2021-12-02T01:04:24.750' AS DateTime), 1)
INSERT [dbo].[asset_classify] ([ID], [AssetClassifyName], [CreateDate], [IsDelete]) VALUES (N'd7b02e7f-322a-4e19-9d28-1b8257105556', NULL, CAST(N'2021-12-02T00:50:53.453' AS DateTime), 1)
INSERT [dbo].[asset_classify] ([ID], [AssetClassifyName], [CreateDate], [IsDelete]) VALUES (N'f3d93dad-7776-48d0-9ffc-1301d602196b', NULL, CAST(N'2021-12-02T00:53:10.347' AS DateTime), 1)
GO
INSERT [dbo].[asset_detail] ([ID], [StoreID], [AssetClassifyID], [AssetFullName], [CreateDate], [QuantityOriginalStock], [QuantityUsed], [QuantityInStock], [QuantityDestroyed], [Price], [IsDelete], [TicketID], [IsActive], [Unit], [Description]) VALUES (N'1cc0a167-bb65-415d-81b6-ab05a052ee57', N'dc55f886-34f7-40bc-98a4-a9b607bfcef7', N'76800ee0-addb-4fe5-a42b-5fc35559dda5', N'Máy lọc nước', CAST(N'2021-12-09T02:34:29.003' AS DateTime), 1, 0, 1, 0, 1000000, 0, N'df9f88a0-87d1-4654-bc57-ac3faf502384', 1, N'Chiếc', N'Kagaru')
INSERT [dbo].[asset_detail] ([ID], [StoreID], [AssetClassifyID], [AssetFullName], [CreateDate], [QuantityOriginalStock], [QuantityUsed], [QuantityInStock], [QuantityDestroyed], [Price], [IsDelete], [TicketID], [IsActive], [Unit], [Description]) VALUES (N'a5f8ed19-7bf9-4b7d-ba08-949ec78d4de3', N'dc55f886-34f7-40bc-98a4-a9b607bfcef7', N'b0c2fb30-ce00-4a72-a273-a4529bc0c34b', N'Giấy A4', CAST(N'2021-12-09T02:34:29.003' AS DateTime), 1, 0, 1, 0, 1000000, 0, N'df9f88a0-87d1-4654-bc57-ac3faf502384', 1, N'Tệp', N'Gi?y in')
INSERT [dbo].[asset_detail] ([ID], [StoreID], [AssetClassifyID], [AssetFullName], [CreateDate], [QuantityOriginalStock], [QuantityUsed], [QuantityInStock], [QuantityDestroyed], [Price], [IsDelete], [TicketID], [IsActive], [Unit], [Description]) VALUES (N'c292b4f9-861b-49d8-9b41-a954b3eff363', N'dc55f886-34f7-40bc-98a4-a9b607bfcef7', N'64974f2a-29a1-4c64-bfd6-a10f092e442b', N'Bàn là', CAST(N'2021-12-09T02:39:58.577' AS DateTime), 1, 0, 1, 0, 3000000, 0, N'49a662d4-ef4e-4049-a569-efdfe9dac307', 1, N'Chiếc', N'')
INSERT [dbo].[asset_detail] ([ID], [StoreID], [AssetClassifyID], [AssetFullName], [CreateDate], [QuantityOriginalStock], [QuantityUsed], [QuantityInStock], [QuantityDestroyed], [Price], [IsDelete], [TicketID], [IsActive], [Unit], [Description]) VALUES (N'de17416d-48ec-4dff-8fa6-e27d7b1df0da', N'dc55f886-34f7-40bc-98a4-a9b607bfcef7', N'64974f2a-29a1-4c64-bfd6-a10f092e442b', N'Chổi lau sàn', CAST(N'2021-12-09T02:34:29.003' AS DateTime), 1, 0, 1, 0, 200000, 0, N'df9f88a0-87d1-4654-bc57-ac3faf502384', 1, N'Chiếc', N'')
INSERT [dbo].[asset_detail] ([ID], [StoreID], [AssetClassifyID], [AssetFullName], [CreateDate], [QuantityOriginalStock], [QuantityUsed], [QuantityInStock], [QuantityDestroyed], [Price], [IsDelete], [TicketID], [IsActive], [Unit], [Description]) VALUES (N'f0c7a81e-bcb4-403b-92f8-e4202cd49924', N'dc55f886-34f7-40bc-98a4-a9b607bfcef7', N'76800ee0-addb-4fe5-a42b-5fc35559dda5', N'Máy hút bụi', CAST(N'2021-12-09T02:36:46.913' AS DateTime), 1, 0, 1, 0, 1000000, 0, N'57dfb347-5033-48da-b04a-6e68e16c359b', 1, N'Chiếc', N'máy nh?t bãi')
GO
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'05df9663-e848-477c-8674-4191439c9b4a', N'New one', N'', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'07d1837d-e481-450d-b8f5-a0dc9fdf57a3', N'Ban giám đốc FSI', N'ccd317a0-73ab-4f88-9911-8768f21333ac', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'08991ba4-6aac-4b39-a640-ddc83711fe7f', N'DEV 4 (Nội bộ)', N'0a1bde92-8d86-4981-befb-3bed979bc5e0', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'0a1bde92-8d86-4981-befb-3bed979bc5e0', N'Developer', N'dc0fa9eb-e370-44b9-86e7-f9b51b3b382d', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'20d21df6-7fb6-477e-92e3-1fc15b27aa86', N'Hành chính nhân sự', N'ccd317a0-73ab-4f88-9911-8768f21333ac', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'218f6c44-10bb-475e-8995-15725e640ff0', N'1', N'05df9663-e848-477c-8674-4191439c9b4a', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'22f1c34a-d1b4-4cc1-9a38-96f676358f8d', N'', N'ccd317a0-73ab-4f88-9911-8768f21333ac', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'2625f0b8-213d-4b8d-b07e-6c6e00ba99ce', N'', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'34c0384c-b31d-43d9-990e-a8d004a535c3', N'123', N'05df9663-e848-477c-8674-4191439c9b4a', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'38678b3d-6d8c-427d-b85e-ca5f16e44f73', N'Ban giám đốc CyberEye', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'39609d57-cc65-4648-8a14-a4f38f377053', N'', N'6b898da3-ff36-4835-89b0-2ece1d31eab3', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', N'Ban Giám Đốc', N'', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'3e48fa92-4a31-4884-aeb8-4e09f24a0bda', N'Tester', N'dc0fa9eb-e370-44b9-86e7-f9b51b3b382d', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'40a55fd3-39e8-49a6-8069-e9b2ab53c164', N'Developer', N'08991ba4-6aac-4b39-a640-ddc83711fe7f', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'4571e021-78c0-4bdd-ba67-3f08017b7197', N'', N'6b898da3-ff36-4835-89b0-2ece1d31eab3', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'557b9ee7-2d4b-454b-a82a-c501373b89f0', N'', N'f3d07da9-fdb7-4ef2-ad78-535a2c3e64e7', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'6ac1d820-aa08-4a03-a49c-b876d8ab8247', N'BA Nghiệp vụ', N'dc0fa9eb-e370-44b9-86e7-f9b51b3b382d', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'6b36b0cf-61c5-45bb-96a4-58e7db92c879', N'DEV 3', N'0a1bde92-8d86-4981-befb-3bed979bc5e0', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'6b898da3-ff36-4835-89b0-2ece1d31eab3', N'Ban cố vấn', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'762d47b0-ebe6-43b5-a2c8-fc82f90f5ac0', N'Kế toán', N'ccd317a0-73ab-4f88-9911-8768f21333ac', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'78c926e1-ea76-49fd-aa4e-4eb872d8ce95', N'BA Nghiệp vụ', N'08991ba4-6aac-4b39-a640-ddc83711fe7f', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'8b72367c-afdc-4068-add3-9fa5fc676a15', N'DEV 2', N'0a1bde92-8d86-4981-befb-3bed979bc5e0', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'911b7af9-80b1-45ac-bbbf-f7a82166779b', N'', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'967b8f7b-683a-479e-8737-b30d8929a434', N'Ban giám đốc CyberEye', N'38678b3d-6d8c-427d-b85e-ca5f16e44f73', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'9c57f54d-2a63-4700-9262-04ecaf1800a3', N'3', N'218f6c44-10bb-475e-8995-15725e640ff0', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'a998340d-a527-4896-8b5b-1d082826d890', N'', N'173703c3-4f70-4285-84d6-f4cc9596f57d', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'b2f51bbc-d573-470a-8b13-f97c62124e11', N'', N'38678b3d-6d8c-427d-b85e-ca5f16e44f73', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'b480e626-5441-48d4-9c32-7c41d2541afd', N'Tester', N'08991ba4-6aac-4b39-a640-ddc83711fe7f', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'c1573ce3-4978-4802-805a-283c3f298905', N'Phòng nghiên cứu R&D', N'ccd317a0-73ab-4f88-9911-8768f21333ac', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'ca1ef126-3d04-4115-921b-0b93e1767328', N'2', N'05df9663-e848-477c-8674-4191439c9b4a', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'ccd317a0-73ab-4f88-9911-8768f21333ac', N'Ban giám đốc FSI', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'cf5d5577-7f8a-4d03-95db-a061a911e6d9', N'DEV 1', N'0a1bde92-8d86-4981-befb-3bed979bc5e0', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'dc0fa9eb-e370-44b9-86e7-f9b51b3b382d', N'Phòng công nghệ', N'ccd317a0-73ab-4f88-9911-8768f21333ac', 0)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'f3c70dca-5213-47bd-a98b-ab99f10b86c6', N'', N'07d1837d-e481-450d-b8f5-a0dc9fdf57a3', 1)
INSERT [dbo].[Department] ([ID], [DepartmentName], [ParentID], [IsDelete]) VALUES (N'f3d07da9-fdb7-4ef2-ad78-535a2c3e64e7', N'', N'38678b3d-6d8c-427d-b85e-ca5f16e44f73', 1)
GO
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'1E9FC8E8-B080-4804-99F8-0BF20D37231C', N'Business', N'B01B1', NULL, N'Không tìm thấy thông tin tài khoản')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', N'Business', N'B01A2', NULL, N'Tài khoản đã đăng nhập tại một nơi khác')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'9729CAF2-2CA0-45F3-A2B8-ADF3E7C962E2', N'Business', N'B01B3', NULL, N'Password cũ trùng password mới')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', N'Business', N'B01A1', NULL, N'Sai tài khoản hoặc mật khẩu')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'D092CD4F-3FA3-4E79-866B-0A28179E2EC6', N'Business', N'B01B2', NULL, N'Tài khoản đã tồn tại')
GO
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'0f31184f-343b-48b0-b211-779d9c4c19d6', N'1', N'600dcee7-e792-448a-8258-a44d8e94d0e5', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', 1)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'52ed50c3-8df8-4ba5-9968-9981f05cfe2f', N'new node', N'', NULL, 0)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'544ed306-a0ef-431f-9f95-d4b444fade34', N'new node', N'', N'20d21df6-7fb6-477e-92e3-1fc15b27aa86', 0)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'600dcee7-e792-448a-8258-a44d8e94d0e5', N'Phó giám đốc kỹ thuật', N'c108aa25-e037-4f10-a116-069dec81df48', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', 0)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'62f8bd54-71b8-41f6-92a7-f4aaee045cc0', N'new node', N'', N'c1573ce3-4978-4802-805a-283c3f298905', 0)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'8f32bf80-3d4d-4280-b499-5aeee053d2b6', N'new node', N'', N'ccd317a0-73ab-4f88-9911-8768f21333ac', 0)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'9ec5edea-d16e-4014-a7af-e04f6368a076', N'Phó giám đốc tài chính', N'c108aa25-e037-4f10-a116-069dec81df48', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', 0)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'a55793d6-a9c1-4e42-b726-e6bc9614b141', N'new node', N'', N'38678b3d-6d8c-427d-b85e-ca5f16e44f73', 0)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'b022c0f5-35e7-42e1-8ad8-334cffcf9812', N'new node', N'', N'6b898da3-ff36-4835-89b0-2ece1d31eab3', 0)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'c108aa25-e037-4f10-a116-069dec81df48', N'Giám đốc', N'', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', 0)
INSERT [dbo].[Organizational] ([ID], [OrganizationalName], [ParentID], [DepartmentID], [IsDelete]) VALUES (N'da7cb449-001d-4d25-a84f-17201ca6d7d2', N'new node', N'', N'cf5d5577-7f8a-4d03-95db-a061a911e6d9', 0)
GO
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'07aaefb3-8719-4b29-8ebc-51246568f14a', NULL, 1, 0)
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'3295cf82-a66c-4523-b41b-69b724108236', N'Cấp phát tài sản', 0, 0)
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'483cd67f-21d5-4351-ab00-b88ea5846383', NULL, 1, 0)
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'593f1d1f-55d8-44b6-92f1-142692dbbfc1', NULL, 1, 0)
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'65c697ba-b8a0-42d9-af80-b15049147504', NULL, 1, 0)
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'8ef53f09-ebed-43c3-a36e-1259d0990582', NULL, 1, 0)
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'bf0becf0-14c5-467b-b1d4-7b2d16d90bf5', NULL, 1, 0)
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'c2c9ced0-5cfd-4c04-924d-18f0a6be2222', NULL, 1, 0)
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'c5bf3bc7-710c-4f75-b139-5d61902a86bc', NULL, 1, 0)
INSERT [dbo].[Process] ([ID], [ProcessName], [IsDelete], [IsLock]) VALUES (N'd019dddb-c212-436b-9012-9168084c84b1', NULL, 1, 0)
GO
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'0fc39e0e-cb25-43b0-937a-3624afef16a1', N'd019dddb-c212-436b-9012-9168084c84b1', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e|9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', 1, 1, N'', N'Bước 3', NULL)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'317168ef-570f-4441-80d1-63bf992baa51', N'593f1d1f-55d8-44b6-92f1-142692dbbfc1', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'', NULL, 1, N'', N'123', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'43830d0c-aa20-48da-9c4f-8007660fa44f', N'd019dddb-c212-436b-9012-9168084c84b1', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', NULL, 1, N'', N'Thủ công', NULL)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'745b4434-1e4b-4953-857b-151533b75975', N'07aaefb3-8719-4b29-8ebc-51246568f14a', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'', NULL, 1, N'', N'2342', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'79ad3e43-e714-4186-8cba-18fb1df142b4', N'8ef53f09-ebed-43c3-a36e-1259d0990582', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'', NULL, 1, N'', N'ưqer', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'7a1e34d7-bb6e-4640-843a-14b7f11ed8fd', N'bf0becf0-14c5-467b-b1d4-7b2d16d90bf5', N'ee63b2be-29b5-4122-89e8-cfed50e99add', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e|', 1, 1, N'', N'Bước 5', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'81f96d9c-03b1-4df8-8366-ac015e75c224', N'd019dddb-c212-436b-9012-9168084c84b1', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e|9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', 1, 1, N'', N'Bước 3', NULL)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'8a43d5df-aae5-43de-9509-d92e10caf34e', N'65c697ba-b8a0-42d9-af80-b15049147504', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'', NULL, 1, N'', N'123123', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'945bf7f4-8de1-4a44-b31d-f79dd9161ca8', N'c5bf3bc7-710c-4f75-b139-5d61902a86bc', N'fad30dc6-a287-433d-a22b-dcb2fc07a593', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'', NULL, 1, N'', N'Phê duyệt bộ phận kho', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'95fed7a8-2392-4f14-aa46-17134e4e7e21', N'd019dddb-c212-436b-9012-9168084c84b1', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', 1, 1, N'', N'Bước 1', NULL)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', N'3295cf82-a66c-4523-b41b-69b724108236', N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'DEP/3a0a64d9-fe22-4b88-ac84-04458fddf6d6|ORG/c108aa25-e037-4f10-a116-069dec81df48', NULL, 1, N'', N'Phê duyệt hành chính', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'd3e244ea-1048-47e1-8d8c-db1df62e7381', N'd019dddb-c212-436b-9012-9168084c84b1', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e|9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', 1, 1, N'', N'Bước 3', NULL)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'de69395d-7075-4d83-855b-c5130e65e816', N'd019dddb-c212-436b-9012-9168084c84b1', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81|f04976e5-b230-4ef9-bc0c-3792446c3e8e|', 1, 1, N'', N'Bước 3', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', N'3295cf82-a66c-4523-b41b-69b724108236', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'', 1, 1, N'', N'Phê duyệt nội bộ', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'ee63b2be-29b5-4122-89e8-cfed50e99add', N'bf0becf0-14c5-467b-b1d4-7b2d16d90bf5', N'f3534afe-22c7-488c-bd41-928369deb352', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', 3, 1, N'', N'Bước 3', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'f3534afe-22c7-488c-bd41-928369deb352', N'bf0becf0-14c5-467b-b1d4-7b2d16d90bf5', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81|', 1, 1, N'', N'Bước X', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'f9dc13e8-e5bb-40b9-8fff-a1391c5d7563', N'483cd67f-21d5-4351-ab00-b88ea5846383', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'', NULL, 1, N'', N'123123', 0)
INSERT [dbo].[ProcessStep] ([ID], [ProcessID], [ParentID], [UserID], [Approvers], [ExpiredTime], [IsUseExpiredTime], [Description], [StepName], [IsDelete]) VALUES (N'fad30dc6-a287-433d-a22b-dcb2fc07a593', N'c5bf3bc7-710c-4f75-b139-5d61902a86bc', N'', N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'', NULL, 1, N'', N'Phê duyệt nội bộ', 0)
GO
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'013dfa48-1a97-463f-8790-55dbc1416029', N'quytss', CAST(N'2021-12-06T22:17:16.137' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, N'adsfasdf', N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'057f8f5b-7491-4c02-9d34-0c8c3a3e0be7', N'quytss', CAST(N'2021-12-08T01:20:07.007' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'asdfsadfasdfasdf', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'13c999c5-f76b-4989-899a-c5f70dbb1458', N'quytss', CAST(N'2021-12-08T22:25:18.583' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 1, N'ádfasdf', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'189ae9eb-7a69-4c15-a0bb-3bde1070e664', N'admin1', CAST(N'2021-12-05T09:25:08.943' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', NULL, NULL, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'19c327bd-891b-4d19-9475-b02bd82adb35', N'quytss', CAST(N'2021-12-06T22:30:40.133' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'ádfsadf', N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'1a9ec528-0a0c-4a9e-b81c-324ce48ff494', N'quytss', CAST(N'2021-12-06T22:34:26.937' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, N'ádfasdf', N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'2ea3aa00-dc5e-424b-9cff-43024555b41b', N'quytss', CAST(N'2021-12-09T02:05:30.570' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 1, N'12341234', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'3acf57f9-d1df-497c-b6f9-9040253a7cf1', N'quytss', CAST(N'2021-12-08T01:22:41.510' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'asdfsadf', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'49a662d4-ef4e-4049-a569-efdfe9dac307', N'quytss', CAST(N'2021-12-09T02:39:58.573' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'Mua s?m m?i', N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'4f43e182-3901-4798-959c-51982e4cb83a', N'quytss', CAST(N'2021-12-08T00:57:07.317' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'asdfasdfasdf', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'5499c394-5524-4175-bb8d-ddcbb3bc97cb', N'quytss', CAST(N'2021-12-05T23:10:33.270' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'5713f73a-15a6-4de9-88d2-ba3eb05d0e58', N'admin1', CAST(N'2021-12-05T09:26:04.833' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', NULL, NULL, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'57dfb347-5033-48da-b04a-6e68e16c359b', N'quytss', CAST(N'2021-12-09T02:36:46.910' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'Mua s?m nhà c?a', N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'64720d63-fcc3-4987-9d07-a3b6943eb16b', N'quytss', CAST(N'2021-12-07T23:56:20.693' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'68180883-1ea9-4e54-b978-92fb5f13cb71', N'quytss', CAST(N'2021-12-09T02:14:31.933' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 1, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', N'RECOVERY', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'78013b4e-75be-4121-a208-d105212da25d', N'quytss', CAST(N'2021-12-05T23:17:43.380' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'78ca7482-f1e8-4ec1-af3e-f05aaf10b909', N'quytss', CAST(N'2021-12-09T01:38:36.790' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, N'dsafasdf', N'3295cf82-a66c-4523-b41b-69b724108236', N'RECOVERY', 1, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'7cb03a0f-ee26-4e73-bc72-bdce5b40e585', N'quytss', CAST(N'2021-12-09T00:48:52.053' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', N'RECOVERY', 1, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'9997e8b0-094e-4ac9-976b-e1f2d3cc4474', N'quytss', CAST(N'2021-12-08T01:34:54.870' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 1, N'asdfsadf', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'a0e7d18b-131c-4b43-be84-86dd8efdce27', N'quytss', CAST(N'2021-12-05T21:29:01.093' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', NULL, NULL, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'ae72f5e6-47ab-4fe7-b1ba-b850834fe845', N'quytss', CAST(N'2021-12-08T01:32:16.107' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'asdfasdf', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'b14ccbdd-7eba-491a-b760-4c422f60a9bc', N'quytss', CAST(N'2021-12-09T02:41:58.827' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 1, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'b903338a-6445-4c35-8589-43db376ef15d', N'quytss', CAST(N'2021-12-09T00:36:40.397' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 1, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'c22b50e9-da29-43a7-b9ff-028325b9dbf3', N'quytss', CAST(N'2021-12-08T22:15:48.427' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 1, N'sdfsadfasdf', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'c2eece33-8431-47bd-946f-11b245822d36', N'quytss', CAST(N'2021-12-09T02:42:34.343' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 1, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', N'RECOVERY', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'c9808c19-acb0-421f-b554-bd14e788abf0', N'quytss', CAST(N'2021-12-06T22:18:42.717' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, N'ádfsadf', N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'caec4f9e-afc1-4a21-8809-07525131c88e', N'quytss', CAST(N'2021-12-08T01:15:05.797' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'qwerqwer', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'ddd9aa7d-120c-4d84-9a24-9cc54e3a6e46', N'quytss', CAST(N'2021-12-08T01:30:28.090' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'aefwqerwqr', N'3295cf82-a66c-4523-b41b-69b724108236', N'ALLOCATION', 0, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'df9f88a0-87d1-4654-bc57-ac3faf502384', N'quytss', CAST(N'2021-12-09T02:34:28.837' AS DateTime), N'a181e219-ba39-4dcd-9295-43c90c0bf4b3', 0, N'Mua s?m thi?t b?', N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'e1a6bf9a-ef16-434c-8297-188b13d502d8', N'quytss', CAST(N'2021-12-06T22:12:41.723' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, N'ádfsadf', N'3295cf82-a66c-4523-b41b-69b724108236', N'SHOPPING', 0, N'dc55f886-34f7-40bc-98a4-a9b607bfcef7')
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'e3fea8cf-1a60-42ee-88bc-e920cb99dd7e', N'quytss', CAST(N'2021-12-05T21:41:50.320' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, N'123123123', N'3295cf82-a66c-4523-b41b-69b724108236', NULL, NULL, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'e851e943-5d77-4836-b6e7-4de70f3c563a', N'admin1', CAST(N'2021-12-05T20:54:32.737' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', NULL, NULL, NULL)
INSERT [dbo].[request_ticket_history] ([ID], [RequestBy], [CreateDate], [StepID], [IsApprove], [Description], [ProcessID], [RequestType], [IsReject], [StoreID]) VALUES (N'f5ec1489-11bb-48a6-ab10-d8c1daa35d87', N'admin1', CAST(N'2021-12-05T09:28:20.080' AS DateTime), N'e6f6615d-e91c-43ee-b97a-df8f1376ed66', 0, NULL, N'3295cf82-a66c-4523-b41b-69b724108236', NULL, NULL, NULL)
GO
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'0654160f-a7a7-43bd-8705-693006b8b4b6', N'2321      ', CAST(N'2021-12-01T00:30:45.867' AS DateTime), N'811fc9b0-2866-4bac-af1c-602df463e51f|', NULL)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'3260bf5c-1922-4e17-a55b-9d9bae588d5e', N'123123    ', CAST(N'2021-12-01T01:24:29.877' AS DateTime), N'', 1)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'33a96e8c-105a-4854-b375-6564d88b5095', NULL, CAST(N'2021-12-01T01:22:36.957' AS DateTime), NULL, 1)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'3b0778ec-7e80-4f1f-a37d-7532baa74fb2', NULL, CAST(N'2021-12-01T01:02:39.947' AS DateTime), NULL, 0)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'3d62ff34-1724-4607-868c-06ad743319f8', N'11111     ', CAST(N'2021-12-01T01:19:59.963' AS DateTime), N'9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', 1)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'40279a75-ce52-4987-aeb8-b59336c405dd', NULL, CAST(N'2021-12-01T01:02:57.900' AS DateTime), NULL, 0)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'45f70438-09df-4943-b1fb-dd282eb2ba06', NULL, CAST(N'2021-12-01T01:02:32.933' AS DateTime), NULL, 0)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'49425844-3f14-4700-91c3-89138fade212', NULL, CAST(N'2021-12-01T01:28:59.743' AS DateTime), NULL, 1)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'4da6619f-b157-4de8-9176-145ad043dc9e', NULL, CAST(N'2021-12-01T01:22:07.250' AS DateTime), NULL, 1)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'6632541b-bf37-4c05-8147-2b060f141534', N'123       ', CAST(N'2021-12-01T00:29:45.937' AS DateTime), N'811fc9b0-2866-4bac-af1c-602df463e51f|9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', NULL)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'70a59968-65cd-4c8c-882d-f7e22e1ff35d', N'123123    ', CAST(N'2021-12-01T01:22:50.413' AS DateTime), N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81|9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|811fc9b0-2866-4bac-af1c-602df463e51f|', NULL)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'73bb2ce1-b900-4988-a648-f655a15772c5', NULL, CAST(N'2021-12-01T01:28:45.517' AS DateTime), NULL, 0)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'7e84b5e0-5f24-450f-ad5b-4994e42d8308', N'3333      ', CAST(N'2021-12-01T01:29:03.113' AS DateTime), N'', 1)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'8fb95bf9-b680-4e85-b3ac-5b83904913c7', N'123       ', CAST(N'2021-12-01T01:03:22.693' AS DateTime), N'811fc9b0-2866-4bac-af1c-602df463e51f|', NULL)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'aede5579-6cca-45c5-b46a-3f9032e80188', NULL, CAST(N'2021-12-01T01:27:50.557' AS DateTime), NULL, 0)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'b6f90721-1ef0-497d-8173-b5f6c4ead966', N'123123    ', CAST(N'2021-12-01T01:22:41.427' AS DateTime), N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81|9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', NULL)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'c5c4a386-c96c-4b0d-bb39-7869e22d5831', NULL, CAST(N'2021-12-01T01:30:27.940' AS DateTime), NULL, 1)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'ce97ada3-acc9-4a08-9578-45f1f3fe4b85', NULL, CAST(N'2021-12-01T01:30:33.610' AS DateTime), NULL, 1)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'dc55f886-34f7-40bc-98a4-a9b607bfcef7', N'kho 1     ', CAST(N'2021-12-01T01:37:29.047' AS DateTime), N'', 0)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'e68c2775-0471-4df7-812c-31509282cc9a', N'11111     ', CAST(N'2021-12-01T01:04:38.140' AS DateTime), N'9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17|', 1)
INSERT [dbo].[store_Identifie] ([ID], [StoreName], [CreateDate], [Owner], [IsDelete]) VALUES (N'f80d6692-d3b7-4856-9643-0646e0d8e434', NULL, CAST(N'2021-12-01T00:58:51.613' AS DateTime), NULL, 1)
GO
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'2deb72c5-1e54-4bf9-887e-8e69442718db', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-12-09T02:59:13.293' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'310e46b7-ad7d-432b-919d-d8955d2e26ff', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-12-09T02:49:39.650' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'4eca369d-e427-4f96-8765-2e78e74ee1ff', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-12-09T02:49:15.450' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'aa81cde4-7bc0-4e45-9aac-f1ffb3e5529b', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-12-09T02:58:03.870' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'ed981ed4-6570-48b9-b7a4-d846db21ab0d', N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', CAST(N'2021-12-09T02:58:13.797' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
GO
INSERT [dbo].[usage_history] ([ID], [TicketID], [AssetID], [Quantity], [UsageFor], [IsUsed], [IsRecovery], [IsLiquidation], [CreateDate]) VALUES (N'2fa39145-7079-42bf-a3e2-aff4c70299d0', N'c2eece33-8431-47bd-946f-11b245822d36', N'f0c7a81e-bcb4-403b-92f8-e4202cd49924', 1, N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81', 0, 1, 0, CAST(N'2021-12-09T02:41:58.853' AS DateTime))
GO
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token], [DepartmentID], [OrganizationID], [DOB], [Email], [Phone]) VALUES (N'0540dc66-27a9-450c-b9f7-9cb3aeaaaf81', N'quytss', N'NTI5cQ6PcSyOrkllQvnmCUBI3vJAYpD2', CAST(N'2021-11-22T14:32:37.950' AS DateTime), 0, 0, NULL, N'quytss', NULL, N'LWYsSjrus0G2EN3x3wTb3sUqRlOcdIeP', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', N'c108aa25-e037-4f10-a116-069dec81df48', CAST(N'2021-11-22' AS Date), N'123', N'123')
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token], [DepartmentID], [OrganizationID], [DOB], [Email], [Phone]) VALUES (N'28e9ddd3-c2a8-433f-bc56-7a51135f221d', N'a', N'DB5TN+j04S1H49x87OXisZke40rYNn6b', CAST(N'2021-10-28T14:19:41.113' AS DateTime), 0, 0, NULL, N'Trần Thanh Quý', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token], [DepartmentID], [OrganizationID], [DOB], [Email], [Phone]) VALUES (N'639ff11f-0e33-4a4f-b9aa-d09e5caaafde', N'admin', N'NTI5cQ6PcSyOrkllQvnmCUBI3vJAYpD2', CAST(N'2021-10-28T14:18:44.693' AS DateTime), 0, 1, NULL, N'administrator', NULL, N'wjngo5wCgV2FFypF4ODjGgvauBnlhg0E', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token], [DepartmentID], [OrganizationID], [DOB], [Email], [Phone]) VALUES (N'811fc9b0-2866-4bac-af1c-602df463e51f', N'vantv', N'NTI5cQ6PcSyOrkllQvnmCUBI3vJAYpD2', CAST(N'2021-11-30T23:25:22.373' AS DateTime), 0, 1, NULL, N'Trần Văn Văn', NULL, NULL, N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', N'c108aa25-e037-4f10-a116-069dec81df48', CAST(N'2021-11-30' AS Date), N'123', N'123')
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token], [DepartmentID], [OrganizationID], [DOB], [Email], [Phone]) VALUES (N'9bf27d6a-1ad0-4c49-9db0-0ab0a5b7ec17', N'12qwe', N'DB5TN+j04S1H49x87OXisZke40rYNn6b', CAST(N'2021-11-30T23:44:44.057' AS DateTime), 0, 0, NULL, N'12qwe', NULL, NULL, N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', N'600dcee7-e792-448a-8258-a44d8e94d0e5', CAST(N'0001-01-01' AS Date), N'123', N'123')
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token], [DepartmentID], [OrganizationID], [DOB], [Email], [Phone]) VALUES (N'f04976e5-b230-4ef9-bc0c-3792446c3e8e', N'admin1', N'NTI5cQ6PcSyOrkllQvnmCUBI3vJAYpD2', CAST(N'2021-12-01T23:21:30.167' AS DateTime), 0, 0, NULL, N'Admin', NULL, N'/SfjZ7/hH6qRK+q2euyQ+pS9xXebCMYP', N'3a0a64d9-fe22-4b88-ac84-04458fddf6d6', N'600dcee7-e792-448a-8258-a44d8e94d0e5', CAST(N'0001-01-01' AS Date), N'123123', N'123123')
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
ALTER TABLE [dbo].[asset_detail]  WITH CHECK ADD  CONSTRAINT [FK_asset_detail_request_ticket_history] FOREIGN KEY([TicketID])
REFERENCES [dbo].[request_ticket_history] ([ID])
GO
ALTER TABLE [dbo].[asset_detail] CHECK CONSTRAINT [FK_asset_detail_request_ticket_history]
GO
ALTER TABLE [dbo].[asset_detail]  WITH CHECK ADD  CONSTRAINT [FK_asset_detail_store_Identifie] FOREIGN KEY([StoreID])
REFERENCES [dbo].[store_Identifie] ([ID])
GO
ALTER TABLE [dbo].[asset_detail] CHECK CONSTRAINT [FK_asset_detail_store_Identifie]
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
