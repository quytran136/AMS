import React from "react";
import "./Access/Css/Common.scss";
import "./Access/Css/Home.scss";
import { Col, Row } from 'antd';
import { connect, useDispatch } from "react-redux";

function Warehousing() {
  return (
    <div className="main-content">
      Kho bãi
    </div>
  );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Warehousing);
