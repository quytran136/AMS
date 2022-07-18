import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Card, Row, Select, Input, Button } from 'antd';
import {
} from '@ant-design/icons';
import {
    useHistory
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../../ReduxSaga/Actions';
import ListAsset from "../ListAsset";
import VotingHistory from "../VotingHistory";

function Shopping(props) {
    const { data, title } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        requestWarehouse,
        requestTicket,
        requestNotification,
        setError,
        setMessage
    } = amsAction;

    const {
        userName,
        token,
        warehouses,
        userInfoLogin,
        warehouseAction,
        ticket,
    } = props.amsStore;

    const [listAsset, setListAsset] = useState();
    const [warehouseSelected, setWarehouseSelected] = useState()
    const [listWareHouse, setListWarehouse] = useState([])
    const [ticketDescription, setTicketDescription] = useState()

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

    function sentRequest() {
        if (warehouseSelected) {
            if (!listAsset || listAsset?.length === 0) {
                dispatch(setError({
                    Code: "AMS_01",
                    Message: "Danh sách tài sản trống"
                }))
                return;
            }
            let AssetDetails = []
            let breakPoint = false
            listAsset.forEach(element => {
                if (element.Quantity < 1) {
                    dispatch(setError({
                        Code: "AMS_01",
                        Message: "Tối thiểu phải chọn 1 tài sản"
                    }))
                    breakPoint = true
                    return;
                }
                AssetDetails.push({
                    StoreID: warehouseSelected,
                    AssetClassifyID: element.AssetClassifyID,
                    AssetFullName: element.AssetFullName,
                    QuantityOriginalStock: element.QuantityOriginalStock,
                    Quantity: element.QuantityOriginalStock,
                    Unit: element.Unit,
                    Description: element.Description,
                    Price: element.Price,
                    SupplierID: element.SupplierID,
                    ExpirationDate: element.ExpirationDate,
                })
            });

            if (breakPoint === true) {
                return;
            }

            const body = {
                Token: token,
                Key: "CREATE_TICKET_SHOPPING",
                UserNameRequest: userName,
                Data: {
                    StoreID: warehouseSelected,
                    Description: ticketDescription,
                    ProcessID: warehouseAction.ProcessID,
                    AssetDetails: AssetDetails,
                    InvoiceDetails: AssetDetails
                }
            }
            dispatch(requestTicket(body))
            history.push('/Home')
        } else {
            dispatch(setError({ Message: "Chưa chọn kho lưu trữ" }))
        }
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

    function readRequest() {
        if (!data?.createRequest) {
            const body = {
                Token: token,
                Key: "GET_TICKET_SHOPPING",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.ticketID,
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function sentRequestApprove() {
        if (!data?.createRequest) {
            const body = {
                Token: token,
                Key: "APPROVE_TICKET_SHOPPING",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.ticketID,
                }
            }
            dispatch(requestTicket(body))
            dispatch(setMessage("Phê duyệt thành công"))
        }
    }

    function sentRequestReject() {
        if (!data?.createRequest) {
            const body = {
                Token: token,
                Key: "REJECT_TICKET_SHOPPING",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.ticketID,
                }
            }
            dispatch(requestTicket(body))
            dispatch(setMessage("Đã từ chối yêu cầu"))
        }
    }

    function ticketContent() {
        if (ticket && ticket?.Response.Ticket) {
            setWarehouseSelected(ticket?.Response.Ticket.StoreID)
            setTicketDescription(ticket?.Response.Ticket?.Description)
        }
    }

    useEffect(getWarehouse, [])

    useEffect(readWarehouse, [warehouses?.Response?.StoreIdentifies])

    useEffect(readRequest, [data])

    useEffect(ticketContent, [ticket])

    return (
        <div className="main-content warehouse">
            <Card className="warehouse-body-request">
                <Row className="warehouse-tool">
                    <Col span={16} className="tool-left">
                        <h2>
                            {title}
                        </h2>
                    </Col>
                    <Col span={8} className="tool-right">
                        {
                            data?.createRequest === false ?
                                <>
                                    {data.readOnly(ticket) === false ?
                                        <>
                                            <Button
                                                className="ams-btn-default"
                                                type="primary"
                                                onClick={() => {
                                                    const body = {
                                                        Token: token,
                                                        Key: "READED_NOTIFICATION",
                                                        UserNameRequest: userName,
                                                        Data: data.notiID,
                                                    }
                                                    dispatch(requestNotification(body))
                                                    sentRequestApprove()
                                                    history.push('/Home')
                                                }}
                                            >Phê duyệt</Button>
                                            <Button
                                                className="ams-btn-default"
                                                type="primary"
                                                danger
                                                onClick={() => {
                                                    const body = {
                                                        Token: token,
                                                        Key: "READED_NOTIFICATION",
                                                        UserNameRequest: userName,
                                                        Data: data.notiID,
                                                    }
                                                    dispatch(requestNotification(body))
                                                    sentRequestReject()
                                                    history.push('/Home')
                                                }}
                                            >Từ chối</Button>
                                        </>
                                        : <></>
                                    }
                                </>
                                : <></>
                        }
                        {
                            data?.createRequest === true ?
                                <Button
                                    className="ams-btn-default"
                                    type="primary"
                                    onClick={() => {
                                        sentRequest()
                                    }}
                                >Gửi yêu cầu</Button>
                                : <></>
                        }
                        <Button
                            className="ams-btn-default"
                            danger
                            type="primary"
                            onClick={() => {
                                history.push(data?.redirect ? data?.redirect : '/Home')
                            }}
                        >Quay lại</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <h4>Mã yêu cầu: {Date.parse(ticket?.Response?.Ticket?.CreateDate || Date.now())}</h4>
                        <h4>Người yêu cầu: {userInfoLogin?.UserFullName}</h4>
                        <h4>Bộ phận: {userInfoLogin?.DepartmentName}</h4>
                    </Col>
                    <Col span={8}>
                        <h4>Kho lưu trữ:</h4>
                        <Select
                            options={listWareHouse}
                            disabled={!data?.createRequest}
                            className="select-warehouse"
                            value={warehouseSelected}
                            onChange={e => {
                                setWarehouseSelected(e)
                            }}
                        >
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {data ?
                            <Row>
                                <Col span={12}>
                                    <h4>Diễn giải</h4>
                                    <Input.TextArea
                                        disabled={!data?.createRequest}
                                        placeholder="Diễn giải"
                                        allowClear
                                        value={ticketDescription}
                                        className="text-area input"
                                        onChange={(e) => {
                                            setTicketDescription(e.target.value)
                                        }} />
                                </Col>
                                <Col span={12}>
                                    <h4>Tiến trình duyệt</h4>
                                    <VotingHistory dataSource={ticket?.Response.VotingHistory} />
                                </Col>
                            </Row> :
                            <>
                                <h4>Diễn giải</h4>
                                <Input.TextArea
                                    disabled={!data?.createRequest}
                                    placeholder="Diễn giải"
                                    allowClear
                                    value={ticketDescription}
                                    className="text-area input"
                                    onChange={(e) => {
                                        setTicketDescription(e.target.value)
                                    }} />
                            </>
                        }
                        <h4>Danh sách tài sản</h4>
                        <ListAsset
                            disabled={!data?.createRequest}
                            dataSource={ticket?.Response?.Assets}
                            onChange={(list) => {
                                setListAsset(list)
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Shopping);
