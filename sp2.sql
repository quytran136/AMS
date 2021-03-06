USE [AMS_DB]
GO
/****** Object:  Table [dbo].[voting_history]    Script Date: 2021-12-14 1:30:03 PM ******/
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
 CONSTRAINT [PK_voting_history] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
