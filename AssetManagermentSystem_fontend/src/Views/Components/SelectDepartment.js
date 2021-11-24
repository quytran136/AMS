import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import '../Access/Css/Common.scss';
import '../Access/Css/Employee.scss'
import { TreeSelect } from 'antd';
import * as amsAction from '../../ReduxSaga/Actions/action';

const SelectDepartment = (prop) => {
    const { departmentID, selected } = prop
    const dispatch = useDispatch();
    const {
        getOrganizationalChart,
    } = amsAction;

    const {
        userName,
        token,
        departmentChart,
        organizationalChart
    } = prop.amsStore;

    const [department, setDepartment] = useState()
    const [organization, setOrganization] = useState()

    function getORG(value) {
        const body = {
            Token: token,
            Key: "ORGANIZATIONAL_CHART",
            Data: {
                UserNameRequest: userName,
                DepartmentID: value
            }
        }
        dispatch(getOrganizationalChart(body))
    }

    function getAllEmployee(){
        
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
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear="true"
            defaultValue={departmentID}
            treeDefaultExpandAll="true"
            onChange={(e) => {
                setDepartment(e)
                getORG(e)
            }}
        >
            {departmentChart ?
                <TreeSelect.TreeNode value={departmentChart.Node.ID} title={departmentChart.Node.DepartmentName}>
                    {RenderTreeDepartment(departmentChart)}
                </TreeSelect.TreeNode> : ""}

        </TreeSelect>

        <h4>Vị trí</h4>

        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear="true"
            treeDefaultExpandAll="true"
            defaultValue={organization}
            value={organization}
            onChange={(e) => setOrganization(e)}
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