import React, { useEffect, useState } from "react";
import "../Access/Css/Common.scss";
import "../Access/Css/Warehouse.scss";
import { Col, Card, Row, Select, Input, Button } from 'antd';
import {
} from '@ant-design/icons';
import {
    useHistory
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions/action';
import ListAsset from "./ListAsset";

function Shopping(props) {
    const { data } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        requestWarehouse,
        requestTicket,
        setError,
        requestNotification
    } = amsAction;

    const {
        userName,
        token,
        warehouses,
        userInfoLogin,
        warehouseAction,
        ticket
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
            listAsset.forEach(element => {
                AssetDetails.push({
                    StoreID: warehouseSelected,
                    AssetClassifyID: element.AssetClassifyID,
                    AssetFullName: element.AssetFullName,
                    QuantityOriginalStock: element.QuantityOriginalStock,
                    Unit: element.Unit,
                    Description: element.Description,
                    Price: element.Price
                })
            });

            const body = {
                Token: token,
                Key: "CREATE_TICKET_SHOPPING",
                UserNameRequest: userName,
                Data: {
                    StoreID: warehouseSelected,
                    Description: ticketDescription,
                    ProcessID: warehouseAction.ProcessID,
                    AssetDetails: AssetDetails
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
        if (data) {
            const body = {
                Token: token,
                Key: "GET_TICKET_SHOPPING",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.split('|')[0],
                    RequestType: "SHOPPING"
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function sentRequestApprove() {
        if (data) {
            const body = {
                Token: token,
                Key: "APPROVE_TICKET_SHOPPING",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.split('|')[0],
                    RequestType: "SHOPPING"
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function sentRequestReject() {
        if (data) {
            const body = {
                Token: token,
                Key: "REJECT_TICKET_SHOPPING",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.split('|')[0],
                    RequestType: "SHOPPING"
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function ticketContent() {
        if (ticket) {
            setWarehouseSelected(ticket.Response.Ticket.StoreID)
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
                            Yêu cầu mua sắm
                        </h2>
                    </Col>
                    <Col span={8} className="tool-right">
                        {
                            data ?
                                <>
                                    <Button
                                        className="ams-btn-default"
                                        type="primary"
                                        onClick={() => {
                                            const body = {
                                                Token: token,
                                                Key: "READED_NOTIFICATION",
                                                UserNameRequest: userName,
                                                Data: data.split('|')[1]
                                            }
                                            dispatch(requestNotification(body))
                                            sentRequestApprove()
                                            history.push('/Home')
                                        }}
                                    >Approve</Button>
                                    <Button
                                        className="ams-btn-default"
                                        type="primary"
                                        danger
                                        onClick={() => {
                                            const body = {
                                                Token: token,
                                                Key: "READED_NOTIFICATION",
                                                UserNameRequest: userName,
                                                Data: data.split('|')[1]
                                            }
                                            dispatch(requestNotification(body))
                                            sentRequestReject()
                                            history.push('/Home')
                                        }}
                                    >Reject</Button>
                                </>
                                :
                                <Button
                                    className="ams-btn-default"
                                    type="primary"
                                    onClick={() => {
                                        sentRequest()
                                        history.push('/Home')
                                    }}
                                >Sent request</Button>
                        }
                        <Button
                            className="ams-btn-default"
                            danger
                            type="primary"
                            onClick={() => {
                                history.push('/Home')
                            }}
                        >Cancel</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <h4>Người request: {userInfoLogin?.UserFullName}</h4>
                        <h4>Bộ phận: {userInfoLogin?.DepartmentName}</h4>
                    </Col>
                    <Col span={8}>
                        <h4>Kho lưu trữ:</h4>
                        <Select
                            options={listWareHouse}
                            disabled={data ? true : false}
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
                        <h4>Diễn giải</h4>
                        <Input.TextArea
                            disabled={data ? true : false}
                            placeholder="Diễn giải"
                            allowClear
                            className="text-area input"
                            onChange={(e) => {
                                setTicketDescription(e.target.value)
                            }} />
                        <h4>Danh sách tài sản</h4>
                        <ListAsset
                            disabled={data ? true : false}
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
