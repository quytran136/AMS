import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import { Button, Input, Row, Col, Table, Avatar } from 'antd';
import {
    DashboardOutlined,
    FileDoneOutlined
} from '@ant-design/icons';
import * as amsAction from '../../../ReduxSaga/Actions';
import UpdateEmployee from "../UpdateEmployee";

const Authorization = (prop) => {
    const menus = [
        {
            key: "Home",
            title: "Trang chủ",
            link: "/Home"
        },
        {
            key: "Ticket",
            title: "Yêu cầu",
            link: "/Ticket"
        },
        {
            key: "Invoice",
            title: "Hóa đơn",
            link: "/Shopping/Invoice"
        },
        {
            key: "Warehousing",
            title: "Kho",
            link: "/Warehousing"
        },
        {
            key: "Supplier",
            title: "Đơn vị cung ứng",
            link: "/Supplier"
        },
        {
            key: "Asset",
            title: "Danh mục",
            link: "/Asset"
        },
        {
            key: "Report",
            title: "Báo cáo",
            link: "/Report"
        },
        {
            key: "Config",
            title: "Cấu hình",
            link: "/Config"
        },
    ]

    return(<div>
        <h3>
            Cấu hình quyền
        </h3>
    </div>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Authorization);