import React, { useState } from "react";
import "./style.scss";
import { Card, Menu } from 'antd';
import { connect } from "react-redux";
import ReportDetail from '../../Components/ReportDetail';

function Report() {

  const tabList = [
    {
      key: "REPORT_1",
      value: "Báo cáo tồn kho",
      component: <ReportDetail data="REPORT_1"/>,
    },
    {
      key: "REPORT_2",
      value: "Báo cáo tổng hợp các yêu cầu",
      component: <ReportDetail data="REPORT_2"/>,
    },
    {
      key: "REPORT_3",
      value: "Báo cáo nhập kho",
      component: <ReportDetail data="REPORT_3"/>,
    },
    {
      key: "REPORT_4",
      value: "Báo cáo xuất kho",
      component: <ReportDetail data="REPORT_4"/>,
    }
  ]
  const [currentMenu, setCurrentMenu] = useState(tabList[0].key);

  const renderTab = (key) => {
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
