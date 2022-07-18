import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Row, Input, InputNumber, Button, Select, Modal } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../../ReduxSaga/Actions';
import SelectEmployee from "../SelectEmployee";

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
            if (dataSource.Assets) {
                dataSource.Assets.forEach(ass => {
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
                    if (assetClassifies) {
                        assetClassifies.Response.AssetClassifies.forEach((element) => {
                            if (ass.AssetClassifyID === element.Asset_Classify.ID) {
                                item.Assets = []
                                element.Asset_Details.forEach(element1 => {
                                    item.Assets.push({
                                        value: element1.ID,
                                        label: element1.AssetFullName,
                                    })
                                });
                            }
                        })
                        item.AssetClassifyID = ass.AssetClassifyID
                        item.AssetID = ass.ID
                        item.Description = ass.Description
                        item.Quantity = ass.QuantityUsed
                        item.QuantityInStock = ass.QuantityInStock
                        item.Unit = ass.Unit
                        item.EmployeeID = ass.UsageFor
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
                        Danh mục
                    </Col>
                    <Col span={4} className="field">
                        Tên sản phẩm
                    </Col>
                    <Col span={2} className="field">
                        Đơn vị
                    </Col>
                    <Col span={6} className="field">
                        Diễn giải
                    </Col>
                    <Col span={2} className="field">
                        Tồn kho
                    </Col>
                    <Col span={2} className="field">
                        Số lượng
                    </Col>
                    {disabledSelectEmployee === true ? <></> :
                        <Col span={3} className="field">
                            Cấp phát cho
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
                                            selected={element?.EmployeeID?.split("|") || ""}
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
