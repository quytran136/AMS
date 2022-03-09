import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import { Button, Input, Row, Col, Card } from 'antd';
import * as amsAction from '../../ReduxSaga/Actions';
import ProcessFlowSetting from "../ProcessFlowSetting";

const ProcessFlow = (props) => {
    const dispatch = useDispatch();
    const {
        requestProcessFlow
    } = amsAction

    const {
        token,
        userName,
        processFlows
    } = props.amsStore

    const [searchContent, setSearchContent] = useState("")
    const [showProcessFlowSetting, setShowProcessFlowSetting] = useState(false)
    const [dataSelect, setDataSelect] = useState(null)

    useEffect(getListProcess, [])

    function getListProcess() {
        const body = {
            Token: token,
            Key: "GET_PROCESS",
            UserNameRequest: userName,
            Data: {
                ProcessName: searchContent
            }
        }

        dispatch(requestProcessFlow(body))
    }

    function deleteProcess(processID) {
        const body = {
            Token: token,
            Key: "UPDATE_PROCESS",
            UserNameRequest: userName,
            Data: {
                ProcessID: processID,
                IsDelete: true,
                IsLock: false,
            }
        }
        dispatch(requestProcessFlow(body))

        setTimeout(() => {
            getListProcess()
        }, 300);
    }

    return (<div className="process-flow">
        <h3>Danh sách luồng duyệt</h3>
        <Row className="process-flow-tool">
            <Col span={8} className="tool-left">
                <Input.Group>
                    <Input.Search
                        placeholder="Search..."
                        onPressEnter={() => getListProcess()}
                        onSearch={() => getListProcess()}
                        onChange={(e) => setSearchContent(e.target.value)}
                    />
                </Input.Group >
            </Col>
            <Col span={16} className="tool-right">
                <Button
                    className="ams-btn-default"
                    type="primary"
                    onClick={() => {
                        setDataSelect(null)
                        setShowProcessFlowSetting(true)
                    }}
                >Thêm mới</Button>
            </Col>
        </Row>
        <Row className="process-flow-body" >
            <Col span={24}>
                {
                    processFlows?.Response.Process &&
                    processFlows?.Response.Process.map((element, index) => {
                        return (<Card
                            className="ams-card-item"
                            key={index}
                            extra={<span><Button
                                type="primary"
                                className="ams-btn"
                                shape="circle"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setDataSelect(element.ID)
                                    setShowProcessFlowSetting(true)
                                }}
                            />
                                <Button
                                    danger
                                    type="primary"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    onClick={() => deleteProcess(element.ID)}
                                /></span>}
                            title={element.ProcessName}
                            bordered={true}>
                        </Card>)
                    })
                }
            </Col>
        </Row>
        <ProcessFlowSetting
            active={showProcessFlowSetting}
            dataSelected={dataSelect}
            onTrigger={(value) => {
                getListProcess()
                setShowProcessFlowSetting(value)
            }}
        />
    </div>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ProcessFlow);