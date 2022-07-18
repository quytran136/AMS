import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Tree, TreeNode } from "react-organizational-chart";
import 'antd/dist/antd.css';
import './style.scss'
import { Button, Input, Card, Row, Col } from 'antd';
import {
    UserOutlined,
    PlusOutlined,
    CloseOutlined,
    FolderOpenOutlined
} from '@ant-design/icons';
import * as amsAction from '../../../ReduxSaga/Actions';
import OrganizationalChart from '../OrganizationalChart';

const DepartmentChart = (prop) => {
    const dispatch = useDispatch();
    const {
        saveDepartmentChart,
        getDepartmentChart,
        saveChangeDepartmentChart,
        setDepartmentData
    } = amsAction;
    const [listNodeChange, setListNodeChange] = useState([])

    const {
        departmentChart,
        token,
        userName,
        departmentData
    } = prop.amsStore;

    function getDepartment() {
        const body = {
            Token: token,
            Key: "DEPARTMENT_CHART",
            UserNameRequest: userName,
        }
        dispatch(getDepartmentChart(body))
    }

    useEffect(getDepartment, []);

    function formatDepartment(nodeModel) {
        if (nodeModel?.Node?.IsNew === true) {
            nodeModel.Node.ID = ""
        }

        nodeModel.Childs.forEach(element => {
            element = formatDepartment(element)
        })
        return nodeModel
    }

    function saveDepartment() {
        var tree;
        listNodeChange.forEach(element => {
            tree = changeNodeData(departmentChart, element.ID, element.Value)
        })
        var treeFormat = formatDepartment(tree || departmentChart)
        const body = {
            Token: token,
            Key: "UPDATE_DEPARTMENT",
            UserNameRequest: userName,
            Data: {
                Department: treeFormat
            }
        }
        dispatch(saveChangeDepartmentChart(body))
    }

    function changeNodeData(department, nodeID, value) {
        if (department) {
            if (department?.Node?.ID === nodeID) {
                department.Node.DepartmentName = value
                return department
            }
            if (department && department?.Childs != null) {
                department.Childs.forEach(element => {
                    if (element?.Node?.ID === nodeID) {
                        element.Node.DepartmentName = value
                        return department
                    } else {
                        changeNodeData(element, nodeID, value)
                    }
                })
                return department;
            }
        }
    }

    const Node = (propA) => {
        const { data } = propA
        const [node, setNode] = useState()
        const [departmentName, setDepartmentName] = useState()

        function setDepartment() {
            if (data && data?.Node) {
                setNode(data?.Node)
            }
        }

        function saveListNodeChange(value) {
            var listChange = listNodeChange
            if (listChange.length === 0) {
                listChange.push({
                    ID: node?.ID,
                    Value: value,
                })
                setListNodeChange(listChange)
            }
            listChange.forEach(element => {
                if (element.ID === node?.ID) {
                    element.Value = value
                    setListNodeChange(listChange)
                    return;
                }
            });
            listChange.push({
                ID: node?.ID,
                Value: value,
            })
            setListNodeChange(listChange)
        }

        useEffect(setDepartment, [])

        return (
            <Card
                bordered={true}
                className="node">
                <div className="header">
                    <Row>
                        <Col span={20}>
                            <Input
                                value={departmentName ? departmentName : node?.DepartmentName}
                                className="input"
                                size="middle"
                                placeholder="New node"
                                prefix={<UserOutlined />}
                                onChange={(e) => {
                                    setDepartmentName(e.target.value)
                                    saveListNodeChange(e.target.value)
                                }} />
                        </Col>
                        <Col span={4}>
                            <Button
                                disabled={node?.IsNew ? true : false}
                                type="primary"
                                shape="link"
                                className="detail-node"
                                icon={<FolderOpenOutlined />}
                                onClick={() => dispatch(setDepartmentData(node))}
                            />
                        </Col>
                    </Row>
                    <Button
                        type="primary"
                        shape="circle"
                        className="add-node"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            var treeTemp;
                            listNodeChange.forEach(element => {
                                treeTemp = changeNodeData(departmentChart, element.ID, element.Value)
                            })
                            var tree = addNode(treeTemp ? treeTemp : departmentChart, node?.ID)
                            dispatch(saveDepartmentChart(tree))
                        }}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<CloseOutlined />}
                        className="delete-node"
                        danger
                        onClick={() => {
                            var tree = removeNode(departmentChart, node?.ID)
                            dispatch(saveDepartmentChart(tree))
                        }}
                    />
                </div>
            </Card>)
    }

    function addNode(department, nodeID) {
        if (!department.Node) {
            return {
                Node: {
                    ID: new Date().getTime(),
                    IsDelete: false,
                    DepartmentName: "",
                    ParentID: nodeID,
                    IsNew: true
                },
                Childs: []
            }
        }
        if (department?.Node?.ID === nodeID) {
            department.Childs.push({
                Node: {
                    ID: new Date().getTime(),
                    IsDelete: false,
                    DepartmentName: "",
                    ParentID: nodeID,
                    IsNew: true
                },
                Childs: []
            })
            return department;
        }
        if (department && department?.Childs != null) {
            department.Childs.forEach(element => {
                if (element?.key === nodeID) {
                    element.Childs.push({
                        Node: {
                            ID: new Date().getTime(),
                            IsDelete: false,
                            DepartmentName: "",
                            ParentID: nodeID,
                            IsNew: true
                        },
                        Childs: []
                    })
                    return department;
                } else {
                    return addNode(element, nodeID)
                }
            })
            return department;
        }
    }

    function removeNode(department, nodeID) {
        if (department?.Node?.ID === nodeID) {
            department.Node.IsDelete = true
            if (department && department?.Childs != null) {
                department.Childs.forEach(element => {
                    if (element?.Node?.ID === nodeID) {
                        element.Node.IsDelete = true
                        removeNode(element, element?.Node?.ID);
                    } else {
                        removeNode(element, nodeID)
                    }
                })
            }

            return {
                Node: {
                    ID: new Date().getTime(),
                    IsDelete: false,
                    DepartmentName: "new one",
                    ParentID: ""
                },
                Childs: [department]
            };
        }

        if (department && department?.Childs != null) {
            department.Childs.forEach(element => {
                if (element?.Node?.ID === nodeID) {
                    element.Node.IsDelete = true
                    removeNode(element, element?.Node?.ID);
                } else {
                    removeNode(element, nodeID)
                }
            })
            return department;
        }
    }

    function RenderTree(item) {
        var node = [];
        if (item && item.Childs) {
            item.Childs.forEach(element => {
                if (element.Node.IsDelete !== true) {
                    if (element.Childs && element.Childs.length > 0) {
                        var count = 0
                        element.Childs.forEach(item => {
                            if (item.Node.IsDelete) {
                                count++
                            }
                        })
                        if (count === element.Childs.length) {
                            node.push(<TreeNode key={element.Node.ID} label={<Node
                                data={element}
                            />} />)
                        } else {
                            node.push(<TreeNode key={element.Node.ID} label={<Node
                                data={element}
                            />}> {RenderTree(element)}
                            </TreeNode>)
                        }
                    } else {
                        node.push(<TreeNode key={element.Node.ID} label={<Node
                            data={element}
                        />} />)
                    }
                }
            });
        }
        return node;
    }

    const DepartmentTree = () => {
        return (<>
            <div className="tool">
                <Button
                    className="ams-btn-default"
                    type="primary"
                    onClick={() => saveDepartment()}
                >Lưu</Button>
                <Button
                    className="ams-btn-default"
                    type="primary"
                    danger
                    onClick={() => getDepartment()}
                >Tải lại</Button>
            </div>
            <div>
                <Tree
                    lineWidth={"1px"}
                    lineColor={"black"}
                    lineBorderRadius={"10px"}
                    label={<Node data={departmentChart} />}
                >
                    {RenderTree(departmentChart)}
                </Tree>
            </div>
        </>)
    }

    return (
        <div>
            {!departmentData ? <div className="department-chart"><DepartmentTree /></div> : <OrganizationalChart />}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(DepartmentChart);