import React from "react";
import { connect } from "react-redux";
import './Access/Css/Login.scss';
import 'antd/dist/antd.css';
import './Access/Css/Common.scss';
import { Row, Col } from 'antd';
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import ResetPassword from "./Components/ResetPassword";

function Login(prop) {
    const {
        tabLogin
    } = prop.amsStore;

    const tabList = [
        {
            key: "Signin"
        },
        {
            key: "Signup"
        },
        {
            key: "ResetPassword"
        }
    ]

    const RenderTab = () => {
        switch (tabLogin) {
            case tabList[0].key:
                return (<Signin />)
            case tabList[1].key:
                return (<Signup />)
            case tabList[2].key:
                return (<ResetPassword />)
            default:
                return (<Signin />)
        }
    }

    return (
        <Row gutter={[8, 8]} className="login-body">
            <Col span={16} className="Left-panel">
                <div className="company">
                    <div className="company-logo">
                        Logo
                    </div>
                    <div className="company-name">
                        name
                    </div>
                    <div className="company-sologan">
                        sologan
                    </div>
                </div>
            </Col>
            <Col span={8} className="right-panel">
                {RenderTab()}
                <div className="version">
                    1.0.0.0
                </div>
            </Col>
        </Row>
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(Login);
