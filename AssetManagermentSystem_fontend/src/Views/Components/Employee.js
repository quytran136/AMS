import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Tree, TreeNode } from "react-organizational-chart";
import 'antd/dist/antd.css';
import '../Access/Css/Common.scss';
import '../Access/Css/Employee.scss'
import { Button, Input, Table, Row, Col, Modal, Select, DatePicker } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions/action';
import OrganizationalChart from '../Components/OrganizationalChart';

const Employee = (prop) => {

    const [showAddNew, setShowAddNew] = useState(false);

    const renderDataTable = () => {
        var comlumn = []
    }


    return (<div className="employee">
        <div className="employee-header">
            <h3>Danh sách nhân sự</h3>
        </div>
        <Row className="employee-tool">
            <Col span={8} className="tool-left">
                <Input.Group>
                    <Input.Search
                        placeholder="Search..."
                    />
                </Input.Group >
            </Col>
            <Col span={16} className="tool-right">
                <Button
                    type="primary"
                    onClick={() => setShowAddNew(true)}>
                    Add new
                </Button>
            </Col>
        </Row>
        <Row className="employee-body">

        </Row>

        <Modal
            title="Thêm mới nhân viên"
            centered
            visible={showAddNew}
            onOk={() => setShowAddNew(false)}
            onCancel={() => setShowAddNew(false)}
        >
            <h4>Trực thuộc phòng ban</h4>
            <Select
                showSearch
                className="select"
                placeholder="Select a person"
                optionFilterProp="children"
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Select.Option value="jack">Jack</Select.Option >
                <Select.Option value="lucy">Lucy</Select.Option >
                <Select.Option value="tom">Tom</Select.Option >
            </Select>
            <br />
            <h4>Chức vụ</h4>
            <Select
                showSearch
                className="select"
                placeholder="Select a person"
                optionFilterProp="children"
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Select.Option value="jack">Jack</Select.Option >
                <Select.Option value="lucy">Lucy</Select.Option >
                <Select.Option value="tom">Tom</Select.Option >
            </Select>
            <br />
            <h4>Tên nhân viên</h4>
            <Input placeholder="Trần Văn A" prefix={<UserOutlined />} />
            <br />
            <h4>Ngày tháng năm sinh</h4>
            <DatePicker size="default" className="select" format="DD/MM/yyyy"/>
            <br />
            <h4>Đại chỉ email</h4>
            <Input placeholder="Trần Văn A" prefix={<MailOutlined />} />
            <br />
            <h4>Số điện thoại</h4>
            <Input placeholder="Trần Văn A" prefix={<PhoneOutlined />} />
            <br />
        </Modal>
    </div>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Employee);