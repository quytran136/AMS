import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Tree, TreeNode } from "react-organizational-chart";
import '../Access/Css/Login.scss';
import 'antd/dist/antd.css';
import '../Access/Css/Common.scss';
import '../Access/Css/OrganizationalChart.scss'
import { Button, Input, Card, Row, Col } from 'antd';
import {
    UserOutlined,
    PlusOutlined,
    CloseOutlined,
    FolderOpenOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions/action';

const OrganizationalChart = (prop) => {
    const dispatch = useDispatch();
    const {
        saveOrganizationalChart,
        getOrganizationalChart,
        saveChangeOrganizationalChart,
        setDepartmentData,
        setOrganizationData,
        getDepartmentDetail
    } = amsAction;
    const [listNodeChange, setListNodeChange] = useState([])

    const {
        organizationalChart,
        token,
        userName,
        departmentData,
        departmentDetail,
    } = prop.amsStore;

    function getOrganizational() {
        const body = {
            Token: token,
            Key: "ORGANIZATIONAL_CHART",
            Data: {
                UserName: userName,
                DepartmentID: departmentData.ID
            }
        }
        dispatch(getOrganizationalChart(body))
        getDepartment()
    }

    function getDepartment() {
        const body = {
            Token: token,
            Key: "DEPARTMENT_DETAIL",
            Data: {
                UserName: userName,
                DepartmentID: departmentData.ID
            }
        }
        dispatch(getDepartmentDetail(body))
    }

    useEffect(getOrganizational, []);

    function formatDepartment(nodeModel) {
        if (nodeModel?.Node?.IsNew === true) {
            nodeModel.Node.ID = ""
        }

        nodeModel.Childs.forEach(element => {
            element = formatDepartment(element)
        })
        return nodeModel
    }

    function saveOrganizational() {
        var tree;
        listNodeChange.forEach(element => {
            tree = changeNodeData(organizationalChart, element.ID, element.Value)
        })
        var treeFormat = formatDepartment(tree || organizationalChart)
        const body = {
            Token: token,
            Key: "UPDATE_ORGANIZATIONAL",
            Data: {
                UserName: userName,
                DepartmentID: departmentData.ID,
                Organizational: treeFormat
            }
        }
        dispatch(saveChangeOrganizationalChart(body))
        console.log(departmentDetail)
    }

    function changeNodeData(organizational, nodeID, value) {
        if (organizational) {
            if (organizational?.Node?.ID === nodeID) {
                organizational.Node.OrganizationalName = value
                return organizational
            }
            if (organizational && organizational?.Childs != null) {
                organizational.Childs.forEach(element => {
                    if (element?.Node?.ID === nodeID) {
                        element.Node.OrganizationalName = value
                        return organizational
                    } else {
                        changeNodeData(element, nodeID, value)
                    }
                })
                return organizational;
            }
        }
    }

    const Node = (propA) => {
        const { data } = propA
        const [node, setNode] = useState()
        const [orgName, setOrganizationalName] = useState()

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
                    <Input
                        value={orgName ? orgName : node?.OrganizationalName}
                        className="input"
                        size="middle"
                        placeholder="New node"
                        prefix={<UserOutlined />}
                        onChange={(e) => {
                            setOrganizationalName(e.target.value)
                            saveListNodeChange(e.target.value)
                        }} />
                    <Button
                        type="primary"
                        shape="circle"
                        className="add-node"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            var treeChange;
                            listNodeChange.forEach(element => {
                                treeChange = changeNodeData(organizationalChart, element.ID, element.Value)
                            })
                            var tree = addNode(treeChange ? treeChange : organizationalChart, node?.ID)
                            dispatch(saveOrganizationalChart(tree))
                        }}
                    />
                    <Button
                        shape="circle"
                        icon={<CloseOutlined />}
                        className="delete-node ams-btn-cancel"
                        onClick={() => {
                            var tree = removeNode(organizationalChart, node?.ID)
                            dispatch(saveOrganizationalChart(tree))
                        }}
                    />
                </div>
            </Card>)
    }

    function addNode(organizational, nodeID) {
        if (!organizational.Node) {
            return {
                Node: {
                    ID: new Date().getTime(),
                    IsDelete: false,
                    OrganizationalName: "",
                    ParentID: nodeID,
                    IsNew: true
                },
                Childs: []
            }
        }

        if (organizational?.Node?.ID === nodeID) {
            organizational.Childs.push({
                Node: {
                    ID: new Date().getTime(),
                    IsDelete: false,
                    OrganizationalName: "",
                    ParentID: nodeID,
                    IsNew: true
                },
                Childs: []
            })
            return organizational;
        }
        if (organizational && organizational?.Childs != null) {
            organizational.Childs.forEach(element => {
                if (element?.key === nodeID) {
                    element.Childs.push({
                        Node: {
                            ID: new Date().getTime(),
                            IsDelete: false,
                            OrganizationalName: "",
                            ParentID: nodeID,
                            IsNew: true
                        },
                        Childs: []
                    })
                    return organizational;
                } else {
                    return addNode(element, nodeID)
                }
            })
            return organizational;
        }
    }

    function removeNode(organization, nodeID) {
        if (organization?.Node?.ID === nodeID) {
            organization.Node.IsDelete = true
            if (organization && organization?.Childs != null) {
                organization.Childs.forEach(element => {
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
                    OrganizationalName: "new one",
                    ParentID: ""
                },
                Childs: [organization]
            };
        }

        if (organization && organization?.Childs != null) {
            organization.Childs.forEach(element => {
                if (element?.Node?.ID === nodeID) {
                    element.Node.IsDelete = true
                    removeNode(element, element?.Node?.ID);
                } else {
                    removeNode(element, nodeID)
                }
            })
            return organization;
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

    const ORGTree = () => {
        return (<div className="organization">
            <div className="tool">
                <Button
                    className="ams-btn-default"
                    type="primary"
                    onClick={() => saveOrganizational()}
                >Save</Button>
                <Button
                    className="ams-btn-default"
                    type="primary"
                    danger
                    onClick={() => getOrganizational()}
                >Cancel</Button>
                <Button
                    className="ams-btn-default"
                    type="primary"
                    onClick={() => dispatch(setDepartmentData(null))}
                >Back</Button>
            </div>
            <span className="organization-chart">
                <h3>
                    Sơ đồ tổ chức
                </h3>
                <Tree
                    lineWidth={"1px"}
                    lineColor={"black"}
                    lineBorderRadius={"10px"}
                    label={<Node data={organizationalChart} />}
                >
                    {RenderTree(organizationalChart)}
                </Tree>
            </span>
        </div>)
    }

    const DepartmentDetail = () => {
        return (
            <div className="deparment-detail">
                <div className="department-detail-header">
                    <h3>Bộ phận: {departmentDetail?.Node?.DepartmentName}</h3>
                </div>
                <div className="department-detail-body">

                </div>
            </div>
        )
    }

    return (
        <Row >
            <Col span={4}>
                <DepartmentDetail />
            </Col>
            <Col span={20}>
                <ORGTree />
            </Col>
        </Row>
    )
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(OrganizationalChart);