import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import "./style.scss";
import { Row, Col, Card } from 'antd';
import * as amsAction from '../../../ReduxSaga/Actions';
import LineChart from "../../Components/Charts/LineChart";
import Supplier from "../Supplier";
import {
  DownOutlined
} from '@ant-design/icons';

function Home(props) {
  // const history = useHistory();
  const dispatch = useDispatch();

  const {
    requestTicket,
    requestAsset
  } = amsAction;

  const {
    token,
    userName,
    supplier,
    ticket,
    assetClassifies
  } = props.amsStore;

  const loadDashboard = () => {
    getListTicket()
    getListAsset()
  }

  const getListTicket = (e) => {
    const body = {
      Token: token,
      Key: "TICKET_REQUESTED",
      UserNameRequest: userName,
      Data: {
        SearchContent: e || ""
      }
    }
    dispatch(requestTicket(body))
  }

  function getListAsset() {
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

  useEffect(loadDashboard, [])

  return (
    <div className="main-content">
      <Card className="home">
        <div className="body">
          <Row>
            <Col span={6}>
              <div className="box background-green">
                <div className="box-header">
                  Tổng loại sản phẩm
                </div>
                <div className="box-body">
                  {assetClassifies?.Response?.AssetClassifies?.length || 0}
                </div>
                <div className="box-footer">
                  <DownOutlined className="icon" />
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="box background-blue">
                <div className="box-header">
                  Tổng số tiền đã chi
                </div>
                <div className="box-body">
                  {(1000000000).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </div>
                <div className="box-footer">
                  <DownOutlined className="icon" />
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="box background-yellow">
                <div className="box-header">
                  Tổng nhà cung cấp
                </div>
                <div className="box-body">
                  {supplier?.Response?.Suppliers?.length || 0}
                </div>
                <div className="box-footer">
                  <DownOutlined className="icon" />
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="box background-orange">
                <div className="box-header">
                  Số yêu cầu đã gửi
                </div>
                <div className="box-body">
                  {ticket?.Response?.Tickets?.length || 0}
                </div>
                <div className="box-footer">
                  <DownOutlined className="icon" />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={18}>
              <LineChart />
            </Col>
            <Col span={6} className="left-side">
              <Supplier ShowOnly={true} />
            </Col>
          </Row>
        </div>
        <div className="footter">

        </div>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    amsStore: state.amsReducer,
  };
}

export default connect(mapStateToProps)(Home);
