import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss';
import { Col, Input, Row, Avatar, Badge, Popover } from 'antd';
import {
    UserOutlined,
    MessageOutlined,
    BellOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ReadFilled,
    TeamOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions';
import * as cookieHandle from '../../Common/Cookie';
import ListEmployee from '../ListEmployee';
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
            var count = 0
            notifications.Response.Notifications.forEach((item) => {
                if (item.IsRead === false) {
                    count++
                }
            })
            setCountNotification(count)
        } else {
            setCountNotification(0)
        }
    }

    const signout = () => {
        cookieHandle.setCookie("BASE", null, 0);
        dispatch(saveCookie(null))
        history.push('/login')
    }

    const UserBoard = () => {
        return (<span className="board-info">
            <Row
                className="menu-item">
                <Col span={3}>
                    <Avatar shape="circle" size={32} src={userInfoLogin ? userInfoLogin.Image : ""} />
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
                    <span >Phòng ban: {userInfoLogin?.UserFullName}</span>
                </Col>
            </Row>
            <Row className="menu-item">
                <Col span={3}>
                    <Avatar size={32} icon={<UserOutlined />} />
                </Col>
                <Col className="menu-label" span={21}>
                    <span >Chức vụ: {userInfoLogin?.UserFullName}</span>
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
                                    dispatch(requestNotification(body2))
                                    dispatch(setRequestID({
                                        createRequest: false,
                                        ticketID: ac.Value,
                                        notiID: element.ID,
                                        readOnly: (ticket) => {
                                            if (ticket && ticket?.Response.Ticket) {
                                                if (ticket.Response.Ticket.StepID !== ac.StepID) {
                                                    return true
                                                }
                                            }
                                            return false
                                        },
                                        stepID: ac.StepID
                                    }))
                                    setTimeout(() => {
                                        let title = ""
                                        configCommon.Response.Configs.forEach(element => {
                                            switch (element.Code) {
                                                case "FUNCTION":
                                                    const funcArray = JSON.parse(element.Value)
                                                    funcArray.forEach(func => {
                                                        if (ac.Path === func.FunctionPath) {
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
                                    }, 100);
                                    if (element.IsRead === false) {
                                        const body = {
                                            Token: token,
                                            Key: "READED_NOTIFICATION",
                                            UserNameRequest: userName,
                                            Data: element.ID
                                        }
                                        dispatch(requestNotification(body))
                                    }
                                }}>
                                <div>
                                    {element.IsRead === false ? <ReadFilled className="green-color" /> : <></>}
                                </div>
                                <div>
                                    <h4>{element.NotificationContent}</h4>
                                    <h4>{(new Date(element.CreateDate)).toLocaleString("us-en")}</h4>
                                </div>
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
                    Quản lý kho thuốc
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
                    <Popover placement="bottom" content={<ListEmployee />} trigger="click">
                        <TeamOutlined className="icon" />
                    </Popover>
                </span>
                <span className="nav-bar-item ams-btn"
                    onClick={() => {
                        const body2 = {
                            Token: token,
                            Key: "GET_NOTIFICATION",
                            UserNameRequest: userName,
                        }
                        dispatch(requestNotification(body2))
                    }}>
                    <Popover placement="bottom" content={<NotificationBoard />} trigger="click">
                        <Badge className="avatar" count={5}>
                            <BellOutlined className="icon" />
                        </Badge>
                    </Popover>
                </span>
                <span className="nav-bar-item ams-btn">
                    <Popover placement="bottom" content={<MessageBoard />} trigger="click">
                        <MessageOutlined className="icon" />
                    </Popover>

                </span>
                <span className="nav-bar-item ams-btn">
                    <Popover placement="bottom" content={<UserBoard />} trigger="click">
                        <Avatar shape="circle" size={"default"} src={userInfoLogin?.Image} />
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