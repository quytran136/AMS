USE [AMS_DB]
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoCaoYeuCauPheDuyet]    Script Date: 2021-12-13 9:38:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_BaoCaoYeuCauPheDuyet]
	@dateStart datetime,
	@dateEnd datetime,
	@searchContent NVARCHAR
AS
	SELECT 
	rt.RequestType [Loại yêu cầu],
	rt.RequestBy [Người yêu cầu],
	ISNULL(ui.UserName, '') [Yêu cầu cho],
	uh.Quantity [Số lượng yêu cầu],
	rt.Description [Ghi chú],
	CONVERT(varchar, rt.CreateDate, 103) [Ngày yêu cầu],
	(CASE WHEN rt.IsApprove = 1 then N'Đã duyệt xong'
	WHEN rt.IsReject = 1 then N'Từ chối duyệt'
	WHEN rt.IsApprove = 0 and rt.IsReject = 0 then N'Đang trong quá trình phê duyệt' END) [Tình trạng duyệt]
	FROM request_ticket_history rt
	LEFT JOIN usage_history uh on rt.ID = uh.TicketID
	LEFT JOIN user_identifie ui on uh.UsageFor = ui.ID
	where rt.CreateDate between @dateStart and @dateEnd
	and (rt.Description like '%'+@searchContent+'%' 
	or rt.RequestBy like '%'+@searchContent+'%')
	ORDER BY rt.CreateDate desc