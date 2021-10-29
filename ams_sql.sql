USE [AMS_DB]
GO
/****** Object:  Table [dbo].[asset_allocation_history]    Script Date: 2021-10-29 8:11:32 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asset_classify]    Script Date: 2021-10-29 8:11:32 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asset_detail]    Script Date: 2021-10-29 8:11:32 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asset_recovery_history]    Script Date: 2021-10-29 8:11:32 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[assets_liquidation_history]    Script Date: 2021-10-29 8:11:32 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 2021-10-29 8:11:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[ID] [varchar](64) NOT NULL,
	[DepartmentName] [nvarchar](128) NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[function]    Script Date: 2021-10-29 8:11:32 PM ******/
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
/****** Object:  Table [dbo].[message_list]    Script Date: 2021-10-29 8:11:32 PM ******/
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
/****** Object:  Table [dbo].[rank]    Script Date: 2021-10-29 8:11:32 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 2021-10-29 8:11:32 PM ******/
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
/****** Object:  Table [dbo].[role_function]    Script Date: 2021-10-29 8:11:32 PM ******/
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
/****** Object:  Table [dbo].[role_view]    Script Date: 2021-10-29 8:11:32 PM ******/
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
/****** Object:  Table [dbo].[store_Identifie]    Script Date: 2021-10-29 8:11:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[store_Identifie](
	[ID] [varchar](64) NOT NULL,
	[StoreName] [nchar](10) NULL,
	[CreateDate] [datetime] NULL,
	[UserID] [varchar](64) NULL,
	[Owner] [nvarchar](128) NULL,
 CONSTRAINT [PK_store_Identifie] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[system_log]    Script Date: 2021-10-29 8:11:32 PM ******/
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
/****** Object:  Table [dbo].[user_identifie]    Script Date: 2021-10-29 8:11:32 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[view_page]    Script Date: 2021-10-29 8:11:32 PM ******/
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
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'1E9FC8E8-B080-4804-99F8-0BF20D37231C', N'Business', N'B01B1', NULL, N'Không tìm thấy thông tin tài khoản')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'73E50B8E-4A5E-4C22-B985-F628F3CC7E09', N'Business', N'B01A2', NULL, N'Người dùng không tồn tại')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'9729CAF2-2CA0-45F3-A2B8-ADF3E7C962E2', N'Business', N'B01B3', NULL, N'Password cũ trùng password mới')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', N'Business', N'B01A1', NULL, N'Sai tài khoản hoặc mật khẩu')
INSERT [dbo].[message_list] ([ID], [KeyCode], [Code], [Message_EN], [Message_VN]) VALUES (N'D092CD4F-3FA3-4E79-866B-0A28179E2EC6', N'Business', N'B01B2', NULL, N'Tài khoản đã tồn tại')
GO
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'1272cb78-b363-4406-8d90-c18da65fd08e', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:57:31.537' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'2dec7ad6-aa58-40ad-9d4b-454be6ba1549', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:21:58.543' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'353b0ac0-07e1-42e8-b031-12f07defd1cc', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:57:37.093' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'37b690d5-d617-41c9-91ab-36d0568f3ad3', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:37:07.197' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'3d89eb45-3acd-4749-98b2-f220eb05eedd', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:38.337' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'43c33e9f-fd7e-4dff-9888-54a985213a7e', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:21:22.983' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'47a4a19e-2e19-4874-80de-331f2fb0a2a1', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:00:37.360' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'50031210-fc27-4280-81da-aa831e06f3c8', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:35:14.893' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'50dba17e-0b55-4b69-ad9b-d5888fc21bbe', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:22:00.947' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'59bffe93-c0c6-455f-8b93-cb9f66dc8685', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:38.977' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'680edb8f-7602-4195-a059-37263e97165a', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T14:52:02.010' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'6939b886-af7e-4dc0-a734-51b52ecc17f1', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:33.087' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'6a6e4d92-bf71-4b30-bc74-42c9d4f5db82', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:39.003' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'6f6e6f4a-2012-41b6-91f5-d4c7085a4836', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:21:19.090' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'70e239f0-987f-4cf7-a31c-41d2912f5769', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:36:26.223' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'715dacc2-e8db-44e6-a22e-287e13f4e7b4', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:41.227' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'7cb512e3-0ec1-473b-8591-ca480be859dc', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T14:53:14.450' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'84316954-1d9a-48af-a780-50affca692e9', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:40.270' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'9efeb8e8-f429-4c5a-b80e-4ce1a371f812', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:41.073' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'a9aa60e1-c29b-446b-b46f-2382d2f21379', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:58:11.117' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'b721a7ef-6466-451f-b623-92f10c7fee92', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:33:23.767' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'be7c7378-e85a-44c4-b639-a1e889fa4d2f', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:58:39.730' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'c5a2ce0e-410a-4f52-adaa-8f55977ff835', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:29:40.887' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'c796c1c8-83ba-478c-9f35-4a8509573c67', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:38.510' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'c9ee53cb-8173-4fa8-8b42-7eb18cfbcdd7', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:34:11.000' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'cc0b597c-1f5d-411a-abb1-6c43fbb97482', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:38:44.270' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'd0c5ae85-a1ef-4c79-aeb0-49a4afae9179', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:36.287' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'd2fd3a58-f01d-407b-8c9b-c6ebb3805337', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:32:44.637' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'daf9314d-c8f5-4c55-9c96-d206683c4d4c', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:21:55.403' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'e9d4e81e-c232-486c-94d5-f7a659972680', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:12:24.177' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'eaf9e00f-edcc-43cb-aef8-3498757c487c', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T16:59:38.667' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'f15155d0-ca12-4ead-89bb-900392f06f17', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:00:32.413' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
INSERT [dbo].[system_log] ([ID], [MessageID], [CreateDate], [Creator], [Detail]) VALUES (N'f7fbd814-ac4b-44c6-80f6-c8482408b9e5', N'BC7B24EA-54B7-4930-B007-6E7EBE0499E2', CAST(N'2021-10-28T17:14:04.767' AS DateTime), NULL, N'Exception of type ''System.Exception'' was thrown.')
GO
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token]) VALUES (N'28e9ddd3-c2a8-433f-bc56-7a51135f221d', N'a', N'DB5TN+j04S1H49x87OXisZke40rYNn6b', CAST(N'2021-10-28T14:19:41.113' AS DateTime), 0, 0, NULL, N'Trần Thanh Quý', NULL, NULL)
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token]) VALUES (N'639ff11f-0e33-4a4f-b9aa-d09e5caaafde', N'admin', N'NTI5cQ6PcSyOrkllQvnmCUBI3vJAYpD2', CAST(N'2021-10-28T14:18:44.693' AS DateTime), 0, 0, NULL, N'administrator', NULL, N'DMdj63Z73FC6dR0jBEsHhBwgEhmH29he')
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
