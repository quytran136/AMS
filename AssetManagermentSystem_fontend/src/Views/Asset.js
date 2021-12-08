import React, { useEffect, useState } from "react";
import "./Access/Css/Common.scss";
import "./Access/Css/Warehouse.scss";
import { Col, Row, Card, Input, Modal, Button } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  GoldOutlined
} from '@ant-design/icons';
import { connect, useDispatch } from "react-redux";
import * as amsAction from '../ReduxSaga/Actions/action';

function Asset(props) {

  const dispatch = useDispatch();
  const {
    requestAsset
  } = amsAction;

  const {
    userName,
    token,
    assetClassifies
  } = props.amsStore;

  const [showUpdate, setShowUpdate] = useState()
  const [assetClassify, setAssetClassify] = useState()
  const [isDelete, setIsDelete] = useState(false)
  const [id, setID] = useState()

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
          <h3>Danh sách tài sản</h3>
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
              Add new
            </Button>
          </Col>
        </Row>
        <Row className="warehouse-body">
          <Col span={24}>
            {assetClassifies?.Response?.AssetClassifies &&
              assetClassifies?.Response?.AssetClassifies.map((element) => {
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
                        onDelete(element.ID)
                      }}
                    /></span>}
                  title={element.Asset_Classify.AssetClassifyName}
                  bordered={true}>
                    Tổng số tài sản: {element.Asset_Details.length}
                </Card>)
              })}
          </Col>
        </Row>
      </Card>
      <Modal
        title="Lớp tài sản"
        centered
        visible={showUpdate}
        onOk={onUpdate}
        onCancel={() => {
          setShowUpdate(false)
          getListAssetClassify()
        }}
      >
        <Input placeholder="warehouse name..."
          prefix={<GoldOutlined />}
          value={assetClassify}
          onChange={(e) => setAssetClassify(e.target.value)} />
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
