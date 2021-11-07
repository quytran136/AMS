import React, { useState } from "react";
import { connect } from "react-redux";
// import * as amsAction from "../ReduxSaga/Actions/action";
import "./Access/Css/Common.scss";
import "./Access/Css/Config.scss";
import { Menu, Card } from 'antd';
import {
  ClusterOutlined,
  NodeIndexOutlined,
  PartitionOutlined
} from '@ant-design/icons';
import DepartmentChart from "./Components/DepartmentChart";

function Config() {

  // const dispatch = useDispatch();

  const [currentMenu, setCurrentMenu] = useState("A1");

  const renderTab = () => {
    switch (currentMenu) {
      case "A1":
        return (<DepartmentChart />)
      case "A2":
        return (<>A2</>)
      case "A3":
        return (<>A3</>)
      default:
        return (<></>)
    }
  }

  return (
    <div className="main-content">
      <Menu
        onClick={(e) => setCurrentMenu(e.key)}
        selectedKeys={[currentMenu]}
        mode="horizontal"
      >
        <Menu.Item
          key="A1"
          icon={<ClusterOutlined />}
        >
          Cơ cấu tổ chức
        </Menu.Item>
        <Menu.Item
          key="A2"
          icon={<NodeIndexOutlined />}
        >
          Quy trình phê duyệt
        </Menu.Item>
        <Menu.Item
          key="A3"
          icon={<PartitionOutlined />}
        >
          Phân quyền
        </Menu.Item>
      </Menu>

      <Card>
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
