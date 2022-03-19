import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import '../../Access/Css/Common.scss';
import "./style.scss";
import { Row, Card } from 'antd';
import * as amsAction from '../../ReduxSaga/Actions';
import {
  useHistory
} from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Home(props) {
  // const history = useHistory();
  // const dispatch = useDispatch();

  const {
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
    return (<>
      <Row className="home-body">
        {
          
        }
      </Row>
    </>)
  }

  return (
    <div className="main-content">
      <Card className="home">
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
