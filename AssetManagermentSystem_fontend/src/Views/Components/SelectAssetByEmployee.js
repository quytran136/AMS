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

function SelectAssetByEmployee(props) {
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

    const [listAsset, setListAsset] = useState([]);

    function getAssetAllocation(employeeID) {
        const body = {
            Token: token,
            Key: "GET_ASSET_ALLOCATION",
            UserNameRequest: userName,
            Data: {
                UsageFor: employeeID
            }
        }
        dispatch(requestAsset(body))
    }

    function addNew() {
        let list = []
        if (listAsset) {
            listAsset.forEach(element => {
                list.push(element)
            });
        }
        list.push({
            ID: Date.now(),
            Assets: [],
            AssetID: "",
            Description: "",
            QuantityInStock: 0,
            Unit: "",
            EmployeeID: "",
            CreateDate: "",
            UsageID: "",
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
                    item.Assets.forEach(e => {
                        if (item.AssetID === e.value) {
                            item.Unit = e.unit
                            item.QuantityInStock = e.quantityused
                            item.Description = e.description
                            item.CreateDate = e.createdate
                            item.UsageID = e.usageid
                        }
                    });
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
            var list = []
            dataSource.UsageList.forEach(element => {
                let item = {
                    ID: Date.now(),
                    Assets: [],
                    AssetID: element.AssetID,
                    Description: "",
                    QuantityInStock: element.Quantity,
                    Unit: "",
                    EmployeeID: element.UsageFor,
                    CreateDate: element.CreateDate,
                    UsageID: element.ID,
                }
                dataSource.Assets.forEach(element1 => {
                    if (element1.ID === element.AssetID) {
                        item.Unit = element1.Unit
                        item.Description = element1.Description
                        item.Assets = []
                        item.Assets.push({
                            value: element1.ID,
                            label: element1.AssetFullName,
                        })
                    }
                });

                list.push(item)
            });
            setListAsset(list)
        } else {
            if (assetClassifies && listAsset) {
                let list = []
                listAsset.forEach(element => {
                    if (element.EmployeeID === assetClassifies.Response.UsageFor) {
                        let item = element
                        item.Assets = []
                        assetClassifies.Response.AssetClassifies.forEach(e => {
                            item.Assets.push({
                                value: e.Asset_Detail.ID,
                                label: e.Asset_Detail.AssetFullName,
                                unit: e.Asset_Detail.Unit,
                                quantityused: e.Asset_Detail.QuantityUsed,
                                description: e.Asset_Detail.Description,
                                usageid: e.Usage_History.ID,
                                createdate: e.Usage_History.CreateDate
                            })
                        });
                        list.push(item)
                    } else {
                        list.push(element)
                    }
                });
                setListAsset(list)
            }
        }

    }

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
                    <Col span={5} className="field">
                        Nhân viên
                    </Col>
                    <Col span={5} className="field">
                        Tên tài sản
                    </Col>
                    <Col span={2} className="field">
                        Đơn vị
                    </Col>
                    <Col span={5} className="field">
                        Diễn giải
                    </Col>
                    <Col span={3} className="field">
                        Thời điểm cấp phát
                    </Col>
                    <Col span={2} className="field">
                        Số lượng
                    </Col>
                    <Col span={2} className="field">

                    </Col>
                </Row>
                <div className="list-edit-asset">
                    {listAsset &&
                        listAsset.map((element, index) => {
                            return (<Row className="item-asset" key={index}>
                                <Col span={5} className="field">
                                    <SelectEmployee
                                        disabled={disabled}
                                        selected={element?.EmployeeID?.split("|")}
                                        type="Select"
                                        onSelected={(selectedRow) => {
                                            getAssetAllocation(selectedRow[0].ID)
                                            let item = element
                                            item.EmployeeID = selectedRow[0].ID
                                            editItem(item)
                                        }}
                                    />
                                </Col>
                                <Col span={5} className="field">
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
                                <Col span={5} className="field">
                                    <Input
                                        disabled={disabled}
                                        value={element.Description}
                                    />
                                </Col>
                                <Col span={3} className="field">
                                    <Input
                                        disabled={disabled}
                                        value={element.CreateDate}
                                    />
                                </Col>
                                <Col span={2} className="field">
                                    <InputNumber
                                        disabled={disabled}
                                        className="field-asset"
                                        value={element.QuantityInStock}
                                        min={element.QuantityInStock}
                                        max={element.QuantityInStock}
                                        step="1"
                                        stringMode
                                    />
                                </Col>
                                <Col span={2} className="field">
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

export default connect(mapStateToProps)(SelectAssetByEmployee);
