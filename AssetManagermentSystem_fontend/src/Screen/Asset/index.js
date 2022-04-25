import React, { useEffect, useState } from "react";
import "../../Access/Css/Common.scss";
import "./style.scss";
import { Col, Row, Card, Input, Modal, Button, Table } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  GoldOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../../ReduxSaga/Actions';

function Asset(props) {

  const dispatch = useDispatch();
  const {
    requestAsset
  } = amsAction;

  const {
    userName,
    token,
    assetClassifies,
    assetList
  } = props.amsStore;

  const [showUpdate, setShowUpdate] = useState()
  const [showDetail, setShowDetail] = useState()
  const [assetClassify, setAssetClassify] = useState()
  const [isDelete, setIsDelete] = useState(false)
  const [id, setID] = useState()
  const [tableHeader, setTableHeader] = useState([])

  function onInit() {
    setAssetClassify("");
    setIsDelete(false)
    setID("");
  }

  function getListAssetClassify(value) {
    if (value) {
      const body = {
        Token: token,
        Key: "GET_ASSET_CLASSIFY",
        UserNameRequest: userName,
        Data: {
          AssetClassify: {
            AssetClassifyName: value,
          }
        }
      }
      dispatch(requestAsset(body))
    } else {
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
  }

  function getListAsset(AssetClassify) {
    const body = {
      Token: token,
      Key: "GET_ASSET",
      UserNameRequest: userName,
      Data: {
        AssetClassify: {
          ID: AssetClassify,
        }
      }
    }
    dispatch(requestAsset(body))
  }

  function readAssetList() {
    var arr = []
    if (assetList?.Response?.AssetDetails) {
      var properties = Object.getOwnPropertyNames(assetList?.Response?.AssetDetails[0])
      properties.forEach(element => {
        if (assetList?.Response?.AssetDetails[0][element]) {
          arr.push({
            title: element,
            dataIndex: element,
            key: element,
          })
        }
      });
    }
    setTableHeader(arr)
  }

  useEffect(readAssetList, [assetList])

  useEffect(getListAssetClassify, [])

  function onUpdate() {
    const body = {
      Token: token,
      Key: "UPDATE_ASSET_CLASSIFY",
      UserNameRequest: userName,
      Data: {
        AssetClassify: {
          ID: id,
          AssetClassifyName: assetClassify,
          IsDelete: isDelete
        }
      }
    }
    dispatch(requestAsset(body))
    setTimeout(() => {
      getListAssetClassify()
    }, 300);
    setShowUpdate(false)
  }

  function onDelete(value) {
    const body = {
      Token: token,
      Key: "UPDATE_ASSET_CLASSIFY",
      UserNameRequest: userName,
      Data: {
        AssetClassify: {
          ID: value,
          IsDelete: true
        }
      }
    }
    dispatch(requestAsset(body))
    setTimeout(() => {
      getListAssetClassify()
    }, 300);
  }

  return (
    <div className="main-content">
      <Card className="warehouse">
        <div className="employee-header">
          <h3>Danh mục thuốc</h3>
        </div>
        <Row className="warehouse-tool">
          <Col span={8} className="tool-left">
            <Input.Group>
              <Input.Search
                placeholder="Search..."
                onPressEnter={(e) => getListAssetClassify(e)}
                onSearch={(e) => getListAssetClassify(e)}
                onChange={(e) => getListAssetClassify(e.target.value)}
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
        <Row className="warehouse-body">
          <Col span={24}>
            {assetClassifies?.Response?.AssetClassifies &&
              assetClassifies?.Response?.AssetClassifies.map((element) => {
                return (<Card
                  className="ams-card-item"
                  key={element.Asset_Classify.ID}
                  extra={<span>
                    <Button
                      type="primary"
                      shape="circle"
                      className="ams-btn"
                      icon={<EditOutlined />}
                      onClick={() => {
                        setID(element.Asset_Classify.ID)
                        setAssetClassify(element.Asset_Classify.AssetClassifyName)
                        setShowUpdate(true)
                      }}
                    />
                    <Button
                      danger
                      type="primary"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        onDelete(element.Asset_Classify.ID)
                      }}
                    /></span>}
                  title={element.Asset_Classify.AssetClassifyName}
                  bordered={true}>
                  <div onClick={() => {
                    getListAsset(element.Asset_Classify.ID)
                    setShowDetail(true)
                  }}>
                    Tổng: {element.Asset_Details.length} loại
                    <h4>
                      Xem chi tiết
                    </h4>
                  </div>
                </Card>)
              })}
          </Col>
        </Row>
      </Card>
      <Modal
        title="Tên danh mục"
        centered
        visible={showUpdate}
        onOk={onUpdate}
        onCancel={() => {
          setShowUpdate(false)
          getListAssetClassify()
        }}
      >
        <Input placeholder="Tên danh mục..."
          prefix={<GoldOutlined />}
          value={assetClassify}
          onChange={(e) => setAssetClassify(e.target.value)} />
      </Modal>
      <Modal
        title="Danh sách thuốc"
        centered
        width="60vw"
        visible={showDetail}
        onOk={() => {
          setShowDetail(false)
          getListAssetClassify()
        }}
        onCancel={() => {
          setShowDetail(false)
          getListAssetClassify()
        }}>
        {assetList?.Response?.AssetDetails ?
          <Table
            scroll={assetList?.Response?.AssetDetails ? {
              y: '70vh',
            } : {}}
            dataSource={assetList?.Response?.AssetDetails}
            columns={tableHeader}
            pagination={30} />
          : <></>}
      </Modal>
    </div >
  );
}

function mapStateToProps(state) {
  return {
    amsStore: state.amsReducer,
  };
}

export default connect(mapStateToProps)(Asset);
