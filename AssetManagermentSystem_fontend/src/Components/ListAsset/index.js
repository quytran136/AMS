import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Row, Input, InputNumber, Button, Select, Table, Modal, DatePicker } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions';
import moment from 'moment';

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
    const [dataSelected, setDataSelected] = useState();
    const [showModalUpdate, setShowModalUpdate] = useState(false);

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
        },
        {
            title: 'Hành động',
            dataIndex: 'Price',
            key: 'Price',
            render: (text, record, index) => {
                return (
                    props.disabled ?
                        <Button
                            warning
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setDataSelected(record)
                                setShowModalUpdate(true)
                            }}
                        /> :
                        <div>
                            <Button
                                disabled={disabled}
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    deleteItem(record.ID)
                                }}
                            />
                            <Button
                                disabled={disabled}
                                type="primary"
                                shape="circle"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setDataSelected(record)
                                    setShowModalUpdate(true)
                                }}
                            />

                        </div>
                )
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
        setDataSelected({
            ID: Date.now(),
            AssetClassifyID: "",
            AssetFullName: "",
            Description: "",
            QuantityOriginalStock: 0,
            Unit: "",
            Price: 0,
            SupplierID: "",
            ExpirationDate: new Date().toISOString()
        })
        setShowModalUpdate(true)
    }

    function saveListAsset(data) {
        let list = []
        if (listAsset) {
            listAsset.forEach(element => {
                list.push(element)
            });
        }
        if (!listAsset.includes(data)) {
            list.push({
                ID: Date.now(),
                AssetClassifyID: data.AssetClassifyID,
                AssetFullName: data.AssetFullName,
                Description: data.Description,
                QuantityOriginalStock: data.QuantityOriginalStock,
                Unit: data.Unit,
                Price: data.Price,
                SupplierID: data.SupplierID,
                ExpirationDate: data.ExpirationDate
            })
        }
        setListAsset(list)
        if (onChange) {
            onChange(list)
        }
        setDataSelected()
        setShowModalUpdate(false)
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

    function onclose() {
        setDataSelected();
        setShowModalUpdate(false)
    }

    useEffect(getAssetClassify, [])
    useEffect(convertDataToSelect, [supplier])
    useEffect(readData, [dataSource])

    return (
        <div className={className}>
            <Row className="asset-tool">
                <Col span={8}>
                    {!props.disabled ?
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
            <div>
                <Table
                    scroll={listAsset ? {
                        y: '60vh',
                    } : {}}
                    dataSource={listAsset ? listAsset : []}
                    columns={columns}
                    pagination={20} />
                {/* <Row className="total">
                    <Col span={16}>
                        Thành tiền
                    </Col>
                    <Col span={8}>
                        {(countMoney(listAsset))?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </Col>
                </Row> */}
            </div>
            <Modal
                title={dataSelected?.AssetClassifyID ? "Thông tin" : "Thêm mới"}
                centered
                visible={showModalUpdate}
                onOk={() => saveListAsset(dataSelected)}
                onCancel={() => onclose()}>
                <h4>Loại thuốc</h4>
                <Select
                    className="input"
                    disabled={disabled}
                    options={listAssetClassifies}
                    value={dataSelected?.AssetClassifyID}
                    onChange={e => {
                        let item = dataSelected
                        item.AssetClassifyID = e
                        editItem(item)
                    }}
                >
                </Select>
                <br />
                <h4>Tên Thuốc</h4>
                <Input
                    className="input"
                    disabled={disabled}
                    value={dataSelected?.AssetFullName}
                    onChange={(e) => {
                        let item = dataSelected
                        item.AssetFullName = e.target.value
                        editItem(item)
                    }}
                />
                <br />
                <h4>Ngày hết hạn</h4>
                <DatePicker
                    disabled={disabled}
                    size="default"
                    className="select"
                    format="YYYY/MM/DD"
                    defaultPickerValue={moment(dataSelected?.ExpirationDate, "YYYY/MM/DD")}
                    value={moment(dataSelected?.ExpirationDate, "YYYY/MM/DD")}
                    onChange={(e) => {
                        let item = dataSelected
                        item.ExpirationDate = e
                        editItem(item)
                    }}
                />
                <br />
                <h4>Đơn vị tính</h4>
                <Input
                    className="input"
                    disabled={disabled}
                    value={dataSelected?.Unit}
                    onChange={(e) => {
                        let item = dataSelected
                        item.Unit = e.target.value
                        editItem(item)
                    }}
                />
                <br />
                <h4>Đơn vị cung cấp</h4>
                <Select
                    className="input"
                    disabled={disabled}
                    options={suppliers}
                    value={dataSelected?.SupplierID}
                    onChange={e => {
                        let item = dataSelected
                        item.SupplierID = e
                        editItem(item)
                    }}
                >
                </Select>
                <br />
                <h4>Diễn giải</h4>
                <Input
                    className="input"
                    disabled={disabled}
                    value={dataSelected?.Description}
                    onChange={(e) => {
                        let item = dataSelected
                        item.Description = e.target.value
                        editItem(item)
                    }}
                />
                <br />
                <h4>Số lượng</h4>
                <InputNumber
                    className="input"
                    disabled={disabled}
                    value={dataSelected?.QuantityOriginalStock}
                    min="0"
                    step="1"
                    onChange={(e) => {
                        let item = dataSelected
                        item.QuantityOriginalStock = e
                        editItem(item)
                    }}
                    stringMode
                />
                <br />
                <h4>Đơn giá (VNĐ)</h4>
                <InputNumber
                    className="input"
                    disabled={disabled}
                    value={dataSelected?.Price}
                    min="0"
                    step="1"
                    onChange={(e) => {
                        let item = dataSelected
                        item.Price = e * 1000
                        editItem(item)
                    }}
                    stringMode
                />
            </Modal>
        </div >
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(ListAsset);
