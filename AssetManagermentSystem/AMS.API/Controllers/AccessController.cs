﻿using AMS.API.Models.RequestModel;
using AMS.API.Models.RequestModel.Access;
using AMS.API.Models.ResponseModel;
using AMS.API.Models.ResponseModel.Access;
using AMS.BUS.BusinessHandle;
using AMS.BUS.BusModels;
using AMS.BUS.DBConnect;
using AMS.COMMON.Constands;
using AMS.COMMON.Encryption;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AMS.API.Controllers
{
    public class AccessController : ApiController
    {
        [HttpPost]
        public BaseResponse<Token> Signin(BaseRequest<GetToken> req)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new BaseResponse<Token>()
                    {
                        Code = "201",
                        Message = "Định dạng dữ liệu sai"
                    };
                }

                Access access = new Access();
                BaseModel<string> token = access.CheckLogin(req.Data.UserName, req.Data.UserPassword);
                if (!string.IsNullOrEmpty(token?.Exception?.Code))
                {
                    return new BaseResponse<Token>()
                    {
                        Code = token.Exception.Code,
                        Message = token.Exception.Message
                    };
                }
                else
                {
                    return new BaseResponse<Token>()
                    {
                        Response = new Token()
                        {
                            TokenString = token.Result
                        }
                    };
                }
            }
            catch
            {
                return new BaseResponse<Token>()
                {
                    Code = "501",
                    Message = "An unusual error has occurred",
                };
            }
        }

        [HttpPost]
        public BaseResponse<Token> Signup(BaseRequest<Information> req)
        {
            try
            {
                if (string.IsNullOrEmpty(req.Data.UserName) ||
                    string.IsNullOrEmpty(req.Data.UserPassword) ||
                    string.IsNullOrEmpty(req.Data.UserFullName))
                {
                    return new BaseResponse<Token>()
                    {
                        Code = "201",
                        Message = "Dữ liệu trống",
                    };
                }
                if (string.IsNullOrWhiteSpace(req.Data.UserName) ||
                    string.IsNullOrWhiteSpace(req.Data.UserPassword))
                {
                    return new BaseResponse<Token>()
                    {
                        Code = "201",
                        Message = "Dữ liệu sai định dạng",
                    };
                }
                UserInfor user = new UserInfor();
                BaseModel<user_identifie> user_infor = user.CreateUserInfor(req.Data.UserName, req.Data.UserPassword, req.Data.UserFullName);
                if (!string.IsNullOrEmpty(user_infor.Exception.Code))
                {
                    return new BaseResponse<Token>()
                    {
                        Code = user_infor.Exception.Code,
                        Message = user_infor.Exception.Message
                    };
                }
                return new BaseResponse<Token>()
                {
                    Code = "201",
                    Message = MessagesValue.SUCCESS
                };
            }
            catch
            {
                return new BaseResponse<Token>()
                {
                    Code = "501",
                    Message = "An unusual error has occurred",
                };
            }
        }
    }
}