import './App.scss';
import React, { useEffect } from "react";
import Home from './AdministratorPages/Screen/Home';
import Login from './AdministratorPages/Screen/Login';
import User from './AdministratorPages/Screen/User';
import Config from './AdministratorPages/Screen/Config';
import Warehousing from './AdministratorPages/Screen/Warehousing';
import Asset from './AdministratorPages/Screen/Asset';
import Supplier from './AdministratorPages/Screen/Supplier';
import Report from './AdministratorPages/Screen/Report';
import * as cookieHandle from "./AdministratorPages/Common/Cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  CloseCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import OpenNotification from "./AdministratorPages/Components/OpenNotification";
import * as messageType from './AdministratorPages/Common/messageCode';
import { connect, useDispatch } from "react-redux";
import * as amsAction from './ReduxSaga/Actions';
import NavigationBar from './AdministratorPages/Components/NavigationBar';
import AMSMenu from "./AdministratorPages/Components/Menu";
import { Row, Col } from 'antd';
import Shopping from './AdministratorPages/Components/Shopping';
import Allocation from './AdministratorPages/Components/Allocation';
import Notfound from './AdministratorPages/Screen/404Notfound';
import Ticket from './AdministratorPages/Screen/Ticket';
import Invoice from './AdministratorPages/Screen/Invoice';
import ChatList from './AdministratorPages/Components/ChatList';
import * as signalR from './AdministratorPages/Common/SignalR';

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
    requestNotificationSuccess,
    hadMessage
  } = amsAction;

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
      signalR.initSignalR(cookie.userName, (notification1) => {
        dispatch(requestNotificationSuccess(notification1))
      }, (notification1) => {
        dispatch(setError(notification1))
      })
      signalR.receiveMessage((content) => {
        dispatch(hadMessage(content))
      })
    }
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
          <ChatList />
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
                  <Route exact path="/Ticket">
                    <Ticket />
                  </Route>
                  <Route exact path="/Shopping/Invoice">
                    <Invoice />
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
                    {(!requestID) ? <Home /> : <Shopping data={requestID} title={functionTitle} />}
                  </Route>
                  <Route exact path="/Allocation">
                    {(!requestID) ? <Home /> : <Allocation data={requestID} title={functionTitle} />}
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
                <Login />
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
