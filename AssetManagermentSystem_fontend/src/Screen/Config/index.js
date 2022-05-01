import React, { useState } from "react";
import { connect } from "react-redux";
// import * as amsAction from "../ReduxSaga/Actions";
import "../../Access/Css/Common.scss";
import "./style.scss";
import { Menu, Card } from 'antd';
import {
  ClusterOutlined,
  NodeIndexOutlined,
  PartitionOutlined,
  TeamOutlined,
  SettingOutlined
} from '@ant-design/icons';
import DepartmentChart from "../../Components/DepartmentChart";
import Employee from "../../Components/Employee";
import ProcessFlow from "../../Components/ProcessFlow";
import ConfigCommon from "../../Components/ConfigCommon";
import Authorization from "../../Components/Authorization";

function Config() {

  // const dispatch = useDispatch();

  const tabList = [
    {
      key: "Department",
      value: "Cơ cấu phòng ban",
      component: <DepartmentChart />,
      icon: <ClusterOutlined />
    },
    {
      key: "FlowConfig",
      value: "Cấu hình luồng duyệt",
      component: <ProcessFlow />,
      icon: <NodeIndexOutlined />
    },
    {
      key: "Employee",
      value: "Quản lý nhân sự",
      component: <Employee />,
      icon: <TeamOutlined />
    },
    {
      key: "Authorization",
      value: "Cấu hình quyền",
      component: <Authorization/>,
      icon: <PartitionOutlined />
    },
    {
      key: "CommonConfig",
      value: "Cấu hình chung",
      component: <ConfigCommon />,
      icon: <SettingOutlined />
    },
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
      <Menu
        onClick={(e) => setCurrentMenu(e.key)}
        selectedKeys={[currentMenu]}
        mode="horizontal"
      >
        {renderMenu()}
      </Menu>
      <Card className="config-container">
        {renderTab()}
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    amsStore: state.amsReducer,
  };
}

export default connect(mapStateToProps)(Config);
