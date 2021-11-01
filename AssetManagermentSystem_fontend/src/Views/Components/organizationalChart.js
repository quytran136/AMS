import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Tree, TreeNode } from "react-organizational-chart";
import '../Access/Css/Login.scss';
import 'antd/dist/antd.css';
import '../Access/Css/Common.scss';
import '../Access/Css/OrganizationalChart.scss'
import { Button, Input, Card } from 'antd';
import openNotification from './openNotification';
import {
    UserOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
    WarningOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions/action';
import * as messageType from '../../Common/messageCode';


const OrganizationalChart = () => {
    const dispatch = useDispatch();
    const {
        getToken,
        setTabLogin
    } = amsAction;

    const tree = {
        label: "root",
        list: [{
            label: "123",
            list: [{ label: "dbc", list: null }, { label: "dbc", list: null }]
        },
        {
            label: "123",
            list: [{ label: "dbc", list: null }, { label: "dbc", list: null }]
        }]
    }

    const Node = () => {
        return (
            <Card bordered={true} className="node">
                <div className="header">
                    <Input
                        className="input"
                        size="middle"
                        placeholder="Node Label"
                        prefix={<UserOutlined />} />
                </div>
            </Card>)
    }

    const RenderTree = () => {
        return (
            <TreeNode label={<Node />}></TreeNode>)
    }

    return (
        <div className="organizational-chart">
            <div className="tool">
                <Button>Save</Button>
            </div>
            <Tree
                lineWidth={"1px"}
                lineColor={"black"}
                lineBorderRadius={"10px"}
                label={<Node />}
            >
                <RenderTree />
            </Tree>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(OrganizationalChart);