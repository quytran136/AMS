import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Row, Input, InputNumber, Button, Select, Table } from 'antd';
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
        requestAsset,
        requestSupplier
    } = amsAction;

    const {
        token,
        userName,
        assetClassifies,
        supplier
    } = props.amsStore;

    const [listAsset, setListAsset] = useState();
    const [listAssetClassifies, setListAssetClassifies] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'AssetFullName',
            key: 'AssetFullName',
        },
        {
            title: 'Đơn vị tính',
            dataIndex: 'Unit',
            key: 'Unit',
        },
        {
            title: 'Số lượng',
            dataIndex: 'QuantityOriginalStock',
            key: 'QuantityOriginalStock',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'Price',
            key: 'Price',
            render: (text, record, index) => {
                return (record.Price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'VND',
                }))
            }
        }
    ]

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
        getSupplier()
    }

    function getSupplier() {
        const body = {
            Token: token,
            Key: "GET_SUPPLIER",
            UserNameRequest: userName,
            Data: {
                Supplier: {
                    Name: "",
                }
            }
        }
        dispatch(requestSupplier(body))
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
            Price: 0,
            SupplierID: ""
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
                        value: element.Asset_Classify.ID,
                        label: element.Asset_Classify.AssetClassifyName,
                    })
                })
                setListAssetClassifies(listAS)
            }
            dataSource.forEach(element => {
                element.key = element.ID
            })
            setListAsset(dataSource)
        }
    }

    function convertDataToSelect() {
        if (supplier && supplier.Response && supplier.Response.Suppliers) {
            var list = []
            supplier.Response.Suppliers.forEach((element) => {
                list.push({
                    label: element.Name,
                    value: element.ID
                })
            })
            setSuppliers(list)
        }
    }

    function countMoney(listAsset1) {
        if (listAsset1) {
            var count = 0
            listAsset1.forEach((element) => {
                count += element.Price * element.QuantityOriginalStock
            })

            return count
        }
    }

    useEffect(getAssetClassify, [])
    useEffect(convertDataToSelect, [supplier])
    useEffect(readData, [dataSource])

    return (
        <div className={className}>
            <Row className="asset-tool">
                <Col span={8}>
                    {!props.viewOnly ?
                        <Button
                            disabled={disabled}
                            type="primary"
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                addNew()
                            }}
                        />
                        : <></>}
                </Col>
            </Row>
            {!props.viewOnly ?
                <div className="list-asset">
                    <Row>
                        <Col span={5} className="field">
                            Tên danh mục
                        </Col>
                        <Col span={5} className="field">
                            Tên thuốc
                        </Col>
                        <Col span={1} className="field">
                            Đơn vị tính
                        </Col>
                        <Col span={2} className="field">
                            Đơn vị cung cấp
                        </Col>
                        <Col span={3} className="field">
                            Diễn giải
                        </Col>
                        <Col span={2} className="field">
                            Số lượng
                        </Col>
                        <Col span={5} className="field">
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
                                    <Col span={1} className="field">
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
                                    <Col span={2} className="field">
                                        <Select
                                            disabled={disabled}
                                            options={suppliers}
                                            className="field-asset"
                                            value={element.SupplierID}
                                            onChange={e => {
                                                let item = element
                                                item.SupplierID = e
                                                editItem(item)
                                            }}
                                        >
                                        </Select>
                                    </Col>
                                    <Col span={3} className="field">
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
                                    <Col span={5} className="field">
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
                : <div>
                    <Table
                        scroll={listAsset ? {
                            y: '60vh',
                        } : {}}
                        dataSource={listAsset ? listAsset : []}
                        columns={columns}
                        pagination={20} />
                    <Row className="total">
                        <Col span={16}>
                            Thành tiền
                        </Col>
                        <Col span={8}>
                            {(countMoney(listAsset))?.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Col>
                    </Row>
                </div>}
        </div >
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ListAsset);
