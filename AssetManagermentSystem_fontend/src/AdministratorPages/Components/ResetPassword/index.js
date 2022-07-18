import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss';
import { Button, Input } from 'antd';
import OpenNotification from '../OpenNotification';
import {
    UserOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
    WarningOutlined,
    SwapLeftOutlined
} from '@ant-design/icons';
import * as amsAction from '../../../ReduxSaga/Actions';
import * as messageType from '../../Common/messageCode';

const ResetPassword = (prop) => {
    const dispatch = useDispatch();
    const {
        setTabLogin
    } = amsAction;

    const {
        error
    } = prop.amsStore

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const reset = () => {
        if (userName === "" ||
            userPassword === ""
        ) {
            OpenNotification("", messageType.WARNING, "Tài khoản hoặc mật khẩu trống", <WarningOutlined className="warnign-message" />);
            return;
        }
        if (userName?.includes(' ') || userPassword.includes(' ')) {
            OpenNotification("", messageType.WARNING, "Tài khoản hoặc mật khẩu không đúng định dạng", <WarningOutlined className="warnign-message" />);
            return;
        }
        if (userName.length > 64 || userPassword.length > 64) {
            OpenNotification("", messageType.WARNING, "Độ dài tên lớn hơn 50 ký tự", <WarningOutlined className="warnign-message" />);
            return;
        }

        // const body = {
        //     Token: "",
        //     Key: "",
        //     Data: {
        //         UserName: userName,
        //         UserPassword: userPassword
        //     }
        // }
        // dispatch(signup(body))
    }

    useEffect(() => {
        if (error?.Message) {
            OpenNotification(error.Code, messageType.WARNING, error.Message, <WarningOutlined className="warnign-message" />);
        }
    }, [error])

    return (
        <div className="reset common">
            <div
                onClick={() => {
                    dispatch(setTabLogin("Signin"))
                }}>
                <SwapLeftOutlined /> Quay lại
            </div>
            <div className="reset-header">
                LẤY LẠI MẬT KHẨU
            </div>
            <Input
                className="input"
                size="large"
                placeholder="Tài khoản"
                prefix={<UserOutlined />}
                onChange={(e) => { setUserName(e.target.value) }}
            />
            <Input.Password
                className="input"
                size="large"
                placeholder="Mã xác nhận"
                prefix={<LockOutlined />}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={(e) => { setUserPassword(e.target.value) }}
            />
            <div className="reset-footer">
                <Button
                    className="button-reset ams-btn"
                    type="primary"
                    onClick={() => {
                        reset();
                    }}>
                    Reset
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

export default connect(mapStateToProps)(ResetPassword);