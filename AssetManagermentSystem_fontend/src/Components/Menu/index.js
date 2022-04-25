import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss';
import { Menu } from 'antd';
import {
    TeamOutlined,
    DesktopOutlined,
    AppstoreOutlined,
    CodeSandboxOutlined,
    FundProjectionScreenOutlined,
    DashboardOutlined,
    FileDoneOutlined,
    AuditOutlined
} from '@ant-design/icons';
import {
    useHistory
} from "react-router-dom";

const AMSMenu = (prop) => {
    const history = useHistory();

    const {
        showMenu
    } = prop.amsStore;

    const [menuSelected, setMenuSelected] = useState('Home');

    const menus = [
        {
            key: "Home",
            icon: <DashboardOutlined />,
            title: "Trang chủ",
            link: "/Home"
        },
        {
            key: "Ticket",
            icon: <FileDoneOutlined />,
            title: "Yêu cầu",
            link: "/Ticket"
        },
        {
            key: "Invoice",
            icon: <AuditOutlined />,
            title: "Hóa đơn",
            link: "/Shopping/Invoice"
        },
        {
            key: "Config",
            icon: <DesktopOutlined />,
            title: "Cấu hình",
            link: "/Config"
        },
        {
            key: "Warehousing",
            icon: <AppstoreOutlined />,
            title: "Kho",
            link: "/Warehousing"
        },
        {
            key: "Supplier",
            icon: <TeamOutlined />,
            title: "Đơn vị cung ứng",
            link: "/Supplier"
        },
        {
            key: "Asset",
            icon: <CodeSandboxOutlined />,
            title: "Danh mục",
            link: "/Asset"
        },
        {
            key: "Report",
            icon: <FundProjectionScreenOutlined />,
            title: "Báo cáo",
            link: "/Report"
        },
    ]

    function OnLoading() {
        const href = window.location.href
        menus.forEach((item, index) => {
            if (href.includes(item.key)) {
                setMenuSelected(item.key)
                return
            }
        })
    }

    useEffect(OnLoading, [])

    return (
        <Menu
            selectedKeys={menuSelected}
            className="menu"
            theme="dark"
            mode="inline"
            onClick={(item, key) => {
                setMenuSelected(item.key)
            }}
            inlineCollapsed={showMenu}
        >
            {menus.map((data, index) => {
                return (
                    <Menu.Item
                        key={data.key}
                        icon={data.icon}
                        onClick={() => history.push(data.link)}
                    >
                        {data.title}
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(AMSMenu);