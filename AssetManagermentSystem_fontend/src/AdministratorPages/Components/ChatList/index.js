import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import ChatBox from "./ChatBox";

function ChatList(props) {
    const {
        chatList
    } = props.amsStore;

    return (
        <div className="chat-list">
            {chatList.map((element) => {
                return (
                    <ChatBox key={element.key} context={element}/>
                )
            })}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ChatList);
