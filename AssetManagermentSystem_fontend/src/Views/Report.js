import React, { useState } from "react";
import "./Access/Css/Common.scss";
import "./Access/Css/Report.scss";
import { Col, Row, Card, Menu } from 'antd';
import { connect } from "react-redux";
import {
  ClusterOutlined,
  NodeIndexOutlined,
  PartitionOutlined,
  TeamOutlined,
  SettingOutlined
} from '@ant-design/icons';
import ReportDetail from './Components/ReportDetail';

function Report() {

  const tabList = [
    {
      key: "R1",
      value: "Báo cáo tồn kho",
      component: <ReportDetail />,
    },
    {
      key: "R2",
      value: "Báo cáo mua sắm tài sản",
      component: <ReportDetail />,
    },
    {
      key: "R3",
      value: "Tài sản đã cấp phát",
      component: <ReportDetail />,
    },
    {
      key: "R4",
      value: "Báo cáo thu hồi tài sản",
      component: <ReportDetail />,
    },
    {
      key: "R5",
      value: "Báo cáo thanh lý tài sản",
      component: <ReportDetail />,
    }
  ]
  const [currentMenu, setCurrentMenu] = useState(tabList[0].key);

  const renderTab = () => {
    var tab
    tabList.forEach(element => {
      if (currentMenu === element.key) {
        tab = element.component
      }
    });
    return tab
  }

  const renderMenu = () => {
    var result = []
    tabList.forEach((element) => {
      result.push(
        <Menu.Item
          key={element.key}
          icon={element.icon}
        >
          {element.value}
        </Menu.Item>)
    })
    return result
  }

  return (
    <div className="main-content">
      <Card className="report">
        <Menu
          onClick={(e) => setCurrentMenu(e.key)}
          selectedKeys={[currentMenu]}
          mode="horizontal"
        >
          {renderMenu()}
        </Menu>
        <div className="report-body">
          {renderTab()}
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

export default connect(mapStateToProps)(Report);
