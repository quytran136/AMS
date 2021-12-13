import React, { useState } from "react";
import "./Access/Css/Common.scss";
import "./Access/Css/Report.scss";
import { Card, Menu } from 'antd';
import { connect } from "react-redux";
import ReportDetail from './Components/ReportDetail';

function Report() {

  const tabList = [
    {
      key: "R1",
      value: "Báo cáo tồn kho",
      component: <ReportDetail key="R1"/>,
    },
    {
      key: "R2",
      value: "Báo cáo mua sắm tài sản",
      component: <ReportDetail key="R2"/>,
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
          onClick={() => setCurrentMenu(element.key)}
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
