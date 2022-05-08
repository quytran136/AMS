import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Row, Input, DatePicker, Table, Button, Select } from 'antd';
import {
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions';
import moment from 'moment';

function ReportDetail(props) {
    const { data } = props
    const dispatch = useDispatch()

    const {
        getReport,
        requestWarehouse
    } = amsAction;

    const {
        token,
        userName,
        result,
        warehouses
    } = props.amsStore;

    const [dateChoice, setDateChoice] = useState(
        [
            new Date().toISOString(),
            new Date().toISOString()
        ]
    );
    const [searchContent, setSearchContent] = useState('');
    const [dataTable, setDataTable] = useState();
    const [columns, setColumns] = useState();
    const [warehouseSelected, setWarehouseSelected] = useState();
    const [listWareHouse, setListWarehouse] = useState([])

    function getWarehouse() {
        const body = {
            Token: token,
            Key: "GET_WAREHOUSE",
            UserNameRequest: userName,
            Data: {
                StoreIdentifie: {
                    StoreName: "",
                }
            }
        }
        dispatch(requestWarehouse(body))
    }

    function readWarehouse() {
        if (warehouses?.Response?.StoreIdentifies) {
            let listWH = []
            warehouses.Response.StoreIdentifies.forEach(element => {
                listWH.push({
                    value: element.ID,
                    label: element.StoreName
                })
            });
            setListWarehouse(listWH)
        }
    }

    function search() {
        // if (data === "R1") {
        const body = {
            Token: token,
            Key: data,
            UserNameRequest: userName,
            Data: {
                DateFrom: dateChoice[0],
                DateEnd: dateChoice[1],
                SearchContent: searchContent,
                Store: warehouseSelected
            }
        }
        dispatch(getReport(body))
        // } else {
        //     const body = {
        //         Token: token,
        //         Key: "REPORT_2",
        //         UserNameRequest: userName,
        //         Data: {
        //             DateFrom: dateChoice[0],
        //             DateEnd: dateChoice[1],
        //             SearchContent: searchContent,
        //             Store: warehouseSelected
        //         }
        //     }
        //     dispatch(getReport(body))
        // }
    }

    function readDataTable() {
        if (result && result.Response.Headers) {
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

    function init() {
        getWarehouse()
        setDateChoice([
            new Date().toISOString(),
            new Date().toISOString()
        ])
        setSearchContent('')
        setDataTable()
        setColumns()
    }

    useEffect(init, [data])
    useEffect(readWarehouse, [warehouses])

    useEffect(readDataTable, [result])

    return (
        <div>
            <Row>
                <Col span={10}>
                    <DatePicker.RangePicker
                        value={[moment(dateChoice[0], "YYYY/MM/DD"), moment(dateChoice[1], "YYYY/MM/DD")]}
                        onChange={(e, dateString) => {
                            setDateChoice(dateString)
                        }} />
                </Col>
                <Col span={4}>
                    <Select
                        className="input"
                        options={listWareHouse}
                        value={warehouseSelected}
                        onChange={e => {
                            setWarehouseSelected(e)
                        }}>
                    </Select>
                </Col>
                <Col span={8}>
                    <Input.Group>
                        <Input.Search
                            placeholder="Search..."
                            onPressEnter={() => search()}
                            onSearch={() => search()}
                            onChange={(e) => setSearchContent(e.target.value)}
                        />
                    </Input.Group >
                </Col>
                <Col span={2}>
                    <Button
                        type="primary"
                        onClick={() => search()}>
                        Read
                    </Button>
                </Col>
            </Row>
            <Row className="report-content">
                <Col span={24}>
                    <Table
                        scroll={dataTable ? {
                            y: '60vh',
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
