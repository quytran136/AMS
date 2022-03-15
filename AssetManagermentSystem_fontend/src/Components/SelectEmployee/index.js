import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import { Input, Row, Col, Table, Select, Avatar } from 'antd';
import * as amsAction from '../../ReduxSaga/Actions';

const SelectEmployee = (prop) => {
    const { title, type, disabled, selected, onSelected } = prop

    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState();
    const [selectList, setSelectList] = useState([]);
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
            UserNameRequest: userName,
            Data: {
                SearchContent: searchContent || null
            }
        }
        dispatch(getUsers(body))
    }

    function convertUserToSelectList() {
        if (users) {
            let us = []
            users.forEach(element => {
                us.push({
                    value: element.ID,
                    label: element.UserName,
                })
            });
            setSelectList(us)
        }
    }

    useEffect(getListUser, [])

    useEffect(convertUserToSelectList, [users])

    const rowSelection = {
        selectedRowKeys: selected,
        onChange: (selectedRowKeys, selectedRows) => {
            onSelected(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (<div className="employee">
        {type === "Select" ?
            <Select
                disabled={disabled}
                showSearch
                className="select"
                placeholder="Chọn 1 người"
                optionFilterProp="label"
                options={selectList}
                value={selected[0]}
                onChange={(e) => {
                    if (onSelected) {
                        onSelected([{
                            ID: e
                        }])
                    }
                }}
            >
            </Select> :
            <>
                <div className="employee-header">
                    <h3>{title}</h3>
                </div>
                <Row className="employee-tool">
                    <Col span={24} className="tool-left">
                        <Input.Group>
                            <Input.Search
                                disabled={disabled}
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
                            disabled={disabled}
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
            </>
        }

    </div>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(SelectEmployee);