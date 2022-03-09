import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import './style.scss'
import { Input, Button, Modal, DatePicker, TreeSelect } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined
} from '@ant-design/icons';
import * as amsAction from '../../ReduxSaga/Actions';
import moment from 'moment';

const UpdateEmployee = (prop) => {
    const dispatch = useDispatch();
    const { visible, onTrigger, dataSelected } = prop

    const {
        getOrganizationalChart,
        signup,
        setError,
        getUserInfo,
        getUserInfoSuccess
    } = amsAction;

    const {
        departmentChart,
        organizationalChart,
        userName,
        token,
        signupSuccess,
        userInfo
    } = prop.amsStore;

    const [showAddNew, setShowUserInfo] = useState(false);
    const [department, setDepartment] = useState();
    const [organization, setOrganization] = useState();
    const [userLoginName, setUserLoginName] = useState();
    const [userPassword, setUserPassword] = useState("");
    const [userPassword2, setUserPassword2] = useState("");
    const [userFullName, setUserFullName] = useState();
    const [DOB, setDOB] = useState(new Date().toISOString());
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    function reset() {
        dispatch(getUserInfoSuccess(null))
        setDepartment(null)
        setOrganization(null)
        setUserLoginName(null)
        setUserPassword(null)
        setUserPassword2(null)
        setUserFullName(null)
        setDOB(new Date().toISOString())
        setEmail(null)
        setPhone(null)
        setShowUserInfo(visible)
        getUser()
    }

    useEffect(reset, [visible])

    function getUser() {
        if (userName && dataSelected) {
            const body = {
                Token: token,
                Key: "USER_INFORMATION",
                UserNameRequest: userName,
                Data: {
                    userLoginName: dataSelected.UserName
                }
            }
            dispatch(getUserInfo(body))
        }
    }

    function showDetail() {
        if (userInfo) {
            getORG(userInfo.DepartmentID)
            setTimeout(() => {
                setDepartment(userInfo.DepartmentID)
                setOrganization(userInfo.OrganizationID)
                setUserFullName(userInfo.UserFullName)
                setDOB(userInfo.DOB)
                setEmail(userInfo.Email)
                setPhone(userInfo.Phone)
                setUserLoginName(userInfo.UserName)
            }, 100);
        }
    }

    useEffect(showDetail, [userInfo])

    function RenderTreeDepartment(item) {
        var node = [];
        if (item && item.Childs) {
            item.Childs.forEach(element => {
                if (element.Node.IsDelete !== true) {
                    if (element.Childs && element.Childs.length > 0) {
                        var count = 0
                        element.Childs.forEach(item => {
                            if (item.Node.IsDelete) {
                                count++
                            }
                        })
                        if (count === element.Childs.length) {
                            node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.DepartmentName} />)
                        } else {
                            node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.DepartmentName}> {RenderTreeDepartment(element)}</TreeSelect.TreeNode>)
                        }
                    } else {
                        node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.DepartmentName} />)
                    }
                }
            });
        }
        return node;
    }

    function RenderTreeORG(item) {
        var node = [];
        if (item && item.Childs) {
            item.Childs.forEach(element => {
                if (element.Node.IsDelete !== true) {
                    if (element.Childs && element.Childs.length > 0) {
                        var count = 0
                        element.Childs.forEach(item => {
                            if (item.Node.IsDelete) {
                                count++
                            }
                        })
                        if (count === element.Childs.length) {
                            node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.OrganizationalName} />)
                        } else {
                            node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.OrganizationalName}> {RenderTreeORG(element)}</TreeSelect.TreeNode>)
                        }
                    } else {
                        node.push(<TreeSelect.TreeNode key={element.Node.ID} value={element.Node.ID} title={element.Node.OrganizationalName} />)
                    }
                }
            });
        }
        return node;
    }

    function getORG(value) {
        const body = {
            Token: token,
            Key: "ORGANIZATIONAL_CHART",
            UserNameRequest: userName,
            Data: {
                DepartmentID: value
            }
        }
        dispatch(getOrganizationalChart(body))
        // setDepartment(value)
    }

    function onSave() {
        if (userPassword === userPassword2) {
            const body = {
                Token: token,
                Key: "CREATE_USER",
                UserNameRequest: userName,
                Data: {
                    UserFullName: userFullName,
                    UserLoginName: userLoginName,
                    UserPassword: userPassword,
                    DepartmentID: department,
                    OrganizationID: organization,
                    DOB: DOB,
                    Phone: phone,
                    Email: email
                }
            }
            dispatch(signup(body))
        }
        else {
            dispatch(setError({
                Code: "AMS_01",
                Message: "Mật khẩu nhập lại không chính xác"
            }))
        }
    }

    function onEdit() {
        if (userPassword === userPassword2) {
            const body = {
                Token: token,
                Key: "UPDATE_USER",
                UserNameRequest: userName,
                Data: {
                    UserFullName: userFullName,
                    UserLoginName: userLoginName,
                    UserPassword: userPassword,
                    DepartmentID: department,
                    OrganizationID: organization,
                    DOB: DOB,
                    Phone: phone,
                    Email: email
                }
            }
            dispatch(signup(body))
        }
        else {
            dispatch(setError({
                Code: "AMS_01",
                Message: "Mật khẩu nhập lại không chính xác"
            }))
        }
    }

    function onClose() {
        setShowUserInfo(false)
        onTrigger(false)
    }

    useEffect(() => {
        if (organizationalChart) {
            setOrganization(organizationalChart.Node.ID)
        }
    }, [organizationalChart])

    function onTriggerMessage() {
        if (signupSuccess) {
            onClose()
        }
    }

    useEffect(onTriggerMessage, [signupSuccess])

    function generateUserName() {
        if (userFullName) {
            var userNameX = "";
            const listSpellName = userFullName.split(" ");
            for (var i = 0; i < listSpellName.length; i++) {
                if (i === (listSpellName.length - 1)) {
                    userNameX = listSpellName[i].toLowerCase() + userNameX
                    break
                } else {
                    userNameX += listSpellName[i].substring(0, 1).toLowerCase()
                }
            }
            setUserLoginName(userNameX.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D"))
        }
    }

    return (
        <Modal
            title={dataSelected ? "Thông tin nhân viên" : "Thêm mới nhân viên"}
            centered
            visible={showAddNew}
            onOk={() => !dataSelected ? onSave() : onEdit()}
            onCancel={() => onClose()}
        >
            <h4>Trực thuộc phòng ban / bộ phận</h4>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear="true"
                defaultValue={department}
                value={department}
                treeDefaultExpandAll="true"
                onChange={(e) => {
                    setDepartment(e)
                    getORG(e)
                }}
            >
                {departmentChart ?
                    <TreeSelect.TreeNode value={departmentChart.Node.ID} title={departmentChart.Node.DepartmentName}>
                        {RenderTreeDepartment(departmentChart)}
                    </TreeSelect.TreeNode>
                    : ''}
            </TreeSelect>
            <br />
            <h4>Vị trí</h4>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear="true"
                treeDefaultExpandAll="true"
                defaultValue={organization}
                value={organization}
                onChange={(e) => setOrganization(e)}
            >
                {organizationalChart ? <TreeSelect.TreeNode key={organizationalChart.Node.ID} value={organizationalChart.Node.ID} title={organizationalChart.Node.OrganizationalName}>
                    {RenderTreeORG(organizationalChart)}
                </TreeSelect.TreeNode> : ''}
            </TreeSelect>
            <br />
            <h4>Tên nhân viên</h4>
            <Input.Group>
                <Input placeholder="Trần Văn A"
                    prefix={<UserOutlined />}
                    style={{ width: '80%' }}
                    value={userFullName}
                    onChange={(e) => setUserFullName(e.target.value)} />
                <Button disabled = {dataSelected} type="primary" style={{ width: '20%' }} onClick={() => generateUserName()}>
                    Tạo TK
                </Button>
            </Input.Group>
            <h4>Ngày tháng năm sinh</h4>
            <DatePicker
                size="default"
                className="select"
                format="YYYY/MM/DD"
                defaultPickerValue={moment(DOB, "YYYY/MM/DD")}
                value={moment(DOB, "YYYY/MM/DD")}
                onChange={(e) => setDOB(e)}
            />
            <br />
            <h4>Đại chỉ email</h4>
            <Input
                placeholder="@xyz.com"
                prefix={<MailOutlined />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <h4>Số điện thoại</h4>
            <Input
                placeholder="+84"
                prefix={<PhoneOutlined />}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <h4>Tài khoản</h4>
            <Input
                disabled = {dataSelected}
                placeholder="xyz"
                prefix={<UserOutlined />}
                value={userLoginName}
                onChange={(e) => setUserLoginName(e.target.value)}
            />
            <br />
            <h4>Mật khẩu</h4>
            <Input.Password
                placeholder="Mật khẩu"
                prefix={<LockOutlined />}
                value={userPassword}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={(e) => { setUserPassword(e.target.value) }}
            />
            <br />
            <h4>Nhập lại mật khẩu</h4>
            <Input.Password
                placeholder="Mật khẩu"
                prefix={<LockOutlined />}
                value={userPassword2}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={(e) => { setUserPassword2(e.target.value) }}
            />
            <br />
        </Modal>)
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(UpdateEmployee);