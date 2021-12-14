import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import '../Access/Css/NavBar.scss';
import '../Access/Css/Common.scss';
import { Col, Input, Row, Avatar, Badge, Popover } from 'antd';
import {
    UserOutlined,
    MessageOutlined,
    BellOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions/action';
import * as cookieHandle from '../../Common/Cookie';
import {
    useHistory
} from "react-router-dom";

const NavigationBar = (prop) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        saveCookie,
        getUserInfoLogin,
        setShowMenu,
        setRequestID,
        requestNotification,
        setFunctionTitle
    } = amsAction;
    const {
        token,
        userName,
        userInfoLogin,
        showMenu,
        notifications,
        configCommon
    } = prop.amsStore;

    const [countNotification, setCountNotification] = useState(0)

    function readNotification() {
        if (notifications) {
            let count = 0;
            notifications.Response.Notifications.forEach(element => {
                if (element.IsRead === false) {
                    count++
                }
            });
            setCountNotification(count)
        }else{
            setCountNotification(0)
        }
    }

    const signout = () => {
        cookieHandle.setCookie("BASE", null, 0);
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
                    {userInfoLogin?.UserFullName}
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
            <div className="notification-board">
                {
                    notifications?.Response?.Notifications &&
                    notifications.Response.Notifications.map((element) => {
                        return (
                            <div
                                key={element.ID}
                                className="item"
                                onClick={() => {
                                    const ac = JSON.parse(element.Action)
                                    const body2 = {
                                        Token: token,
                                        Key: "GET_NOTIFICATION",
                                        UserNameRequest: userName,
                                    }
                                    if (ac.Key !== "REJECT") {
                                        dispatch(requestNotification(body2))
                                        dispatch(setRequestID(ac.Value + "|" + element.ID))
                                        setTimeout(() => {
                                            let title = ""
                                            configCommon.Response.Configs.forEach(element => {
                                                switch (element.Code) {
                                                    case "FUNCTION":
                                                        const funcArray = JSON.parse(element.Value)
                                                        funcArray.forEach(func => {
                                                            if(ac.Path === func.FunctionPath){
                                                                title = func.FunctionName
                                                            }
                                                        });
                                                        break
                                                    default:
                                                        break;
                                                }
                                            })
                                            dispatch(setFunctionTitle("Phê duyệt " + title))
                                            history.push(ac.Path)
                                        }, 300);
                                    } else {
                                        const body = {
                                            Token: token,
                                            Key: "READED_NOTIFICATION",
                                            UserNameRequest: userName,
                                            Data: element.ID
                                        }
                                        dispatch(requestNotification(body))
                                    }
                                }}>
                                {element.NotificationContent}
                                <h4>{element.CreateDate}</h4>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const MessageBoard = () => {
        return (
            <span>
            </span>
        )
    }

    function getUser() {
        if (userName) {
            const body = {
                Token: token,
                Key: "USER_INFORMATION",
                UserNameRequest: userName,
                Data: {
                    userLoginName: userName
                }
            }
            dispatch(getUserInfoLogin(body))
        }
    }

    useEffect(getUser, [userName])
    useEffect(readNotification, [notifications])

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
                    AMS
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
                <span className="nav-bar-item ams-btn">
                    <Popover placement="bottom" content={<NotificationBoard />} trigger="click">
                        <Badge count={countNotification}>
                            <BellOutlined className="icon" />
                        </Badge>
                    </Popover>
                </span>
                <span className="nav-bar-item ams-btn">
                    <Popover placement="bottom" content={<MessageBoard />} trigger="click">
                        <Badge count={5}>
                            <MessageOutlined className="icon" />
                        </Badge>
                    </Popover>

                </span>
                <span className="nav-bar-item ams-btn">
                    <Popover placement="bottom" content={<UserBoard />} trigger="click">
                        <UserOutlined className="icon" />
                    </Popover>
                </span>
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