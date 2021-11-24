import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import '../Access/Css/Common.scss';
import '../Access/Css/Employee.scss'
import { Input, Row, Col, Table } from 'antd';
import * as amsAction from '../../ReduxSaga/Actions/action';

const SelectEmployee = (prop) => {
    const { selectedBeffor, selected } = prop

    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState();
    const {
        getUsers
    } = amsAction;

    const {
        userName,
        token,
        users
    } = prop.amsStore;

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'UserFullName',
            key: 'UserFullName',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'UserName',
            key: 'UserName',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Phòng ban',
            dataIndex: 'DepartmentName',
            key: 'DepartmentName',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'OrganizationName',
            key: 'OrganizationName',
        }
    ]

    const getListUser = () => {
        const body = {
            Token: token,
            Key: "USERS",
            Data: {
                UserNameRequest: userName,
                SearchContent: searchContent || null
            }
        }
        dispatch(getUsers(body))
    }

    useEffect(getListUser, [])

    const rowSelection = {
        selectedRowKeys: selectedBeffor,
        onChange: (selectedRowKeys, selectedRows) => {
            selected(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (<div className="employee">
        <div className="employee-header">
            <h3>Danh sách nhân sự</h3>
        </div>
        <Row className="employee-tool">
            <Col span={24} className="tool-left">
                <Input.Group>
                    <Input.Search
                        placeholder="Search..."
                        onPressEnter={() => getListUser()}
                        onSearch={() => getListUser()}
                        onChange={(e) => setSearchContent(e.target.value)}
                    />
                </Input.Group >
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table
                    scroll={users ? {
                        y: 550,
                        x: '100vw',
                    } : {}}
                    dataSource={users}
                    columns={columns}
                    pagination={20}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }} />
            </Col>
        </Row>
    </div>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(SelectEmployee);