import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import '../Access/Css/Signup.scss';
import '../Access/Css/Common.scss';
import { Button, Input } from 'antd';
import openNotification from '../Components/openNotification';
import {
    UserOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
    WarningOutlined,
    SwapLeftOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions/action';
import * as messageType from '../../Common/messageCode';

const Signup = (prop) => {
    const dispatch = useDispatch();
    const {
        setTabLogin,
        signup,
    } = amsAction;

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRePassword, setUserRePassword] = useState("");
    const [userFullName, setUserFullName] = useState("");

    const register = () => {
        if (userName === "" ||
            userPassword === "" ||
            userRePassword === "" ||
            userFullName === ""
        ) {
            openNotification("", messageType.WARNING, "Tài khoản hoặc mật khẩu trống", <WarningOutlined className="warnign-message" />);
            return;
        }
        if (userName?.includes(' ') || userPassword.includes(' ') || userRePassword.includes(' ')) {
            openNotification("", messageType.WARNING, "Tài khoản hoặc mật khẩu không đúng định dạng", <WarningOutlined className="warnign-message" />);
            return;
        }
        if (userFullName.length > 64 || userName.length > 64 || userPassword.length > 64) {
            openNotification("", messageType.WARNING, "Độ dài tên lớn hơn 50 ký tự", <WarningOutlined className="warnign-message" />);
            return;
        }

        if(userPassword !== userRePassword){
            openNotification("", messageType.WARNING, "Mật khẩu không giống nhau", <WarningOutlined className="warnign-message" />);
            return;
        }

        const body = {
            Token: "",
            Key: "",
            Data: {
                UserName: userName,
                UserPassword: userPassword,
                UserFullName: userFullName
            }
        }
        dispatch(signup(body))
    }

    return (
        <div className="register common">
            <div
                onClick={() => {
                    dispatch(setTabLogin("Signin"))
                }}>
                <SwapLeftOutlined /> Quay lại
            </div>
            <div className="register-Header">
                ĐĂNG KÝ TÀI KHOẢN
            </div>
            <Input
                className="input"
                size="middle"
                shape="round"
                placeholder="Tài khoản"
                prefix={<UserOutlined />}
                onChange={(e) => { setUserName(e.target.value) }}
            />
            <Input.Password
                className="input"
                size="middle"
                shape="round"
                placeholder="Mật khẩu"
                prefix={<LockOutlined />}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={(e) => { setUserPassword(e.target.value) }}
            />
            <Input.Password
                className="input"
                size="middle"
                shape="round"
                placeholder="Nhập lại mật khẩu"
                prefix={<LockOutlined />}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={(e) => { setUserRePassword(e.target.value) }}
            />
            <Input
                className="input"
                size="middle"
                placeholder="Tên hiển thị"
                prefix={<UserOutlined />}
                onChange={(e) => { setUserFullName(e.target.value) }}
            />
            <div className="register-footer">
                <Button
                    className="button-register ams-btn"
                    type="primary"
                    size="middle"
                    onClick={() => {
                        register();
                    }}>
                    Đăng ký
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

export default connect(mapStateToProps)(Signup);