import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Row, Input, InputNumber, Button, Select, Table, Card } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions';

function ChatList(props) {

    return (
        <div className="chat-list">
            <Card title="Ten bạn chát" className="chat">
                <div className="chat-body">
                    chat body
                </div>
                <div className="chat-input">
                    <Input />
                </div>
            </Card>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ChatList);
