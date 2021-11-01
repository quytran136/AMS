import './App.css';
import React, { useEffect } from "react";
import Home from './Views/Home';
import Login from './Views/Login';
import User from './Views/User';
import Config from './Views/Config';
import Warehousing from './Views/Warehousing';
import Asset from './Views/Asset';
import Report from './Views/Report';
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
import NavigationBar from './Views/Components/navigationBar';
import AMSMenu from "./Views/Components/menu";
import { Row, Col } from 'antd';

function App(prop) {
  const dispatch = useDispatch();
  const {
    error,
    token,
    cookie,
    showMenu,
    message
  } = prop.amsStore;
  const {
    saveCookie,
    saveUserLogin,
    saveToken
  } = amsAction;

  function load() {
    var cookie = cookieHandle.getCookie("BASE");
    if (cookie) {
      var cookieData = JSON.parse(cookie)
      dispatch(saveCookie(cookieData))
      dispatch(saveUserLogin(cookieData.userName))
      dispatch(saveToken(cookieData.token))
    }
  }

  function signout() { }

  function checkError() {
    if (error) {
      openNotification(error.Code ?? "", messageType.ERROR, error.Message ?? "Có lỗi bất thường xảy ra", <CloseCircleOutlined className="error-message" />);
    }
  }

  function showMessage() {
    if (message) {
      openNotification("", messageType.SUCCESS, message.Message, <CheckCircleOutlined className="success-message" />);
    }
  }

  function checkToken() {
    if (token) {
      if (token?.Response?.TokenString !== "" && token) {
        openNotification("", messageType.SUCCESS, "Đăng nhập thành công", <CheckCircleOutlined className="success-message" />);

      } else {
        openNotification(token.Code, messageType.WARNING, token.Message, <WarningOutlined className="warnign-message" />);
      }
    }
  }

  useEffect(load, [])
  useEffect(signout, [cookie])
  useEffect(checkError, [error])
  useEffect(showMessage, [message])
  useEffect(checkToken, [token])

  return (
    <Router>
      <div className="common">
        {cookie ? <>
          <Redirect to={"/"} />
          <NavigationBar />
          <div className="body-content">
            <Row>
              <Col span={showMenu ? 2 : 4}>
                <AMSMenu />
              </Col>
              <Col span={showMenu ? 22 : 20}>
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
                  <Route exact path="/Asset">
                    <Asset />
                  </Route>
                  <Route exact path="/Report">
                    <Report />
                  </Route>
                  <Route exact path="/404Notfound">
                    <Home />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </div>
        </>
          : <><Redirect to='/Login' />
            <Switch>
              <Route exact path="/Login">
                <Login />
              </Route>
            </Switch></>}
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
