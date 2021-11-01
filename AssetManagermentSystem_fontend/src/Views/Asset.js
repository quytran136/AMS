import React from "react";
import "./Access/Css/Common.scss";
import "./Access/Css/Home.scss";
import { Col, Row } from 'antd';
import NavigationBar from "./Components/navigationBar";
import Menu from "../Views/Components/menu";
import { connect, useDispatch } from "react-redux";

function Asset() {
  return (
    <div className="main-content">
      Tài sản
    </div>
  );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Asset);
