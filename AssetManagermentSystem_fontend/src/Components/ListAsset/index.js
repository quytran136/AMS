import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Row, Input, InputNumber, Button, Select } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions';

function ListAsset(props) {
    const { disabled, className, dataSource, onChange } = props
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
            AssetFullName: "",
            Description: "",
            QuantityOriginalStock: 0,
            Unit: "",
            Price: 0
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
            if (assetClassifies) {
                let listAS = []
                assetClassifies.Response.AssetClassifies.forEach((element) => {
                    listAS.push({
                        value: element.ID,
                        label: element.AssetClassifyName,
                    })
                })
                setListAssetClassifies(listAS)
            }
            setListAsset(dataSource)
        }
    }

    useEffect(getAssetClassify, [])
    useEffect(readData, [dataSource])

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
                    <Col span={5} className="field">
                        Lớp tài sản
                    </Col>
                    <Col span={5} className="field">
                        Tên tài sản
                    </Col>
                    <Col span={3} className="field">
                        Đơn vị
                    </Col>
                    <Col span={6} className="field">
                        Diễn giải
                    </Col>
                    <Col span={2} className="field">
                        Số lượng
                    </Col>
                    <Col span={2} className="field">
                        Đơn giá
                    </Col>
                    <Col span={1} className="field">

                    </Col>
                </Row>
                <div className="list-edit-asset">
                    {listAsset &&
                        listAsset.map((element, index) => {
                            return (<Row className="item-asset" key={index}>
                                <Col span={5} className="field">
                                    <Select
                                        disabled={disabled}
                                        options={listAssetClassifies}
                                        className="field-asset"
                                        value={element.AssetClassifyID}
                                        onChange={e => {
                                            let item = element
                                            item.AssetClassifyID = e
                                            editItem(item)
                                        }}
                                    >
                                    </Select>
                                </Col>
                                <Col span={5} className="field">
                                    <Input
                                        disabled={disabled}
                                        value={element.AssetFullName}
                                        onChange={(e) => {
                                            let item = element
                                            item.AssetFullName = e.target.value
                                            editItem(item)
                                        }}
                                    />
                                </Col>
                                <Col span={3} className="field">
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
                                        value={element.QuantityOriginalStock}
                                        min="0"
                                        step="1"
                                        onChange={(e) => {
                                            let item = element
                                            item.QuantityOriginalStock = e
                                            editItem(item)
                                        }}
                                        stringMode
                                    />
                                </Col>
                                <Col span={2} className="field">
                                    <InputNumber
                                        disabled={disabled}
                                        className="field-asset"
                                        value={element.Price}
                                        min="0"
                                        step="1"
                                        onChange={(e) => {
                                            let item = element
                                            item.Price = e * 1000
                                            editItem(item)
                                        }}
                                        stringMode
                                    />
                                </Col>
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

export default connect(mapStateToProps)(ListAsset);
