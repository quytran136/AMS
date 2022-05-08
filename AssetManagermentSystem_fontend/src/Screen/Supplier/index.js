import React, { useEffect, useState } from "react";
import "../../Access/Css/Common.scss";
import "./style.scss";
import { Col, Row, Card, Input, Modal, Button, Upload } from 'antd';
import {
  HomeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions';

function Supplier(props) {

  const { ShowOnly } = props;

  const dispatch = useDispatch();
  const {
    requestSupplier,
  } = amsAction;

  const {
    userName,
    token,
    supplier
  } = props.amsStore;

  const [showUpdate, setShowUpdate] = useState()
  const [supplierName, setSupplierName] = useState()
  const [supplierEmail, setSupplierEmail] = useState()
  const [supplierPhone, setSupplierPhone] = useState()
  const [isDelete, setIsDelete] = useState(false)
  const [files, setFiles] = useState([]);
  const [id, setID] = useState();

  function onInit() {
    setSupplierName("");
    setSupplierEmail("");
    setSupplierPhone("");
    setIsDelete(false)
  }

  function getListSupplier(value) {
    if (value) {
      const body = {
        Token: token,
        Key: "GET_SUPPLIER",
        UserNameRequest: userName,
        Data: {
          Supplier: {
            Name: value,
          }
        }
      }
      dispatch(requestSupplier(body))
    } else {
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
  }

  useEffect(getListSupplier, [])

  function onUpdate() {
    const body = {
      Token: token,
      Key: "UPDATE_SUPPLIER",
      UserNameRequest: userName,
      Data: {
        Supplier: {
          ID: id,
          Name: supplierName,
          Email: supplierEmail,
          Phone: supplierPhone,
          Image: files[0].thumbUrl,
          IsDelete: isDelete
        }
      }
    }
    dispatch(requestSupplier(body))
    setTimeout(() => {
      getListSupplier()
    }, 300);
    setShowUpdate(false)
  }

  function onDelete(value) {
    const body = {
      Token: token,
      Key: "UPDATE_SUPPLIER",
      UserNameRequest: userName,
      Data: {
        Supplier: {
          ID: value,
          IsDelete: true
        }
      }
    }
    dispatch(requestSupplier(body))
    setTimeout(() => {
      getListSupplier()
    }, 300);
  }

  return (
    ShowOnly ? <>
      <h4>Danh sách nhà cung cấp</h4>
      {supplier?.Response?.Suppliers &&
        supplier?.Response?.Suppliers.map((element) => {
          return (<div key={element.ID} className="supplier-read-only">
            <img alt="avata" className="image" id={element.ID} src={element.Image} />
            <h5>
              {element.Name}
            </h5>
          </div>)
        })}
    </> :
      <>
        <div className="main-content">
          <Card className="supplier">
            <div className="employee-header">
              <h3>Danh sách nhà cung cấp</h3>
            </div>
            <Row className="supplier-tool">
              <Col span={8} className="tool-left">
                <Input.Group>
                  <Input.Search
                    placeholder="Search..."
                    onSearch={(e) => getListSupplier(e)}
                    onChange={(e) => getListSupplier(e.target.value)}
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
                  Thêm mới
                </Button>
              </Col>
            </Row>
            <Row className="supplier-body">
              <Col span={24}>
                {supplier?.Response?.Suppliers &&
                  supplier?.Response?.Suppliers.map((element) => {
                    return (<Card
                      className="ams-card-item"
                      key={element.ID}
                      extra={<span>
                        <Button
                          className="ams-btn"
                          type="primary"
                          shape="circle"
                          icon={<EditOutlined />}
                          onClick={() => {
                            setID(element.ID)
                            setFiles([{
                              uid: element.ID,
                              name: 'avata.png',
                              status: 'done',
                              thumbUrl: element.Image
                            }])
                            setSupplierName(element.Name)
                            setSupplierEmail(element.Email)
                            setSupplierPhone(element.Phone)
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
                      title={<img alt="avata" className="image" id={element.ID} src={element.Image} />}
                      bordered={true}>
                      <div>
                        Tên đơn vị: <h3>{element.Name}</h3>
                      </div>
                      <div>
                        Số điện thoại: <h3>{element.Phone}</h3>
                      </div>
                      <div>
                        Email: <h3>{element.Email}</h3>
                      </div>
                    </Card>)
                  })}
              </Col>
            </Row>
          </Card>
          <Modal
            title="Đơn vị cung ứng"
            centered
            visible={showUpdate}
            onOk={onUpdate}
            onCancel={() => {
              setShowUpdate(false)
              getListSupplier()
            }}
          >
            <Row>
              <Col span={6}>
                <Upload
                  listType="picture-card"
                  fileList={files || []}
                  onChange={({ fileList }) => {
                    if (fileList) {
                      fileList.forEach(element => {
                        element.status = "done"
                      });
                      setFiles(fileList)
                    }
                  }}
                >
                  {files.length >= 1 ? null : <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>}
                </Upload>
              </Col>
              <Col span={18}>
                <Input placeholder="supplier name..."
                  className="input"
                  prefix={<HomeOutlined />}
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)} />
                <Input placeholder="supplier phone..."
                  className="input"
                  prefix={<PhoneOutlined />}
                  value={supplierPhone}
                  onChange={(e) => setSupplierPhone(e.target.value)} />
                <Input placeholder="supplier email..."
                  className="input"
                  prefix={<MailOutlined />}
                  value={supplierEmail}
                  onChange={(e) => setSupplierEmail(e.target.value)} />
              </Col>
            </Row>
          </Modal>
        </div >
      </>
  );
}

function mapStateToProps(state) {
  return {
    amsStore: state.amsReducer,
  };
}

export default connect(mapStateToProps)(Supplier);
