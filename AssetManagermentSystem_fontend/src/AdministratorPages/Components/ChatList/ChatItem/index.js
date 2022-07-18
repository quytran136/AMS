import React, { useEffect, useState } from "react";
import "./style.scss";
import { Avatar } from 'antd';
import {
    CloseOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";

function ChatItem(props) {

    const { position, content, image } = props

    const {
        userInfoLogin,
    } = props.amsStore;


    return (
        <div className={position === "left" ? "chat-item left" : "chat-item right"}>
            <div className="icon">
                <Avatar shape="circle" size={32} src={image} />
            </div>
            <div className="chat-content">
                {content}
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ChatItem);
