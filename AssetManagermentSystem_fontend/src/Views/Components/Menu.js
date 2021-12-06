import React from "react";
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import '../Access/Css/Menu.scss';
import '../Access/Css/Common.scss';
import { Menu } from 'antd';
import {
    HomeOutlined,
    DesktopOutlined,
    AppstoreOutlined,
    CodeSandboxOutlined,
    FundProjectionScreenOutlined
} from '@ant-design/icons';
import {
    useHistory
} from "react-router-dom";
// import * as amsAction from '../../ReduxSaga/Actions/action';

const AMSMenu = (prop) => {
    const history = useHistory();

    const {
        showMenu
    } = prop.amsStore;

    return (
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            className="menu"
            theme="dark"
            mode="inline"
            inlineCollapsed={showMenu}
        >
            <Menu.Item
                key="1"
                icon={<HomeOutlined />}
                onClick={() => history.push('/Home')}
            >
                Trang chủ
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={<DesktopOutlined />}
                onClick={() => history.push('/Config')}
            >
                Cấu hình
            </Menu.Item>
            <Menu.Item
                key="3"
                icon={<AppstoreOutlined />}
                onClick={() => history.push('/Warehousing')}
            >
                Kho
            </Menu.Item>
            <Menu.Item
                key="4"
                icon={<CodeSandboxOutlined />}
                onClick={() => history.push('/Asset')}
            >
                Tài sản
            </Menu.Item>
            <Menu.Item
                key="5"
                icon={<FundProjectionScreenOutlined />}
                onClick={() => history.push('/Report')}
            >
                Báo cáo
            </Menu.Item>
        </Menu>
    )
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(AMSMenu);