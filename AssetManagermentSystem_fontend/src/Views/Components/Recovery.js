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
import SelectAssetByEmployee from "./SelectAssetByEmployee";
import VotingHistory from "./VotingHistory";

function Recovery(props) {
    const { data, title } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        requestTicket,
        requestNotification,
        setError
    } = amsAction;

    const {
        userName,
        token,
        userInfoLogin,
        warehouseAction,
        ticket
    } = props.amsStore;

    const [listAsset, setListAsset] = useState();
    const [ticketDescription, setTicketDescription] = useState()

    function sentRequest() {
        let AssetDetails = []
        if (!listAsset || listAsset?.length === 0) {
            dispatch(setError({
                Code: "AMS_01",
                Message: "Danh sách tài sản trống"
            }))
            return;
        }

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
                AssetID: element.AssetID,
                Quantity: element.Quantity,
                UsageFor: element.EmployeeID,
                ID: element.UsageID
            })
        });

        if (breakPoint === true) {
            return;
        }

        const body = {
            Token: token,
            Key: "CREATE_TICKET_RECOVERY",
            UserNameRequest: userName,
            Data: {
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
                Key: "GET_TICKET_RECOVERY",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.split('|')[0],
                    RequestType: "RECOVERY"
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function sentRequestApprove() {
        if (data) {
            const body = {
                Token: token,
                Key: "APPROVE_TICKET_RECOVERY",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.split('|')[0],
                    RequestType: "RECOVERY"
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function sentRequestReject() {
        if (data) {
            const body = {
                Token: token,
                Key: "REJECT_TICKET_RECOVERY",
                UserNameRequest: userName,
                Data: {
                    RequestID: data.split('|')[0],
                    RequestType: "RECOVERY"
                }
            }
            dispatch(requestTicket(body))
        }
    }

    function ticketContent() {
        if (ticket) {
            setTicketDescription(ticket?.Response.Ticket?.Description)
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
                            {title}
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
                        {data ?
                            <Row>
                                <Col span={12}>
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
                                </Col>
                                <Col span={12}>
                                    <h4>Tiến trình duyệt</h4>
                                    <VotingHistory dataSource={ticket?.Response.VotingHistory} />
                                </Col>
                            </Row> :
                            <>
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
                            </>
                        }
                        <h4>Danh sách tài sản</h4>
                        <SelectAssetByEmployee
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

export default connect(mapStateToProps)(Recovery);
