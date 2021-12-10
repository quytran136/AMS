import React, { useEffect, useState } from "react";
import "../Access/Css/Common.scss";
import "../Access/Css/ConfigCommon.scss";
import { Col, Row, Select, Input, Button } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions/action';

function ConfigCommon(props) {
    const dispatch = useDispatch();
    const {
        requestProcessFlow,
        requestConfigCommon,
    } = amsAction;

    const {
        userName,
        token,
        configCommon,
        processFlows
    } = props.amsStore;

    const [listFunction, setListFunction] = useState()
    const [listProcess, setListProcess] = useState()

    function save() {
        const body = {
            Token: token,
            Key: "UPDATE_CONFIG_COMMON",
            UserNameRequest: userName,
            Data: {
                Config: [
                    {
                        Code: "FUNCTION",
                        Value: JSON.stringify(listFunction),
                    }
                ]
            }
        }
        dispatch(requestConfigCommon(body))
        setTimeout(() => {
            getConfigCommon()
        }, 2000);
    }

    function getConfigCommon() {
        const body = {
            Token: token,
            Key: "GET_CONFIG_COMMON",
            UserNameRequest: userName,
        }
        dispatch(requestConfigCommon(body))

        const bodyprocess = {
            Token: token,
            Key: "GET_PROCESS",
            UserNameRequest: userName,
            Data: {
                ProcessName: ""
            }
        }

        dispatch(requestProcessFlow(bodyprocess))
    }

    function readConfigCommon() {
        if (configCommon) {
            configCommon.Response.Configs.forEach(element => {
                switch (element.Code) {
                    case "FUNCTION":
                        const a = JSON.parse(element.Value)
                        setListFunction(a)
                        break
                    default:
                        break;
                }
            })
        }
    }

    function readProcess() {
        if (processFlows?.Response?.Process) {
            let selectProcess = []
            processFlows.Response.Process.forEach(element => {
                selectProcess.push({
                    value: element.ID,
                    label: element.ProcessName
                })
            })
            setListProcess(selectProcess)
        }
    }

    function addNew() {
        let list = []
        if (listFunction) {
            listFunction.forEach(element => {
                list.push(element)
            });
        }
        list.push({
            ID: Date.now(),
            FunctionKey: "",
            FunctionName: "",
            FunctionProcess: "",
            FunctionPath: ""
        })
        setListFunction(list)
    }

    function deleteItem(id) {
        let list = []
        if (listFunction) {
            listFunction.forEach(element => {
                if (element.ID !== id) {
                    list.push(element)
                }
            });
        }
        setListFunction(list)
    }

    function editItem(item) {
        let list = []
        if (listFunction) {
            listFunction.forEach(element => {
                if (element.ID === item.ID) {
                    list.push(item)
                } else {
                    list.push(element)
                }
            });
        }
        setListFunction(list)
    }

    useEffect(getConfigCommon, [])
    useEffect(readConfigCommon, [configCommon])
    useEffect(readProcess, [processFlows])

    return (
        <div className="config-common">
            <div className="config-common-body">
                <Row className="config-common-tool">
                    <Col span={24} className="tool-right">
                        <Button
                            className="ams-btn-default"
                            type="primary"
                            onClick={() => {
                                save()
                            }}
                        >Save</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                addNew()
                            }}
                        />
                    </Col>
                </Row>
                <Row className="list-function">
                    <Col span={6} className="field">
                        Mã chức năng
                    </Col>
                    <Col span={6} className="field">
                        Tên chức năng
                    </Col>
                    <Col span={5} className="field">
                        Quy trình
                    </Col>
                    <Col span={6} className="field">
                        Đường dẫn
                    </Col>
                    <Col span={1} className="field">

                    </Col>
                </Row>
                <div className="list-function">
                    {listFunction &&
                        listFunction.map((element, index) => {
                            return (<Row className="item-asset" key={index}>
                                <Col span={6} className="field">
                                    <Input
                                        value={element.FunctionKey}
                                        onChange={(e) => {
                                            let item = element
                                            item.FunctionKey = e.target.value
                                            editItem(item)
                                        }}
                                    />
                                </Col>
                                <Col span={6} className="field">
                                    <Input
                                        value={element.FunctionName}
                                        onChange={(e) => {
                                            let item = element
                                            item.FunctionName = e.target.value
                                            editItem(item)
                                        }}
                                    />
                                </Col>
                                <Col span={5} className="field">
                                    <Select
                                        options={listProcess}
                                        className="select-process"
                                        value={element.FunctionProcess}
                                        onChange={e => {
                                            let item = element
                                            item.FunctionProcess = e
                                            editItem(item)
                                        }}
                                    >
                                    </Select>
                                </Col>
                                <Col span={6} className="field">
                                    <Input
                                        value={element.FunctionPath}
                                        onChange={(e) => {
                                            let item = element
                                            item.FunctionPath = e.target.value
                                            editItem(item)
                                        }}
                                    />
                                </Col>
                                <Col span={1} className="field">
                                    <Button
                                        type="primary"
                                        danger
                                        shape="circle"
                                        icon={<DeleteOutlined />}
                                        onClick={() => {
                                            deleteItem(element.ID)
                                        }}
                                    />
                                </Col>
                            </Row>)
                        })}
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ConfigCommon);
