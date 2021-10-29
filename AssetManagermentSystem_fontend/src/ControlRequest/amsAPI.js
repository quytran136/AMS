import request from '../Common/request'

const AMS_API = {
    signin: (body) =>{
        const url = "Access/Signin"
        return request.post(url, body);
    },
    signup: (body) =>{
        const url = "Access/Signup"
        return request.post(url, body);
    },
    userInformation: (body) => {
        const url = "User"
        return request.post(url, body);
    }
}

export default AMS_API;