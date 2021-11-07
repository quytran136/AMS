import React from "react";
import "./Access/Css/Common.scss";
import "./Access/Css/Home.scss";
// import { Col, Row } from 'antd';
import { connect } from "react-redux";

function Report() {
  return (
    <div className="main-content">
      báo cáo
    </div>
  );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Report);
