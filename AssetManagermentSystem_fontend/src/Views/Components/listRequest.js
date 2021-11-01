import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import '../Access/Css/Signup.scss';
import '../Access/Css/Common.scss';
import { Button, Input, Row } from 'antd';
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

const listRequest = (prop) => {
    const dispatch = useDispatch();
    const {
        setTabLogin,
        signup,
    } = amsAction;

    return (
        <Row>
            <Col span={6}>
                
            </Col>
            <Col span={12}>
            </Col>
            <Col span={6}>
            </Col>
        </Row>
    )
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(listRequest);