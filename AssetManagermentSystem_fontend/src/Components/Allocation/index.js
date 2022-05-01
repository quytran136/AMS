import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Card, Row, Input, Button } from 'antd';
import {
} from '@ant-design/icons';
import {
    useHistory
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions';
import SelectAsset from "../SelectAsset";
import VotingHistory from "../VotingHistory";

function Allocation(props) {
    const { data, title } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        requestTicket,
        requestNotification,
        setError,
        setMessage
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
            if(element.EmployeeID.length <= 2){
                dispatch(setError({
                    Code: "AMS_01",
                    Message: "chỉ định người nhận thuốc"
                }))
                breakPoint = true
                return;
            }
            AssetDetails.push({
                AssetID: element.AssetID,
                Quantity: element.Quantity,
                UsageFor: element.EmployeeID
            })
        });

        if (breakPoint === true) {
            return;
        }

        const body = {
            Token: token,
            Key: "CREATE_TICKET_ALLOCATION",
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
        if (!data?.createRequest) {
            const body = {
                Token: token,
                Key: "GET_TICKET_ALLOCATION",
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
                Key: "APPROVE_TICKET_ALLOCATION",
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
                Key: "REJECT_TICKET_ALLOCATION",
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
                            </> : <></>
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
                        <SelectAsset
                            disabled={!data?.createRequest}
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
