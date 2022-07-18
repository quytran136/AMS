import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import { Button, Row, Col, Table, DatePicker, Modal, Input, Card } from 'antd';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    AuditOutlined
} from '@ant-design/icons';
import * as amsAction from '../../../ReduxSaga/Actions';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import ListAsset from "../../Components/ListAsset";

const Invoice = (prop) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [listTicket, setListTicket] = useState([])
    const [selectedDate, setSelectedDate] = useState({
        DateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString('en-us'),
        DateTo: new Date().toLocaleDateString('en-us')
    })
    const [visibleModal, setVisibleModal] = useState(false)
    const [ticketInfo, setTicketInfo] = useState()

    const {
        requestTicket,
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
                        icon={<AuditOutlined />}
                        className="ams-btn-success"
                        onClick={() => {
                            setVisibleModal(true)
                            readRequest(record.ID)
                            setTicketInfo(record)
                        }}
                    />
                </span>)
            }
        }
    ]

    const getListTicket = (e) => {
        const body = {
            Token: token,
            Key: "TICKET_REQUESTED_FOR_ACCOUNTANT",
            UserNameRequest: userName,
            Data: {
                DateFrom: selectedDate.DateFrom,
                DateTo: selectedDate.DateTo,
                SearchContent: e || ""
            }
        }
        dispatch(requestTicket(body))
    }

    function readRequest(ticketID) {
        const body = {
            Token: token,
            Key: "GET_TICKET_SHOPPING",
            UserNameRequest: userName,
            Data: {
                RequestID: ticketID,
            }
        }
        dispatch(requestTicket(body))
    }

    function payConfirm(ticketID) {
        const body = {
            Token: token,
            Key: "PAY_CONFIRM_TICKET_SHOPPING",
            UserNameRequest: userName,
            Data: {
                RequestID: ticketID,
            }
        }
        dispatch(requestTicket(body))
    }

    function convertData() {
        if (ticket && ticket.Response.Invoices) {
            var list = []
            ticket.Response.Invoices.forEach((element, index) => {
                list.push({
                    key: index,
                    Code: Date.parse(element.request_ticket_history.CreateDate),
                    ID: element.request_ticket_history.ID,
                    RequestType: element.request_ticket_history.RequestType,
                    RequestBy: element.request_ticket_history.RequestBy,
                    CreateDate: (new Date(element.request_ticket_history.CreateDate)).toLocaleString("us-en"),
                    Status: element.IsPay === true ? "Đã thanh toán" : element.request_ticket_history.IsApprove === true ? "Đã phê duyệt" : element.request_ticket_history.IsReject === true ? "không được duyệt" : "Đang trong tiến trình duyệt",
                    icon: element.request_ticket_history.IsApprove === true ? <CheckCircleFilled className="green-color" /> : element.request_ticket_history.IsReject === true ? <CloseCircleFilled className="red-color" /> : "",
                    isPay: element.isPay
                })
            });
            setListTicket(list)
        }
    }

    useEffect(convertData, [ticket])
    useEffect(getListTicket, [selectedDate])

    return (
        <div className="main-content">
            <Card className="invoice">
                <div>
                    <div className="invoice-header">
                        <h3>Danh sách yêu cầu thanh toán</h3>
                    </div>
                    <Row className="invoice-tool">
                        <Col span={4} className="tool-left">
                            <DatePicker.RangePicker
                                defaultValue={[moment(selectedDate.DateFrom, "MM/DD/YYYY"), moment(selectedDate.DateTo, "MM/DD/YYYY")]}
                                onChange={(value, fo) => {
                                    setSelectedDate({
                                        DateFrom: fo[0],
                                        DateTo: fo[1]
                                    })
                                }} />
                        </Col>
                        <Col span={6} className="tool-left">
                            <Input.Group>
                                <Input.Search
                                    placeholder="Search..."
                                    onSearch={(e) => getListTicket(e)}
                                    onChange={(e) => getListTicket(e.target.value)}
                                />
                            </Input.Group >
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
            </Card>
            <Modal
                visible={visibleModal}
                title="Xác nhận thanh toán"
                onCancel={() => {
                    setVisibleModal(false)
                }}
                footer={[
                    <Button
                        disabled={ticket?.Response?.Invoice?.IsPay === true ? true : false}
                        key="payConfirm"
                        type="primary"
                        onClick={() => {
                            payConfirm(ticket?.Response.Ticket.ID)
                            setVisibleModal(false)
                            setTimeout(() => {
                                getListTicket()
                            }, 1000);
                        }}
                    >
                        Xác nhận thanh toán
                    </Button>,
                    <Button
                        key="print"
                        type="primary"
                        onClick={() => window.print()}>
                        In phiếu yêu cầu thanh toán
                    </Button>,
                ]}
                width="80vw"
            >
                <div className="invoice-detail">
                    <div className="header">
                        Phiếu yêu cầu thanh toán
                    </div>
                    <div className="info">
                        <div>
                            Người lập: <span className="text-bold">{ticketInfo?.RequestBy}</span>
                        </div>
                        <div>
                            Ngày lập: <span className="text-bold">{ticketInfo?.CreateDate}</span>
                        </div>
                        <div>
                            Tình trạng: <span className="text-bold">{ticketInfo?.Status}</span>
                        </div>
                    </div>
                    <ListAsset
                        disabled={true}
                        viewOnly={true}
                        dataSource={ticket?.Response?.Assets}
                    />
                </div>
            </Modal>
        </div>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Invoice);