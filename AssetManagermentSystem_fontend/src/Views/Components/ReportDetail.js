import React, { useEffect, useState } from "react";
import "../Access/Css/Common.scss";
import "../Access/Css/Warehouse.scss";
import { Col, Row, Input, DatePicker, Table, Button } from 'antd';
import {
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions/action';

function ReportDetail(props) {
    const { key } = props
    const dispatch = useDispatch()

    const {
        getReport
    } = amsAction;

    const {
        token,
        userName,
        result
    } = props.amsStore;

    const [dateChoice, setDateChoice] = useState();
    const [searchContent, setSearchContent] = useState('');
    const [dataTable, setDataTable] = useState();
    const [columns, setColumns] = useState();

    function search() {
        if (key === "R1") {
            const body = {
                Token: token,
                Key: "REPORT_1",
                UserNameRequest: userName,
                Data: {
                    DateFrom: dateChoice[0],
                    DateEnd: dateChoice[1],
                    SearchContent: searchContent
                }
            }
            dispatch(getReport(body))
        } else {
            const body = {
                Token: token,
                Key: "REPORT_2",
                UserNameRequest: userName,
                Data: {
                    DateFrom: dateChoice[0],
                    DateEnd: dateChoice[1],
                    SearchContent: searchContent
                }
            }
            dispatch(getReport(body))
        }
    }

    function readDataTable() {
        if(result){
            let columns1 = []
            result.Response.Headers.forEach(element => {
                columns1.push({
                    title: element.replaceAll('_', ' '),
                    dataIndex: element,
                    key: element,
                })
            });
            setColumns(columns1)
            setDataTable(JSON.parse(result.Response.Result))
        }
    }

    function init(){
        console.log(key)
        setDateChoice()
        setSearchContent()
        setDataTable()
        setColumns()
    }

    useEffect(init,[key])

    useEffect(readDataTable, [result])

    return (
        <div>
            <Row>
                <Col span={12}>
                    <DatePicker.RangePicker onChange={(e, dateString) => {
                        console.log(dateString)
                        setDateChoice(dateString)
                    }} />
                </Col>
                <Col span={12}>
                    <Input.Group>
                        <Input.Search
                            placeholder="Search..."
                            onPressEnter={() => search()}
                            onSearch={() => search()}
                            onChange={(e) => setSearchContent(e.target.value)}
                        />
                    </Input.Group >
                    <Button
                        type="primary"
                        onClick={() => search()}>
                        Add new
                    </Button>
                </Col>
            </Row>
            <Row className="report-content">
                <Col span={24}>
                    <Table
                        scroll={dataTable ? {
                            y: 550,
                            x: '100vw',
                        } : {}}
                        dataSource={dataTable}
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
