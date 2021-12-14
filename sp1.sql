USE [AMS_DB]
GO
/****** Object:  StoredProcedure [dbo].[sp_NewNotification]    Script Date: 2021-12-14 11:09:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_NewNotification]
AS
BEGIN
	SELECT noti.NotificationFor FROM ams_notification noti
	WHERE noti.IsRead <> 1
	GROUP BY noti.NotificationFor
END
