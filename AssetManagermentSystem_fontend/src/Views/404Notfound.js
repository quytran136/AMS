import React from "react";
import { connect } from "react-redux";
// import * as amsAction from "../ReduxSaga/Actions/action";
import "./Access/Css/Common.scss";

function Notfound() {

  // const dispatch = useDispatch();
  return (
    <div className="main-content not-found">
    </div>
  );
}

function mapStateToProps(state) {
  return {
    amsStore: state.amsReducer,
  };
}

export default connect(mapStateToProps)(Notfound);
