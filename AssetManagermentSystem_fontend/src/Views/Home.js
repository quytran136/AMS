import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import './Access/Css/Common.scss';
import "./Access/Css/Home.scss";
import { Col, Row, Card } from 'antd';
import * as amsAction from '../ReduxSaga/Actions/action';
import {
  useHistory
} from "react-router-dom";

function Home(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    setRequestID,
    setWarehouseAction
  } = amsAction;

  const {
    configCommon
  } = props.amsStore;

  const [listFunction, setListFunction] = useState([])

  function readConfigCommon() {
    if (configCommon) {
      configCommon.Response.Configs.forEach(element => {
        switch (element.Code) {
          case "FUNCTION":
            const a = JSON.parse(element.Value)
            setListFunction(a)
            break
          default:
            break;
        }
      })
    }
  }

  useEffect(readConfigCommon, [configCommon])

  function renderHome(listFunction) {
    return (<Row className="home-body">
      {
        listFunction &&
        listFunction.map((element, index) => {
          return (<Col span={6} key={index}>
            <Card className="ams-card-item"
              onClick={() => {
                history.push(element.FunctionPath)
                dispatch(setRequestID(null))
                dispatch(setWarehouseAction({
                  key: element.FunctionKey,
                  ProcessID: element.FunctionProcess
                }))
              }}>
              {element.FunctionName}
            </Card >
          </Col>)
        })
      }
    </Row>)
  }

  return (
    <div className="main-content">
      <Card className="warehouse">
        {renderHome(listFunction)}
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    amsStore: state.amsReducer,
  };
}

export default connect(mapStateToProps)(Home);
