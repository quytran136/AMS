import React, { useEffect, useState } from "react";
import "./Access/Css/Common.scss";
import "./Access/Css/Warehouse.scss";
import { Col, Row, Card, Input, Modal, Button } from 'antd';
import {
  HomeOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../ReduxSaga/Actions/action';
import SelectEmployee from "./Components/SelectEmployee";

function Warehousing(props) {

  const dispatch = useDispatch();
  const {
    requestWarehouse
  } = amsAction;

  const {
    userName,
    token,
    warehouses
  } = props.amsStore;

  const [showUpdate, setShowUpdate] = useState()
  const [warehouseFullName, setWarehouseFullName] = useState()
  const [owner, setOwner] = useState()
  const [isDelete, setIsDelete] = useState(false)
  const [id, setID] = useState()

  function onInit() {
    setWarehouseFullName("");
    setOwner("");
    setIsDelete(false)
    setID("");
  }

  function getListWarehouse(value) {
    if (value) {
      const body = {
        Token: token,
        Key: "GET_WAREHOUSE",
        UserNameRequest: userName,
        Data: {
          StoreIdentifie: {
            StoreName: value,
          }
        }
      }
      dispatch(requestWarehouse(body))
    } else {
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
  }

  useEffect(getListWarehouse, [])

  function onUpdate() {
    const body = {
      Token: token,
      Key: "UPDATE_WAREHOUSE",
      UserNameRequest: userName,
      Data: {
        StoreIdentifie: {
          ID: id,
          StoreName: warehouseFullName,
          Owner: owner,
          IsDelete: isDelete
        }
      }
    }
    dispatch(requestWarehouse(body))
    setTimeout(() => {
      getListWarehouse()
    }, 300);
    setShowUpdate(false)
  }

  function onDelete(value) {
    const body = {
      Token: token,
      Key: "UPDATE_WAREHOUSE",
      UserNameRequest: userName,
      Data: {
        StoreIdentifie: {
          ID: value,
          IsDelete: true
        }
      }
    }
    dispatch(requestWarehouse(body))
    setTimeout(() => {
      getListWarehouse()
    }, 300);
  }

  return (
    <div className="main-content">
      <Card className="warehouse">
        <div className="employee-header">
          <h3>Danh sách kho vật tư</h3>
        </div>
        <Row className="warehouse-tool">
          <Col span={8} className="tool-left">
            <Input.Group>
              <Input.Search
                placeholder="Search..."
                onPressEnter={(e) => getListWarehouse(e)}
                onSearch={(e) => getListWarehouse(e)}
                onChange={(e) => getListWarehouse(e.target.value)}
              />
            </Input.Group >
          </Col>
          <Col span={16} className="tool-right">
            <Button
              type="primary"
              onClick={() => {
                onInit()
                setShowUpdate(true)
              }}>
              Add new
            </Button>
          </Col>
        </Row>
        <Row className="warehouse-body">
          <Col span={24}>
            {warehouses?.Response?.StoreIdentifies &&
              warehouses?.Response?.StoreIdentifies.map((element) => {
                return (<Card
                  className="ams-card-item"
                  key={element.ID}
                  extra={<span>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => {
                        setID(element.ID)
                        setOwner(element.Owner)
                        setWarehouseFullName(element.StoreName)
                        setShowUpdate(true)
                      }}
                    />
                    <Button
                      danger
                      type="primary"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        onDelete(element.ID)
                      }}
                    /></span>}
                  title={element.StoreName}
                  bordered={true}>
                </Card>)
              })}
          </Col>
        </Row>
      </Card>
      <Modal
        title="Kho"
        centered
        visible={showUpdate}
        onOk={onUpdate}
        onCancel={() => {
          setShowUpdate(false)
          getListWarehouse()
        }}
      >
        <Input placeholder="warehouse name..."
          prefix={<HomeOutlined />}
          value={warehouseFullName}
          onChange={(e) => setWarehouseFullName(e.target.value)} />
        <SelectEmployee
          title="Quản kho"
          selected={owner?.split("|")}
          onSelected={(selectedRows) => {
            var listApprover = ""
            selectedRows.forEach((element) => listApprover += element.ID + "|")
            setOwner(listApprover)
          }}
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

export default connect(mapStateToProps)(Warehousing);
