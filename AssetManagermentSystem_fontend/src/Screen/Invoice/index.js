import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import { Button, Row, Col, Table, DatePicker } from 'antd';
import {
    EyeOutlined,
    CheckCircleFilled,
    CloseCircleFilled,
    AuditOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions';
import { useHistory } from "react-router-dom";
import moment from 'moment';

const Invoice = (prop) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [listTicket, setListTicket] = useState([])
    const [selectedDate, setSelectedDate] = useState({
        DateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString('en-us'),
        DateTo: new Date().toLocaleDateString('en-us')
    })

    const {
        requestTicket,
        setRequestID,
        setFunctionTitle,
        getTicketSuccess,
        setWarehouseAction
    } = amsAction;

    const {
        userName,
        token,
        ticket,
        configCommon
    } = prop.amsStore;

    const columns = [
        {
            title: 'Mã yêu cầu',
            dataIndex: 'Code',
            key: 'Code',
        },
        {
            title: 'Yêu cầu',
            dataIndex: 'RequestType',
            key: 'RequestType',
            render: (text, record, index) => {
                return (<span className="flex">
                    {record.icon}
                    {record.RequestType}
                </span>)
            }
        },
        {
            title: 'Người yêu cầu',
            dataIndex: 'RequestBy',
            key: 'RequestBy',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'CreateDate',
            key: 'CreateDate',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'Status',
            key: 'Status',
        },
        {
            title: 'Hành động',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (text, record, index) => {
                return (<span className="flex-center">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            dispatch(setRequestID(record.ID))
                            dispatch(setRequestID({
                                ticketID: record.ID,
                                notiID: "",
                                readOnly: true,
                                redirect: "/Ticket"
                            }))
                            setTimeout(() => {
                                let title = ""
                                configCommon.Response.Configs.forEach(element => {
                                    switch (element.Code) {
                                        case "FUNCTION":
                                            const funcArray = JSON.parse(element.Value)
                                            funcArray.forEach(func => {
                                                if (("/" + record.RequestType) === func.FunctionPath) {
                                                    title = func.FunctionName
                                                }
                                            });
                                            break
                                        default:
                                            break;
                                    }
                                })
                                dispatch(setFunctionTitle("Phê duyệt " + title))
                                history.push("/" + record.RequestType)
                            }, 100);
                        }}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<AuditOutlined />}
                        className="ams-btn-success"
                        onClick={() => {
                            dispatch(setRequestID(record.ID))
                            dispatch(setRequestID({
                                ticketID: record.ID,
                                notiID: "",
                                readOnly: true,
                                redirect: "/Shopping/Invoice"
                            }))
                            setTimeout(() => {
                                let title = ""
                                configCommon.Response.Configs.forEach(element => {
                                    switch (element.Code) {
                                        case "FUNCTION":
                                            const funcArray = JSON.parse(element.Value)
                                            funcArray.forEach(func => {
                                                if (("/" + record.RequestType) === func.FunctionPath) {
                                                    title = func.FunctionName
                                                }
                                            });
                                            break
                                        default:
                                            break;
                                    }
                                })
                                dispatch(setFunctionTitle("Phê duyệt " + title))
                                history.push("/" + record.RequestType)
                            }, 100);
                        }}
                    />
                </span>)
            }
        }
    ]

    const getListTicket = () => {
        const body = {
            Token: token,
            Key: "TICKET_REQUESTED_FOR_ACCOUNTANT",
            UserNameRequest: userName,
            Data: {
                DateFrom: selectedDate.DateFrom,
                DateTo: selectedDate.DateTo
            }
        }
        dispatch(requestTicket(body))
    }

    function convertData() {
        if (ticket && ticket.Response.Tickets) {
            var list = []
            ticket.Response.Tickets.forEach((element, index) => {
                list.push({
                    key: index,
                    Code: Date.parse(element.CreateDate),
                    ID: element.ID,
                    RequestType: element.RequestType,
                    RequestBy: element.RequestBy,
                    CreateDate: (new Date(element.CreateDate)).toLocaleString("us-en"),
                    Status: element.IsApprove === true ? "Đã phê duyệt" : element.IsReject === true ? "không được duyệt" : "Đang trong tiến trình duyệt",
                    icon: element.IsApprove === true ? <CheckCircleFilled className="green-color" /> : element.IsReject === true ? <CloseCircleFilled className="red-color" /> : ""
                })
            });
            setListTicket(list)
        }
    }

    useEffect(convertData, [ticket])
    useEffect(getListTicket, [selectedDate])

    return (
        <div className="main-content">
            <div className="invoice">
                <div className="invoice-header">
                    <h3>Danh sách yêu cầu</h3>
                </div>
                <Row className="invoice-tool">
                    <Col span={8} className="tool-left">
                        <DatePicker.RangePicker
                            defaultValue={[moment(selectedDate.DateFrom, "MM/DD/YYYY"), moment(selectedDate.DateTo, "MM/DD/YYYY")]}
                            onChange={(value, fo) => {
                                    setSelectedDate({
                                        DateFrom: fo[0],
                                        DateTo: fo[1]
                                    })
                            }} />
                    </Col>
                </Row>
                <Row className="invoice-body">
                    <Col span={24}>
                        <Table
                            scroll={ticket ? {
                                y: '60vh',
                                x: '100vw',
                            } : {}}
                            dataSource={ticket ? listTicket : []}
                            columns={columns}
                            pagination={20} />
                    </Col>
                </Row>
            </div>
        </div>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Invoice);