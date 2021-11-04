import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Tree, TreeNode } from "react-organizational-chart";
import '../Access/Css/Login.scss';
import 'antd/dist/antd.css';
import '../Access/Css/Common.scss';
import '../Access/Css/DepartmentChart.scss'
import { Button, Input, Card, Select } from 'antd';
import openNotification from './openNotification';
import {
    UserOutlined,
    CloseCircleOutlined,
    PlusOutlined,
    MinusOutlined,
    CloseOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions/action';
import * as messageType from '../../Common/messageCode';


const DepartmentChart = (prop) => {
    const dispatch = useDispatch();
    const {
        saveDepartmentChart,
        getDepartmentChart,
    } = amsAction;

    const {
        departmentChart
    } = prop.amsStore;

    function getDepartment(params) {
        dispatch(getDepartmentChart())
    }

    const Node = (propA) => {
        const { data } = propA
        const [name, setName] = useState(data?.label)

        function changeValue(treeT, key, value) {
            if (treeT.key === key) {
                treeT.list.push({
                    label: value,
                    key: Date.now(),
                    list: []
                })
                return treeT;
            }
            if (treeT && treeT.list != null) {
                treeT.list.forEach(element => {
                    if (element.key === key) {
                        element.label = value
                        return treeT;
                    } else {
                        return changeValue(element, key, value)
                    }
                })
                return treeT;
            }
        }

        return (
            <Card bordered={true} className="node">
                <div className="header">
                    <Input
                        value={name}
                        className="input"
                        size="middle"
                        placeholder="New node"
                        prefix={<UserOutlined />}
                        onChange={(e) => setName(e.target.value)} />
                    <Select
                        defaultValue=""
                        className="input select"
                        size="middle"
                        prefix={<UserOutlined />}
                        data={[]}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        className="add-node"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            var tree = addNode(departmentChart, data?.key)
                            dispatch(saveDepartmentChart(tree))
                        }}
                    />
                    <Button
                        shape="circle"
                        icon={<CloseOutlined />}
                        className="delete-node"
                        onClick={() => {
                            var tree = removeNode(departmentChart, data?.key)
                            dispatch(saveDepartmentChart(tree))
                        }}
                    />
                </div>
            </Card>)
    }



    function addNode(treeT, key) {
        if (treeT.key === key) {
            treeT.list.push({
                label: "new one",
                key: Date.now(),
                list: []
            })
            return treeT;
        }
        if (treeT && treeT.list != null) {
            treeT.list.forEach(element => {
                if (element.key === key) {
                    element.list.push({
                        label: "new one",
                        key: Date.now(),
                        list: []
                    })
                    return treeT;
                } else {
                    return addNode(element, key)
                }
            })
            return treeT;
        }
    }

    function removeNode(treeT, key) {
        if (treeT.key === key) {
            return {
                label: "new one",
                key: Date.now(),
                list: []
            };
        }
        if (treeT && treeT.list != null) {
            treeT.list.forEach(element => {
                if (element.key === key) {
                    const index = treeT.list.indexOf(element)
                    treeT.list.splice(index, 1)
                    return treeT;
                } else {
                    return removeNode(element, key)
                }
            })
            return treeT;
        }
    }

    function RenderTree(item) {
        var node = [];
        if (item && (item.list !== null || item.list !== undefined)) {
            item.list.forEach(element => {
                if (element.list.length === 0) {
                    node.push(<TreeNode key={element.key} label={<Node
                        data={element}
                    />} />)
                } else {
                    node.push(<TreeNode key={element.key} label={<Node
                        data={element}
                    />}> {RenderTree(element)}
                    </TreeNode>)
                }
            });
        }

        return node;
    }

    return (
        <div className="department-chart">
            <div className="tool">
                <Button>Save</Button>
            </div>
            <Tree
                lineWidth={"1px"}
                lineColor={"black"}
                lineBorderRadius={"10px"}
                label={<Node data={departmentChart} />}
            >
                {RenderTree(departmentChart)}
            </Tree>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(DepartmentChart);