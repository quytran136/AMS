import './App.css';
import React, { useEffect } from "react";
import Home from './Views/Home';
import Login from './Views/Login';
import "./Views/Access/Css/Common.scss";
import * as cookieHandle from "./Common/Cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  CloseCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import openNotification from "./Views/Components/openNotification";
import * as messageType from './Common/messageCode';
import { connect, useDispatch } from "react-redux";
import * as amsAction from './ReduxSaga/Actions/action';

function App(prop) {
  const dispatch = useDispatch();
  const {
    error,
    token,
    cookie
  } = prop.amsStore;
  const {
    saveCookie
  } = amsAction;

  function load() {
    var cookieData = cookieHandle.getCookie("BASE")
    if (cookieData) {
      dispatch(saveCookie(cookieData))
    }
  }

  function checkError() {
    if (error) {
      openNotification("", messageType.ERROR, error, <CloseCircleOutlined className="error-message" />);
    }
  }

  function checkToken() {
    if (token) {
      if (token?.Code) {
        openNotification(token.Code, messageType.WARNING, token.Message, <WarningOutlined className="warnign-message" />);
      }

      if (token?.Response?.TokenString) {
        openNotification("", messageType.SUCCESS, "Đăng nhập thành công", <CheckCircleOutlined className="success-message" />);
        console.log(cookie);
      }
    }
  }

  useEffect(load, [])
  useEffect(checkError, [error])
  useEffect(checkToken, [token])

  return (
    <Router>
      <div className="common">
        {cookie ? <Redirect to='/Home' /> : <Redirect to='/Login' />}
        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/404Notfound">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function mapStateToProps(state) {
  return {
    amsStore: state.amsReducer,
  };
}

export default connect(mapStateToProps)(App);
