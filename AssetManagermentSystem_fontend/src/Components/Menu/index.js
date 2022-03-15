import React from "react";
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
    DashboardOutlined
} from '@ant-design/icons';
import {
    useHistory
} from "react-router-dom";

const AMSMenu = (prop) => {
    const history = useHistory();

    const {
        showMenu
    } = prop.amsStore;

    const menus = [
        {
            icon: <DashboardOutlined />,
            title: "Trang chủ",
            link: "/Home"
        },
        {
            icon: <DesktopOutlined />,
            title: "Cấu hình",
            link: "/Config"
        },
        {
            icon: <AppstoreOutlined />,
            title: "Kho",
            link: "/Warehousing"
        },
        {
            icon: <TeamOutlined />,
            title: "Đơn vị cung ứng",
            link: "/Supplier"
        },
        {
            icon: <CodeSandboxOutlined />,
            title: "Tài sản",
            link: "/Asset"
        },
        {
            icon: <FundProjectionScreenOutlined />,
            title: "Báo cáo",
            link: "/Report"
        },
    ]

    return (
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            className="menu"
            theme="dark"
            mode="inline"
            inlineCollapsed={showMenu}
        >
            {menus.map((data, index) => {
                return (
                    <Menu.Item
                        key={index}
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