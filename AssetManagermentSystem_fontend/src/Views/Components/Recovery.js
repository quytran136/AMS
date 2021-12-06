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

function Recovery(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        requestWarehouse
    } = amsAction;

    const {
        userName,
        token,
        warehouses,
        userInfoLogin
    } = props.amsStore;

    const [listAsset, setListAsset] = useState();
    const [warehouseSelected, setWarehouseSelected] = useState()
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

    function sentRequest() {

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

    useEffect(getWarehouse, [])

    useEffect(readWarehouse, [warehouses?.Response?.StoreIdentifies])

    return (
        <div className="main-content warehouse">
            <Card className="warehouse-body-request">
            <Row className="warehouse-tool">
                    <Col span={16} className="tool-left">
                        <h2>
                            Yêu cầu thu hồi tài sản
                        </h2>
                    </Col>
                    <Col span={8} className="tool-right">
                        <Button
                            className="ams-btn-default"
                            type="primary"
                            onClick={() => {
                                sentRequest()
                            }}
                        >Sent request</Button>
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
                        <Select
                            options={listWareHouse}
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
                            placeholder="Diễn giải"
                            allowClear
                            className="text-area input"
                            onChange={(e) => {
                            }} />
                        <h4>Danh sách tài sản</h4>
                        <ListAsset
                            dataSource={listAsset}
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
