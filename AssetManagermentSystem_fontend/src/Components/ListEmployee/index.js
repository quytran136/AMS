import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import { Avatar } from 'antd';
import * as amsAction from '../../ReduxSaga/Actions';

const ListEmployee = (prop) => {
    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState();
    const {
        getUsers,
        addChatList
    } = amsAction;

    const {
        userName,
        token,
        users,
        hadMessage
    } = prop.amsStore;

    const getListUser = () => {
        const body = {
            Token: token,
            Key: "USERS",
            UserNameRequest: userName,
            Data: {
                SearchContent: searchContent || null
            }
        }
        dispatch(getUsers(body))
    }

    function showMessage(){
        if(hadMessage){
            console.log(hadMessage)
            var tem = JSON.parse(hadMessage)
            console.log(tem)
            users.forEach(element => {
                if(element.ID === tem.From){
                    dispatch(addChatList(element))
                }
            });
        }
    }

    useEffect(getListUser, [])
    useEffect(showMessage,[hadMessage])

    return (<div className="list-employee">
        {users.map((element) => {
            return (
                <div
                    className="employee"
                    key={element.key}
                    onClick={() => {
                        dispatch(addChatList(element))
                    }}>
                    <Avatar shape="circle" size={24} src={element?.Image} />
                    <div className="emp-name">
                        {element.UserName}
                    </div>
                </div>
            )
        })}
    </div>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ListEmployee);