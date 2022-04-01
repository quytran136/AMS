import React, { useEffect, useState } from "react";
import "./style.scss";
import { Avatar, Input } from 'antd';
import {
    CloseOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import ChatItem from "../ChatItem";
import * as amsAction from '../../../ReduxSaga/Actions';
import * as signalR from '../../../Common/SignalR';

function ChatBox(props) {
    const { context } = props
    const dispatch = useDispatch()

    const {
        removeChatList,
        getChatHistory
    } = amsAction;

    const {
        userInfoLogin,
        hadMessage,
        token,
        userName,
        chatMessage
    } = props.amsStore;

    const [chatContent, setChatContent] = useState()
    const [message, setMessage] = useState()

    function getMessage() {
        if (hadMessage) {
            var body = {
                Token: token,
                Key: "GET_MESSAGE",
                UserNameRequest: userName,
                Data: {
                    From: context?.ID,
                    To: userInfoLogin?.ID,
                    Take: 1
                }
            }

            dispatch(getChatHistory(body))
        }
    }

    function loadMessage() {
        var body = {
            Token: token,
            Key: "GET_MESSAGE",
            UserNameRequest: userName,
            Data: {
                From: context?.ID,
                To: userInfoLogin?.ID,
                Take: 1
            }
        }

        dispatch(getChatHistory(body))
    }

    function readMessage() {
        if (chatMessage) {
            if (chatMessage.Response.ChatContent.ToID === context?.ID || chatMessage.Response.ChatContent.FromID === context?.ID) {
                setMessage(chatMessage.Response.ChatContent)
            }
        }
    }

    useEffect(getMessage, [hadMessage])
    useEffect(readMessage, [chatMessage])
    useEffect(loadMessage, [])

    return (
        <div className="chat">
            <div className="chat-header">
                <div className="chat-name">
                    <Avatar shape="circle" size={24} src={context?.Image} />
                    {context.UserFullName}
                </div>
                <div className="chat-tools">
                    <CloseOutlined onClick={() => {
                        dispatch(removeChatList(context))
                    }} />
                </div>
            </div>
            <div className="chat-body" onScroll={(e) => console.log(window.pageYOffset)}>
                {
                    message && message?.ChatHistories.map((element) => {
                        if (element.FromUserID === context.ID) {
                            return (
                                <ChatItem key={element.ID} position="left" image={context?.Image} content={element.Message} />
                            )
                        }
                        return (<ChatItem key={element.ID} position="right" image={userInfoLogin?.Image} content={element.Message} />)
                    })
                }
            </div>
            <div className="chat-input">
                <Input
                    value={chatContent}
                    onChange={(e) => {
                        setChatContent(e.target.value)
                    }}
                    onPressEnter={() => {
                        signalR.sentMessage(JSON.stringify({
                            From: userInfoLogin?.ID,
                            To: context?.ID,
                            Content: chatContent,
                            CreateDate: new Date()
                        }))
                        loadMessage()
                        setChatContent("")
                    }} />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ChatBox);
