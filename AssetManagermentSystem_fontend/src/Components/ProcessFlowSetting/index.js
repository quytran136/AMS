import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import { Button, Input, Row, Col, Modal, Card, InputNumber, Checkbox, Tabs } from 'antd';
import {
    DeleteOutlined,
    NodeIndexOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions';
import SelectEmployee from "../SelectEmployee";
import SelectDepartment from "../SelectDepartment";

const ProcessFlowSetting = (props) => {
    const { dataSelected, active, onTrigger } = props
    const dispatch = useDispatch();
    const {
        requestProcessFlow
    } = amsAction

    const {
        token,
        userName,
        processFlows
    } = props.amsStore

    const [processName, setProcessName] = useState("")
    const [visible, setVisible] = useState(false)
    const [stepsFlow, setStepsFlow] = useState()

    function checkActive(){
        setVisible(active)
        if (active === true) {
            showDetailProcessFlow()
        }
    }
    
    function showDetailProcessFlow() {
        if (dataSelected) {
            const body = {
                Token: token,
                Key: "GET_PROCESS_DETAIL",
                UserNameRequest: userName,
                Data: {
                    ProcessID: dataSelected
                }
            }
            
            dispatch(requestProcessFlow(body))
        }
    }
    
    function setEdit() {
        if (processFlows) {
            setProcessName(processFlows?.Response?.ProcessFlow?.Process?.ProcessName)
            setStepsFlow(ReadStep(processFlows?.Response?.ProcessFlow?.Child, []))
        }
    }
    
    useEffect(checkActive, [active])
    useEffect(setEdit, [processFlows])

    function onSave() {
        const body = {
            Token: token,
            Key: "UPDATE_PROCESS",
            UserNameRequest: userName,
            Data: {
                ProcessID: dataSelected,
                ProcessName: processName,
                IsDelete: false,
                IsLock: false,
                ProcessFlow: stepsFlow?.length > 0 ? {
                    Node: {
                        ID: stepsFlow[0].ID,
                        ProcessID: stepsFlow[0].ProcessID,
                        ParentID: stepsFlow[0].ParentID,
                        UserID: stepsFlow[0].UserID,
                        Approvers: stepsFlow[0].Approvers,
                        ExpiredTime: stepsFlow[0].ExpiredTime,
                        IsUseExpiredTime: stepsFlow[0].IsUseExpiredTime,
                        Description: stepsFlow[0].Description,
                        StepName: stepsFlow[0].StepName,
                        IsDelete: stepsFlow[0].IsDelete,
                    },
                    Child: BuildStep(1)
                } : null
            }
        }
        dispatch(requestProcessFlow(body))

        setTimeout(() => {
            onClose()
        }, 300);
    }

    function onClose() {
        onTrigger(false)
        setVisible(false)
    }

    function BuildStep(index) {
        if (index >= stepsFlow.length) {
            return null;
        }
        return {
            Node: {
                ID: stepsFlow[index].ID,
                ProcessID: stepsFlow[index].ProcessID,
                ParentID: stepsFlow[index].ParentID,
                UserID: stepsFlow[index].UserID,
                Approvers: stepsFlow[index].Approvers,
                ExpiredTime: stepsFlow[index].ExpiredTime,
                IsUseExpiredTime: stepsFlow[index].IsUseExpiredTime,
                Description: stepsFlow[index].Description,
                StepName: stepsFlow[index].StepName,
                IsDelete: stepsFlow[index].IsDelete,
            },
            Child: BuildStep(++index)
        }
    }

    function ReadStep(element, list) {
        if (!element?.Node) {
            return list
        } else {
            list.push(element.Node)
        }
        return ReadStep(element.Child, list)
    }

    function addStep(parentID) {
        let stepsT = [];

        if (stepsFlow) {
            stepsFlow.forEach(element => {
                stepsT.push(element)
            });
        }

        stepsT.push({
            ProcessID: dataSelected ? dataSelected : "",
            ParentID: parentID ? parentID : "",
            Approvers: "",
            ExpiredTime: "",
            IsUseExpiredTime: true,
            Description: "",
            StepName: "",
            IsDelete: false
        })
        return stepsT;
    }

    function editStep(element, indexX) {
        let stepsT = [];

        if (stepsFlow) {
            stepsFlow.forEach(element => {
                stepsT.push(element)
            });
        }

        stepsFlow.forEach(index => {
            if (indexX === index) {
                stepsT[index] = element
            }
        });

        setStepsFlow(stepsT)
    }

    function deleteStep(indexX) {
        let stepsT = [];

        if (stepsFlow) {
            stepsFlow.forEach((element, index) => {
                if (element.ID) {
                    if (index !== indexX) {
                        stepsT.push(element)
                    } else {
                        element.IsDelete = true
                        stepsT.push(element)
                    }
                } else {
                    if (index !== indexX) {
                        stepsT.push(element)
                    }
                }
            });
        }
        setStepsFlow(stepsT)
    }

    return (<Modal
        title={dataSelected ? "Thông tin quy trình" : "Thêm mới quy trình"}
        centered
        visible={visible}
        onOk={() => onSave()}
        onCancel={() => onClose()}
        width={1500}
        className="process-flow"
    >
        <h4>Tên quy trình</h4>
        <Input placeholder="Quy trình xyz..."
            prefix={<NodeIndexOutlined />}
            value={processName}
            onChange={(e) => setProcessName(e.target.value)} />
        <br />
        <Row className="process-flow-tool">
            <Col span={8} className="tool-left">
            </Col>
            <Col span={16} className="tool-right">
                <Button
                    className="ams-btn-default"
                    type="primary"
                    onClick={() => setStepsFlow(addStep())}
                >Thêm mới step</Button>
            </Col>
        </Row>
        <Row className="process-flow-step">
            <Col span={24}>
                {stepsFlow && stepsFlow.length > 0 &&
                    stepsFlow.map((element, index) => {
                        if (element.IsDelete === false) {
                            return (
                                <Card
                                    key={index}
                                    extra={<Button
                                        danger
                                        type="primary"
                                        shape="circle"
                                        icon={<DeleteOutlined />}
                                        onClick={() => deleteStep(index)}
                                    />}
                                    title={"Bước " + (index + 1)}
                                    bordered={true}
                                    className="ams-card">
                                    <Row>
                                        <Col span={12} className="col">
                                            <h4>Tên bước</h4>
                                            <Input placeholder="Tên bước"
                                                prefix={<NodeIndexOutlined />}
                                                value={element.StepName}
                                                onChange={(e) => {
                                                    element.StepName = e.target.value
                                                    editStep(element, index)
                                                }} />
                                            <br />
                                            <Checkbox
                                                checked={element.IsUseExpiredTime}
                                                onChange={(e) => {
                                                    element.IsUseExpiredTime = e.target.checked
                                                    editStep(element, index)
                                                }}>
                                                Sử dụng thời gian phê duyệt
                                            </Checkbox>
                                            <br />
                                            <h4>Thời gian tối đa thực hiện phê duyệt</h4>
                                            <InputNumber
                                                disabled={!element.IsUseExpiredTime}
                                                prefix={<NodeIndexOutlined />}
                                                step={1}
                                                defaultValue="0"
                                                max={20}
                                                min={0}
                                                value={element.ExpiredTime}
                                                onChange={(e) => {
                                                    element.ExpiredTime = e
                                                    editStep(element, index)
                                                }} />
                                            <span>.h</span>
                                            <br />
                                            <h4>Cấu hình phê duyệt</h4>
                                            <Tabs defaultActiveKey="1">
                                                <Tabs.TabPane tab="Nhân sự" key="1">
                                                    <SelectEmployee
                                                        selected={element.Approvers.split("|")}
                                                        onSelected={(selectedRows) => {
                                                            var listApprover = ""
                                                            selectedRows.forEach((element) => listApprover += element.ID + "|")
                                                            element.Approvers = listApprover
                                                            editStep(element, index)
                                                        }} />
                                                </Tabs.TabPane>
                                                <Tabs.TabPane tab="Phòng ban / chức vụ" key="2">
                                                    <Checkbox
                                                        checked={element.Approvers.length === 0 ? true : false}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                element.Approvers = ""
                                                            } else {
                                                                element.Approvers = "|"
                                                            }
                                                            editStep(element, index)
                                                        }}>
                                                        Phê duyệt nội bộ phòng người yêu cầu
                                                    </Checkbox>
                                                    <SelectDepartment
                                                        visible = {element.Approvers.length === 0 ? true : false}
                                                        selected={element.Approvers}
                                                        onSelected={(selectedRows) => {
                                                            element.Approvers = selectedRows
                                                            editStep(element, index)
                                                        }} />
                                                </Tabs.TabPane>
                                            </Tabs>
                                        </Col>
                                        <Col span={12} className="col">
                                            <h4>Diễn giải</h4>
                                            <Input.TextArea
                                                placeholder="Diễn giải"
                                                allowClear
                                                className="text-area"
                                                onChange={(e) => {
                                                    element.Description = e
                                                    editStep(element, index)
                                                }} />
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        }
                        return ""
                    })
                }
            </Col>
        </Row>
    </Modal >)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ProcessFlowSetting);