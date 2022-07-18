import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import './style.scss';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import OpenNotification from '../OpenNotification';
import {
    UserOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
    WarningOutlined
} from '@ant-design/icons';
import * as amsAction from '../../../ReduxSaga/Actions';
import * as messageType from '../../Common/messageCode';
import { useHistory } from 'react-router-dom';


const Signin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        getToken,
        setTabLogin
    } = amsAction;

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const login = () => {
        if (userName === "" || userPassword === "") {
            OpenNotification("", messageType.WARNING, "Tài khoản hoặc mật khẩu trống", <WarningOutlined className="warnign-message" />);
            return;
        }
        const body = {
            Data: {
                UserName: userName,
                UserPassword: userPassword
            }
        }
        dispatch(getToken(body))
        history.push('/')
    }

    return (
        <div className="login-form">
            <div className="header">
                ĐĂNG NHẬP
            </div>
            <Input
                className="input"
                size="middle"
                placeholder="User name"
                prefix={<UserOutlined />}
                onPressEnter={() => {
                    login();
                }}
                onChange={(e) => setUserName(e.target.value)} />
            <Input.Password
                className="input"
                size="middle"
                prefix={<LockOutlined />}
                placeholder="Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onPressEnter={() => {
                    login();
                }}
                onChange={(e) => setUserPassword(e.target.value)}
            />
            <Button
                className="button-login"
                type="primary"
                size="middle"
                onClick={() => {
                    login();
                }}>
                Đăng nhập
            </Button>
            <div className="register-form">
                {/* <div
                    className="register-link link"
                    onClick={() => {
                        dispatch(setTabLogin("Signup"));
                    }}>
                    Đăng ký
                </div> */}
                <Button
                    type="link"
                    block
                    // className="register-link link"
                    onClick={() => {
                        dispatch(setTabLogin("Signup"));
                    }}>
                    Đăng ký
                </Button>
                <Button
                    type="link"
                    block
                    // className="forget-password-link link"
                    onClick={() => {
                        dispatch(setTabLogin("ResetPassword"));
                    }}>
                    Lấy lại mật khẩu
                </Button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Signin);