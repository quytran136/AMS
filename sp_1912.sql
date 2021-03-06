USE [AMS_DB]
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoCaoTinhTrangSuDung]    Script Date: 2021-12-16 10:11:00 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_BaoCaoTrangThaiTaiSan]    Script Date: 2021-12-16 10:11:00 PM ******/
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
