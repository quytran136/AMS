import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import '../Access/Css/NavBar.scss';
import '../Access/Css/Common.scss';
import { Col, Input, Row, Avatar } from 'antd';
import {
    UserOutlined,
    MessageOutlined,
    BellOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions/action';
import * as cookieHandle from '../../Common/Cookie'

const NavigationBar = (prop) => {
    const dispatch = useDispatch();
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showNotiInfo, setShowNotiInfo] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const {
        saveCookie,
        getUserInfo,
        setShowMenu
    } = amsAction;
    const {
        token,
        userName,
        userInfo,
        showMenu
    } = prop.amsStore;

    const signout = () => {
        cookieHandle.setCookie("BASE", null, -1);
        dispatch(saveCookie(null))
    }

    const UserBoard = () => {
        return (<span className="board-info">
            <Row
                className="menu-item"
                onClick={() => {

                }}>
                <Col span={3}>
                    <Avatar size={32} icon={<UserOutlined />} />
                </Col>
                <Col className="menu-label" span={21} align="top" justify="center">
                    {userInfo?.Response?.UserFullName}
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
            <Row className="menu-item"
                onClick={() => signout()}
            >
                <Col span={3}>
                    <LogoutOutlined />
                </Col>
                <Col className="menu-label" span={21}>
                    <span >Đăng xuất</span>
                </Col>
            </Row>
        </span>)
    }

    const NotificationBoard = () => {
        return (
            <span className="board-info">
            </span>
        )
    }

    const MessageBoard = () => {
        return (
            <span className="board-info">
            </span>
        )
    }

    function getUser() {
        if (userName) {
            // console.log(userName)
            const body = {
                Token: token,
                Key: "GET_INFORMATION",
                Data: {
                    UserName: userName
                }
            }
            dispatch(getUserInfo(body))
        }
    }

    useEffect(getUser, [userName])

    return (
        <Row className="navbar">
            <Col span={14} className="nav-bar-left">
                <div
                    className="nav-bar-item ams-btn"
                    onClick={() => {
                        dispatch(setShowMenu(!showMenu))
                    }}>
                    {showMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
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
            <Col span={10} className="nav-bar-right">
                <span className="nav-bar-item ams-btn"
                    onClick={() => {
                        setShowNotiInfo(!showNotiInfo)
                        setShowUserInfo(false)
                        setShowMessage(false)
                    }}>
                    <BellOutlined />
                    <span className="number-noti">
                        12
                    </span>
                </span>
                <span className="nav-bar-item ams-btn"
                    onClick={() => {
                        setShowMessage(!showMessage)
                        setShowUserInfo(false)
                        setShowNotiInfo(false)
                    }}>
                    <MessageOutlined />
                    <span className="number-noti">
                        12
                    </span>
                </span>
                <span className="nav-bar-item ams-btn"
                    onClick={() => {
                        setShowUserInfo(!showUserInfo)
                        setShowNotiInfo(false)
                        setShowMessage(false)
                    }}
                >
                    <UserOutlined />
                </span>
                {showUserInfo ? <UserBoard /> : ""}
                {showNotiInfo ? <NotificationBoard /> : ""}
                {showMessage ? <MessageBoard /> : ""}
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