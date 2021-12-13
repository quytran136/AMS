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
      component: <ReportDetail data="R1"/>,
    },
    {
      key: "R2",
      value: "Báo cáo mua sắm tài sản",
      component: <ReportDetail data="R2"/>,
    }
  ]
  const [currentMenu, setCurrentMenu] = useState(tabList[0].key);

  const renderTab = (key) => {
    console.log(key)
    var component
    tabList.forEach(element => {
      if (key === element.key) {
        component = element.component
      }
    });
    return component
  }

  const renderMenu = () => {
    var result = []
    tabList.forEach((element) => {
      result.push(
        <Menu.Item
          key={element.key}
          icon={element.icon}
          onClick={() => {
            setCurrentMenu(element.key)
          }}
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
          {renderTab(currentMenu)}
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
