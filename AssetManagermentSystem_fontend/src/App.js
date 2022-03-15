import './App.scss';
import React, { useEffect, useState } from "react";
import Home from './Screen/Home';
import Login from './Screen/Login';
import User from './Screen/User';
import Config from './Screen/Config';
import Warehousing from './Screen/Warehousing';
import Asset from './Screen/Asset';
import Supplier from './Screen/Supplier';
import Report from './Screen/Report';
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
import OpenNotification from "./Components/OpenNotification";
import * as messageType from './Common/messageCode';
import { connect, useDispatch } from "react-redux";
import * as amsAction from './ReduxSaga/Actions';
import NavigationBar from './Components/NavigationBar';
import AMSMenu from "./Components/Menu";
import { Row, Col } from 'antd';
import Shopping from './Components/Shopping';
import Allocation from './Components/Allocation';
import Notfound from './Screen/404Notfound';
import { hubConnection } from 'signalr-no-jquery'
import {
  SERVER_SIGNALR
} from './Common/server';

function App(prop) {
  const dispatch = useDispatch();
  const {
    error,
    token,
    cookie,
    showMenu,
    message,
    requestID,
    functionTitle
  } = prop.amsStore;
  const {
    saveCookie,
    saveUserLogin,
    saveToken,
    setMessage,
    setError,
    requestConfigCommon,
    requestNotification,
    requestNotificationSuccess
  } = amsAction;

  const connection = hubConnection(SERVER_SIGNALR)
  const hubProxy = connection.createHubProxy('amshub')

  function load() {
    var cookie = cookieHandle.getCookie("BASE");
    if (cookie) {
      var cookieData = JSON.parse(cookie)
      if (cookieData) {
        dispatch(saveCookie(cookieData))
        dispatch(saveUserLogin(cookieData.userName))
        dispatch(saveToken(cookieData.token))
      }
    }
  }

  function loadData() {
    if (cookie) {
      const body = {
        Token: cookie.token,
        Key: "GET_NOTIFICATION",
        UserNameRequest: cookie.userName,
      }
      getConfigCommon(cookie.userName, cookie.token)
      dispatch(requestNotification(body))
      initSignalR(cookie.userName)
    }
  }

  function initSignalR(userName) {
    connection.logging = true;
    connection.start({ transport: ['serverSentEvents', 'longPolling'] })
      .done(() => {
        hubProxy.invoke('RegistConnect', userName, connection.id);
      })
      .fail(() => {
        connection.stop();
      })
    hubProxy.on('OnNotification', (message) => {
      let notification1 = JSON.parse(message)
      if (!notification1.Message) {
        if (notification1.Response) {
          dispatch(requestNotificationSuccess(notification1))
        }
      } else {
        dispatch(setError(notification1))
      }
    })
    return connection;
  }

  function getConfigCommon(userName, token) {
    const body = {
      Token: token,
      Key: "GET_CONFIG_COMMON",
      UserNameRequest: userName,
    }
    dispatch(requestConfigCommon(body))
  }

  function checkError() {
    if (error) {
      OpenNotification(error.Code ?? "", messageType.ERROR, error.Message ?? "Có lỗi bất thường xảy ra", <CloseCircleOutlined className="error-message" />);
      if (error.Code === "B01A2") {
        cookieHandle.setCookie("BASE", null, 0)
        dispatch(saveCookie(null))
      }
      dispatch(setError(null))
    }
  }

  function showMessage() {
    if (message) {
      OpenNotification("", messageType.SUCCESS, message, <CheckCircleOutlined className="success-message" />);
      dispatch(setMessage(null))
    }
  }

  function checkToken() {
    if (token) {
      if (token?.Response?.TokenString !== "" && token) {
        OpenNotification("", messageType.SUCCESS, "Đăng nhập thành công", <CheckCircleOutlined className="success-message" />);
      } else {
        OpenNotification(token.Code, messageType.WARNING, token.Message, <WarningOutlined className="warnign-message" />);
      }
    }
  }

  useEffect(load, [])
  useEffect(loadData, [cookie])
  useEffect(checkError, [error])
  useEffect(showMessage, [message])
  useEffect(checkToken, [token])

  return (
    <Router>
      <div className="common">
        {cookie ? <>
          <NavigationBar />
          <div className="body-content">
            <Row>
              <Col span={showMenu ? 1 : 3}>
                <AMSMenu />
              </Col>
              <Col span={showMenu ? 23 : 21}>
                <Switch >
                  <Route exact path="/Home">
                    <Home />
                  </Route>
                  <Route exact path="/User">
                    <User />
                  </Route>
                  <Route exact path="/Config">
                    <Config />
                  </Route>
                  <Route exact path="/Warehousing">
                    <Warehousing />
                  </Route>
                  <Route exact path="/Supplier">
                    <Supplier />
                  </Route>
                  <Route exact path="/Asset">
                    <Asset />
                  </Route>
                  <Route exact path="/Report">
                    <Report />
                  </Route>
                  <Route path="/Shopping">
                    <Shopping data={requestID} title={functionTitle} />
                  </Route>
                  <Route exact path="/Allocation">
                    <Allocation data={requestID} title={functionTitle} />
                  </Route>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/">
                    <Notfound />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </div>
        </>
          : <>
            <Switch>
              <Route exact path="/Login">
                <Login />
              </Route>
              <Route path="/">
                <Notfound />
              </Route>
            </Switch></>}
      </div>
    </Router >
  )
}

function mapStateToProps(state) {
  return {
    amsStore: state.amsReducer,
  };
}

export default connect(mapStateToProps)(App);
