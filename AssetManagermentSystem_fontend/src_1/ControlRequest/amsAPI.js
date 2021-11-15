import request from '../Common/request'

const AMS_API = {
    signin: (body) =>{
        const url = "Access/Signin"
        return request.post(url, body);
    },
    signup: (body) =>{
        const url = "User/UserInformation"
        return request.post(url, body);
    },
    userInformation: (body) => {
        const url = "User/UserInformation"
        return request.post(url, body);
    },
    departmentChart: (body) =>{
        const url = "DepartmentChart/DepartmentControl"
        return request.post(url, body);
    },
    organizationalChart: (body) =>{
        const url = "OrganizationalChart/OrganizationalControl"
        return request.post(url, body);
    }
}

export default AMS_API;