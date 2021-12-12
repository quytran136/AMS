import React, { useEffect, useState } from "react";
import "../Access/Css/Common.scss";
import "../Access/Css/Warehouse.scss";
import { Col, Card, Row, Input, Button, DatePicker, Table } from 'antd';
import {
} from '@ant-design/icons';
import {
    useHistory
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions/action';
import SelectAssetByEmployee from "./SelectAssetByEmployee";

function ReportDetail(props) {

    const {
    } = amsAction;

    const {
        report
    } = props.amsStore;

    const columns = [
        // {
        //     title: 'Họ tên',
        //     dataIndex: 'UserFullName',
        //     key: 'UserFullName',
        // },
        // {
        //     title: 'Tài khoản',
        //     dataIndex: 'UserName',
        //     key: 'UserName',
        // },
        // {
        //     title: 'Điện thoại',
        //     dataIndex: 'Phone',
        //     key: 'Phone',
        // },
        // {
        //     title: 'Email',
        //     dataIndex: 'Email',
        //     key: 'Email',
        // },
        // {
        //     title: 'Phòng ban',
        //     dataIndex: 'DepartmentName',
        //     key: 'DepartmentName',
        // },
        // {
        //     title: 'Chức vụ',
        //     dataIndex: 'OrganizationName',
        //     key: 'OrganizationName',
        // }
    ]

    function search(content) {

    }

    return (
        <div>
            <Row>
                <Col span={12}>
                    <DatePicker.RangePicker />
                </Col>
                <Col span={12}>
                    <Input.Group>
                        <Input.Search
                            placeholder="Search..."
                            onPressEnter={() => search()}
                            onSearch={() => search()}
                            onChange={(e) => search(e.target.value)}
                        />
                    </Input.Group >
                </Col>
            </Row>
            <Row className="report-content">
                <Col span={24}>
                    <Table
                        scroll={report ? {
                            y: 550,
                            x: '100vw',
                        } : {}}
                        dataSource={report}
                        columns={columns}
                        pagination={30} />
                </Col>
            </Row>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ReportDetail);
