import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import { Button, Input, Row, Col, Table, Avatar } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    LockOutlined,
    UnlockOutlined
} from '@ant-design/icons';
import * as amsAction from '../../../ReduxSaga/Actions';
import UpdateEmployee from "../UpdateEmployee";

const Employee = (prop) => {
    const dispatch = useDispatch();
    const [showAddNew, setShowAddNew] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [itemSelected, setEmployeeSelected] = useState();
    const [searchContent, setSearchContent] = useState();
    const {
        getUsers,
        deleteUser,
        lockOrUnlock
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
            render: (text, record, index) => {
                return(
                    <div className="flex">
                        <Avatar size={32} shape="circle" className="item" src={record.Image} />
                        {record.UserFullName}
                    </div>
                )
            }
        },
        {
            title: 'Tài khoản',
            dataIndex: 'UserName',
            key: 'UserName',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'Phone',
            key: 'Phone',
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
        },
        {
            title: 'Hành động',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (text, record, index) => {
                return (<span>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setShowEdit(true)
                            setEmployeeSelected(record)
                        }}
                    />
                    <Button
                        danger
                        type="primary"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => deleteSelected(record)}
                    />
                    <Button
                        danger
                        className={record.IsLock ? "ams-btn-warning" : "ams-btn-success"}
                        type="primary"
                        shape="circle"
                        icon={record.IsLock ? <LockOutlined /> : <UnlockOutlined />}
                        onClick={() => record.IsLock ? unlockSelected(record) : lockSelected(record)}
                    />
                </span>)
            }
        }
    ]

    function deleteSelected(record) {
        const body = {
            Token: token,
            Key: "DELETE_USER",
            UserNameRequest: userName,
            Data: {
                UserID: record.ID
            }
        }
        dispatch(deleteUser(body))
        setTimeout(() => {
            getListUser()
        }, 300);
    }

    function unlockSelected(record) {
        const body = {
            Token: token,
            Key: "UNLOCK_USER",
            UserNameRequest: userName,
            Data: {
                UserID: record.ID
            }
        }
        dispatch(lockOrUnlock(body))
        setTimeout(() => {
            getListUser()
        }, 300);
    }

    function lockSelected(record) {
        const body = {
            Token: token,
            Key: "LOCK_USER",
            UserNameRequest: userName,
            Data: {
                UserID: record.ID
            }
        }
        dispatch(lockOrUnlock(body))
        setTimeout(() => {
            getListUser()
        }, 300);
    }

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

    useEffect(getListUser, [])

    return (<div className="employee">
        <div className="employee-header">
            <h3>Danh sách nhân sự</h3>
        </div>
        <Row className="employee-tool">
            <Col span={8} className="tool-left">
                <Input.Group>
                    <Input.Search
                        placeholder="Search..."
                        onPressEnter={() => getListUser()}
                        onSearch = {() => getListUser()}
                        onChange={(e) => setSearchContent(e.target.value)}
                    />
                </Input.Group >
            </Col>
            <Col span={16} className="tool-right">
                <Button
                    type="primary"
                    onClick={() => setShowAddNew(true)}>
                    Thêm mới
                </Button>
            </Col>
        </Row>
        <Row className="employee-body">
            <Col span={24}>
                <Table
                    scroll={users ? {
                        y: 550,
                        x: '100vw',
                    } : {}}
                    dataSource={users}
                    columns={columns}
                    pagination={20} />
            </Col>
        </Row>

        <UpdateEmployee
            visible={showAddNew}
            onTrigger={(e) => {
                setShowAddNew(e)
                getListUser()
            }}
        />
        <UpdateEmployee
            visible={showEdit}
            dataSelected={itemSelected}
            onTrigger={(e) => {
                setShowEdit(e)
                getListUser()
            }}
        />
    </div>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Employee);