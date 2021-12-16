import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import './Access/Css/Common.scss';
import "./Access/Css/Home.scss";
import { Col, Row, Card } from 'antd';
import * as amsAction from '../ReduxSaga/Actions/action';
import {
  useHistory
} from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Home(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    setRequestID,
    setWarehouseAction,
    getTicketSuccess,
    setFunctionTitle,
    getReport
  } = amsAction;

  const {
    configCommon,
    result,
    token,
    userName
  } = props.amsStore;

  const [listFunction, setListFunction] = useState([])
  const [dataChart, setDataChart] = useState(null);

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


  function getChart() {
    const body = {
      Token: token,
      Key: "REPORT_3",
      UserNameRequest: userName,
    }
    dispatch(getReport(body))
  }

  function setChart() {
    if (result && result.Response.Res_Reports) {
      let listData = []
      result.Response.Res_Reports.forEach(element => {
        let b = {
          labels: [],
          datasets: [
            {
              label: '# of Votes',
              data: [],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }
        b.labels = element.Headers
        console.log(element.Headers)
        const a = JSON.parse(element.Result)
        let list1 = []
        element.Headers.forEach(element => {
          list1.push(a[0][element])
        });
        b.datasets[0].data = list1
        listData.push(b)
      });

      setDataChart(listData)
    }
  }

  useEffect(getChart, [])
  useEffect(setChart, [result])
  useEffect(readConfigCommon, [configCommon])

  function renderHome(listFunction) {
    return (<>
      <Row className="home-body">
        {
          listFunction &&
          listFunction.map((element, index) => {
            return (<Col span={4} key={index} className="ams-func-item">
              <div
                onClick={() => {
                  dispatch(setRequestID(null))
                  dispatch(setFunctionTitle(element.FunctionName))
                  dispatch(getTicketSuccess(null))
                  dispatch(setWarehouseAction({
                    key: element.FunctionKey,
                    ProcessID: element.FunctionProcess
                  }))
                  history.push(element.FunctionPath)
                }}>
                <h3>{element.FunctionName}</h3>
              </div >
            </Col>)
          })
        }
      </Row>
      <Row>
        {dataChart ? <>
          {dataChart.map(element => {
            return (<>
              <Col span={6}>
                <Pie data={element} title="Tình trạng yêu cầu" />
              </Col>
            </>)
          })}
        </> : <></>}
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
