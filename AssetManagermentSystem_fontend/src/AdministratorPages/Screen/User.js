import React from "react";
import { connect } from "react-redux";

function User() {
  return (
    <div className="main-content">
      Thông tin người dùng
    </div>
  );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(User);
