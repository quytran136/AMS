USE [AMS_DB]
GO
/****** Object:  Table [dbo].[asset_allocation_history]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[asset_classify]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[asset_detail]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[asset_recovery_history]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[assets_liquidation_history]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[Department]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[function]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[rank]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[role]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[role_function]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[role_view]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[store_Identifie]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[user_identifie]    Script Date: 2021-10-24 9:44:47 AM ******/
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
/****** Object:  Table [dbo].[view_page]    Script Date: 2021-10-24 9:44:47 AM ******/
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
INSERT [dbo].[user_identifie] ([ID], [UserName], [UserPassword], [CreateDate], [IsLock], [IsDelete], [Role], [UserFullName], [Image], [Token]) VALUES (N'B3081526-4151-4A84-8820-706E269663E4', N'admin', N'mKWYoI4R0svkm6c893mi6opZvO/ZdYjQ', NULL, 0, 0, N'0', N'ADMIN', N' ', N'DMdj63Z73FC6dR0jBEsHhBwgEhmH29he')
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
