USE [AMS_DB]
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoCaoTonKho]    Script Date: 2021-12-13 9:51:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_BaoCaoTonKho]
	@dateStart datetime,
	@dateEnd datetime,
	@searchContent NVARCHAR
AS
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
	WHERE ad.IsActive = 1 and ad.CreateDate between @dateStart and @dateEnd and (
		ac.AssetClassifyName like '%'+@searchContent+'%'
		or ad.AssetFullName like '%'+@searchContent+'%'
	)
	order by ad.CreateDate desc