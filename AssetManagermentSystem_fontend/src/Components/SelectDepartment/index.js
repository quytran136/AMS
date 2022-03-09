import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import { TreeSelect } from 'antd';
import * as amsAction from '../../ReduxSaga/Actions';

const SelectDepartment = (prop) => {
    const { visible, selected, onSelected } = prop
    const dispatch = useDispatch();
    const {
        getOrganizationalChart,
    } = amsAction;

    const [department, setDepartment] = useState()
    const [organization, setOrganization] = useState()

    function init() {
        if (selected.includes("DEP")) {
            setDepartment(selected.split("/")[1])
            getORG(selected.split("/")[1])
        }

        if (selected.includes("ORG")) {
            const dep = selected.split("|")[0]
            const org = selected.split("|")[1]
            setDepartment(dep.split("/")[1])
            getORG(dep.split("/")[1])
            setOrganization(org.split("/")[1])
        }
    }

    useEffect(init, [])

    const {
        userName,
        token,
        departmentChart,
        organizationalChart,
    } = prop.amsStore;


    function getORG(value) {
        const body = {
            Token: token,
            Key: "ORGANIZATIONAL_CHART",
            UserNameRequest: userName,
            Data: {
                DepartmentID: value
            }
        }
        dispatch(getOrganizationalChart(body))
    }

    function RenderTreeDepartment(item) {
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
                            node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.DepartmentName} />)
                        } else {
                            node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.DepartmentName}> {RenderTreeDepartment(element)}</TreeSelect.TreeNode>)
                        }
                    } else {
                        node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.DepartmentName} />)
                    }
                }
            });
        }
        return node;
    }

    function RenderTreeORG(item) {
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
                            node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.OrganizationalName} />)
                        } else {
                            node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.OrganizationalName}> {RenderTreeORG(element)}</TreeSelect.TreeNode>)
                        }
                    } else {
                        node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.OrganizationalName} />)
                    }
                }
            });
        }
        return node;
    }

    return (<>
        <h4>Phòng ban</h4>
        <TreeSelect
            disabled={visible}
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear="true"
            value={department}
            treeDefaultExpandAll="true"
            onChange={(e) => {
                setDepartment(e)
                getORG(e)
                onSelected("DEP/" + e)
            }}
        >
            {departmentChart ?
                <TreeSelect.TreeNode value={departmentChart.Node.ID} title={departmentChart.Node.DepartmentName}>
                    {RenderTreeDepartment(departmentChart)}
                </TreeSelect.TreeNode> : ""}

        </TreeSelect>

        <h4>Vị trí</h4>

        <TreeSelect
            disabled={visible}
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear="true"
            treeDefaultExpandAll="true"
            value={organization}
            onChange={(e) => {
                setOrganization(e)
                onSelected("DEP/" + department + "|" + "ORG/" + e)
            }}
        >
            {organizationalChart ?
                <TreeSelect.TreeNode key={organizationalChart.Node.ID} value={organizationalChart.Node.ID} title={organizationalChart.Node.OrganizationalName}>
                    {RenderTreeORG(organizationalChart)}
                </TreeSelect.TreeNode> : ""}
        </TreeSelect>
    </>)

}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(SelectDepartment);