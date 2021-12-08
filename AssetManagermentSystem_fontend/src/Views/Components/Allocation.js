import React, { useEffect, useState } from "react";
import "../Access/Css/Common.scss";
import "../Access/Css/Warehouse.scss";
import { Col, Card, Row, Input, Button } from 'antd';
import {
} from '@ant-design/icons';
import {
    useHistory
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions/action';
import SelectAsset from "./SelectAsset";

function Allocation(props) {
    const { data } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        requestTicket,
        requestNotification
    } = amsAction;

    const {
        userName,
        token,
        userInfoLogin,
        warehouseAction,
        ticket
    } = props.amsStore;

    const [listAsset, setListAsset] = useState();
    const [warehouseSelected, setWarehouseSelected] = useState()
    const [ticketDescription, setTicketDescription] = useState()

    function sentRequest() {
        let AssetDetails = []
        listAsset.forEach(element => {
            AssetDetails.push({
                AssetID: element.AssetID,
                Quantity: element.Quantity,
                UsageFor: element.EmployeeID
            })
        });

        const body = {
            Token: token,
            Key: "CREATE_TICKET_ALLOCATION",
            UserNameRequest: userName,
            Data: {
                StoreID: warehouseSelected,
                Description: ticketDescription,
                ProcessID: warehouseAction.ProcessID,
                UsageAssetList: AssetDetails
            }
        }
        dispatch(requestTicket(body))
        history.push('/Home')
    }

    function readRequest() {
        if (data) {
            const body = {
                Token: token,
                Key: "GET_TICKET_ALLOCATION",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.split('|')[0],
                    RequestType: "ALLOCATION"
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function sentRequestApprove() {
        if (data) {
            const body = {
                Token: token,
                Key: "APPROVE_TICKET_ALLOCATION",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.split('|')[0],
                    RequestType: "ALLOCATION"
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function sentRequestReject() {
        if (data) {
            const body = {
                Token: token,
                Key: "REJECT_TICKET_ALLOCATION",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.split('|')[0],
                    RequestType: "ALLOCATION"
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function ticketContent() {
        if (ticket) {
            setTicketDescription(ticket?.Response.Ticket?.Description)
            console.log(ticket?.Response.Ticket?.Description)
        }
    }

    useEffect(readRequest, [data])

    useEffect(ticketContent, [ticket])

    return (
        <div className="main-content warehouse">
            <Card className="warehouse-body-request">
                <Row className="warehouse-tool">
                    <Col span={16} className="tool-left">
                        <h2>
                            Yêu cầu cấp phát tài sản
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
                        <h4>Người request: {ticket?.Response.Ticket?.RequestBy || userInfoLogin?.UserFullName}</h4>
                        <h4>Bộ phận: {userInfoLogin?.DepartmentName}</h4>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <h4>Diễn giải</h4>
                        <Input.TextArea
                            disabled={data ? true : false}
                            placeholder="Diễn giải"
                            allowClear
                            value={ticketDescription}
                            className="text-area input"
                            onChange={(e) => {
                                setTicketDescription(e.target.value)
                            }} />
                        <h4>Danh sách tài sản</h4>
                        <SelectAsset
                            disabled={data ? true : false}
                            dataSource={ticket?.Response}
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

export default connect(mapStateToProps)(Allocation);
