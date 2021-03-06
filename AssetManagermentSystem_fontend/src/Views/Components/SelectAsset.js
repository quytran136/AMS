import React, { useEffect, useState } from "react";
import "../Access/Css/Common.scss";
import "../Access/Css/Asset.scss";
import { Col, Row, Input, InputNumber, Button, Select } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions/action';
import SelectEmployee from "./SelectEmployee";

function SelectAsset(props) {
    const { disabled, className, disabledSelectEmployee, dataSource, onChange } = props
    const dispatch = useDispatch();
    const {
        requestAsset
    } = amsAction;

    const {
        token,
        userName,
        assetClassifies,
    } = props.amsStore;

    const [listAsset, setListAsset] = useState();
    const [listAssetClassifies, setListAssetClassifies] = useState([]);

    function getAssetClassify() {
        const body = {
            Token: token,
            Key: "GET_ASSET_CLASSIFY",
            UserNameRequest: userName,
            Data: {
                AssetClassify: {
                    AssetClassifyName: "",
                }
            }
        }
        dispatch(requestAsset(body))
    }

    function addNew() {
        if (assetClassifies) {
            let listAS = []
            assetClassifies.Response.AssetClassifies.forEach((element) => {
                listAS.push({
                    value: element.Asset_Classify.ID,
                    label: element.Asset_Classify.AssetClassifyName,
                })
            })
            setListAssetClassifies(listAS)
        }

        let list = []
        if (listAsset) {
            listAsset.forEach(element => {
                list.push(element)
            });
        }
        list.push({
            ID: Date.now(),
            AssetClassifyID: "",
            Assets: [],
            AssetID: "",
            Description: "",
            Quantity: 0,
            QuantityInStock: 0,
            Unit: "",
            EmployeeID: ""
        })
        setListAsset(list)
        if (onChange) {
            onChange(list)
        }
    }

    function deleteItem(id) {
        let list = []
        if (listAsset) {
            listAsset.forEach(element => {
                if (element.ID !== id) {
                    list.push(element)
                }
            });
        }
        setListAsset(list)
        if (onChange) {
            onChange(list)
        }
    }

    function editItem(item) {
        let list = []
        if (listAsset) {
            assetClassifies.Response.AssetClassifies.forEach((element) => {
                if (item.AssetClassifyID === element.Asset_Classify.ID) {
                    item.Assets = []
                    element.Asset_Details.forEach(element1 => {
                        item.Assets.push({
                            value: element1.ID,
                            label: element1.AssetFullName,
                        })
                    });
                }
            })
            assetClassifies.Response.AssetClassifies.forEach((element) => {
                if (item.AssetClassifyID === element.Asset_Classify.ID) {
                    element.Asset_Details.forEach(element1 => {
                        if (element1.ID === item.AssetID) {
                            item.QuantityInStock = element1.QuantityInStock
                            item.Unit = element1.Unit
                            item.Description = element1.Description
                        }
                    });
                }
            })
            listAsset.forEach(element => {
                if (element.ID === item.ID) {
                    list.push(item)
                    console.log(item)
                } else {
                    list.push(element)
                }
            });
        }
        setListAsset(list)
        if (onChange) {
            onChange(list)
        }
    }

    function readData() {
        if (dataSource) {
            if (assetClassifies?.Response) {
                let listAS = []
                assetClassifies.Response.AssetClassifies.forEach((element) => {
                    listAS.push({
                        value: element.Asset_Classify.ID,
                        label: element.Asset_Classify.AssetClassifyName,
                    })
                })
                setListAssetClassifies(listAS)
            }

            let list = []
            if (dataSource.UsageList) {
                dataSource.UsageList.forEach(u => {
                    let item = {
                        AssetClassifyID: "",
                        Assets: [],
                        AssetID: "",
                        Description: "",
                        Quantity: 0,
                        QuantityInStock: 0,
                        Unit: "",
                        EmployeeID: ""
                    }
                    if (dataSource.Assets) {
                        dataSource.Assets.forEach(a => {
                            if (u.AssetID === a.ID) {
                                if (assetClassifies) {
                                    assetClassifies.Response.AssetClassifies.forEach((element) => {
                                        if (a.AssetClassifyID === element.Asset_Classify.ID) {
                                            item.Assets = []
                                            element.Asset_Details.forEach(element1 => {
                                                item.Assets.push({
                                                    value: element1.ID,
                                                    label: element1.AssetFullName,
                                                })
                                            });
                                        }
                                    })
                                    item.AssetClassifyID = a.AssetClassifyID
                                    item.AssetID = u.AssetID
                                    item.Description = a.Description
                                    item.Quantity = u.Quantity
                                    item.QuantityInStock = a.QuantityInStock
                                    item.Unit = a.Unit
                                    item.EmployeeID = u.UsageFor
                                }
                            }
                        });
                    }
                    list.push(item)
                });
            }

            setListAsset(list)
        }
    }


    useEffect(getAssetClassify, [])
    useEffect(readData, [assetClassifies, dataSource])

    return (
        <div className={className}>
            <Row className="asset-tool">
                <Col span={8}>
                    <Button
                        disabled={disabled}
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            addNew()
                        }}
                    />
                </Col>
            </Row>
            <div className="list-asset">
                <Row>
                    <Col span={4} className="field">
                        L???p t??i s???n
                    </Col>
                    <Col span={4} className="field">
                        T??n t??i s???n
                    </Col>
                    <Col span={2} className="field">
                        ????n v???
                    </Col>
                    <Col span={6} className="field">
                        Di???n gi???i
                    </Col>
                    <Col span={2} className="field">
                        T???n kho
                    </Col>
                    <Col span={2} className="field">
                        S??? l?????ng
                    </Col>
                    {disabledSelectEmployee === true ? <></> :
                        <Col span={3} className="field">
                            C???p ph??t cho
                        </Col>}
                    <Col span={1} className="field">

                    </Col>
                </Row>
                <div className="list-edit-asset">
                    {listAsset &&
                        listAsset.map((element, index) => {
                            return (<Row className="item-asset" key={index}>
                                <Col span={4} className="field">
                                    <Select
                                        disabled={disabled}
                                        options={listAssetClassifies}
                                        className="field-asset"
                                        value={element.AssetClassifyID}
                                        onChange={e => {
                                            let item = element
                                            item.AssetClassifyID = e
                                            item.AssetID = ""
                                            editItem(item)
                                        }}
                                    >
                                    </Select>
                                </Col>
                                <Col span={4} className="field">
                                    <Select
                                        disabled={disabled}
                                        options={element.Assets}
                                        className="field-asset"
                                        value={element.AssetID}
                                        onChange={e => {
                                            let item = element
                                            item.AssetID = e
                                            editItem(item)
                                        }}
                                    >
                                    </Select>
                                </Col>
                                <Col span={2} className="field">
                                    <Input
                                        disabled={disabled}
                                        value={element.Unit}
                                        onChange={(e) => {
                                            let item = element
                                            item.Unit = e.target.value
                                            editItem(item)
                                        }}
                                    />
                                </Col>
                                <Col span={6} className="field">
                                    <Input
                                        disabled={disabled}
                                        value={element.Description}
                                        onChange={(e) => {
                                            let item = element
                                            item.Description = e.target.value
                                            editItem(item)
                                        }}
                                    />
                                </Col>
                                <Col span={2} className="field">
                                    <InputNumber
                                        disabled={disabled}
                                        className="field-asset"
                                        value={element.QuantityInStock}
                                        stringMode
                                    />
                                </Col>
                                <Col span={2} className="field">
                                    <InputNumber
                                        disabled={disabled}
                                        className="field-asset"
                                        value={element.Quantity}
                                        min="0"
                                        max={element.QuantityInStock}
                                        step="1"
                                        onChange={(e) => {
                                            let item = element
                                            item.Quantity = e
                                            editItem(item)
                                        }}
                                        stringMode
                                    />
                                </Col>
                                {disabledSelectEmployee === true ? <></> :
                                    <Col span={3} className="field">
                                        <SelectEmployee
                                            disabled={disabled}
                                            selected={element?.EmployeeID?.split("|")}
                                            type="Select"
                                            onSelected={(selectedRows) => {
                                                let item = element
                                                item.EmployeeID = selectedRows[0].ID
                                                editItem(item)
                                            }}
                                        />
                                    </Col>}
                                <Col span={1} className="field">
                                    <Button
                                        disabled={disabled}
                                        type="primary"
                                        danger
                                        shape="circle"
                                        icon={<DeleteOutlined />}
                                        onClick={() => {
                                            deleteItem(element.ID)
                                        }}
                                    />
                                </Col>
                            </Row>)
                        })}
                </div>
            </div>
        </div >
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(SelectAsset);
