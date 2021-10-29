import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import '../Access/Css/NavBar.scss';
import '../Access/Css/Common.scss';
import { Col, Input, Row, Avatar } from 'antd';
import openNotification from '../Components/openNotification';
import {
    UserOutlined,
    MessageOutlined,
    NotificationOutlined,
    BellOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions/action';
import * as messageType from '../../Common/messageCode';

const NavigationBar = (prop) => {

    const [showUserInfo, setShowUserInfo] = useState(false);

    return (
        <Row className="navbar">
            <Col span={16} className="nav-bar-left">
                <span className="nav-bar-item ams-btn">
                    LOGO
                </span>
                <span className="nav-bar-item">
                    <Input.Group>
                        <Input.Search
                            placeholder="Search..."
                        />
                    </Input.Group >
                </span>
            </Col>
            <Col span={8} className="nav-bar-right">
                <span className="nav-bar-item ams-btn">
                    <BellOutlined />
                    <span className="number-noti">
                        12
                    </span>
                </span>
                <span className="nav-bar-item ams-btn">
                    <MessageOutlined />
                    <span className="number-noti">
                        12
                    </span>
                </span>
                <span className="nav-bar-item ams-btn"
                    onClick={() => setShowUserInfo(!showUserInfo)}
                >
                    <UserOutlined />
                </span>
                {showUserInfo ?
                    <span className="board-info">
                        <Row className="menu-item">
                            <Col span={3}>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Col>
                            <Col className="menu-label" span={21} align="top" justify="center">
                                User name
                            </Col>
                        </Row>
                        <hr />
                        <Row className="menu-item">
                            <Col span={3}>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Col>
                            <Col className="menu-label" span={21}>
                                <span >User name</span>
                            </Col>
                        </Row>
                        <Row className="menu-item">
                            <Col span={3}>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Col>
                            <Col className="menu-label" span={21}>
                                <span >User name</span>
                            </Col>
                        </Row>
                        <Row className="menu-item">
                            <Col span={3}>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Col>
                            <Col className="menu-label" span={21}>
                                <span >User name</span>
                            </Col>
                        </Row>
                        <Row className="menu-item">
                            <Col span={3}>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Col>
                            <Col className="menu-label" span={21}>
                                <span >User name</span>
                            </Col>
                        </Row>
                        <hr />
                        <Row className="menu-item">
                            <Col span={3}>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Col>
                            <Col className="menu-label" span={21}>
                                <span >User name</span>
                            </Col>
                        </Row>
                    </span> : ""
                }
            </Col>
        </Row>
    )
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(NavigationBar);