import request from '../Common/request'

const AMS_API = {
    signin: (body) => {
        const url = "Access/Signin"
        return request.post(url, body);
    },
    signup: (body) => {
        const url = "User/UserInformation"
        return request.post(url, body);
    },
    userInformation: (body) => {
        const url = "User/UserInformation"
        return request.post(url, body);
    },
    departmentChart: (body) => {
        const url = "DepartmentChart/DepartmentControl"
        return request.post(url, body);
    },
    organizationalChart: (body) => {
        const url = "OrganizationalChart/OrganizationalControl"
        return request.post(url, body);
    },
    processFlow: (body) => {
        const url = "ProcessFlow/ProcessControl"
        return request.post(url, body);
    },
    warehouse: (body) => {
        const url = "Warehouse/WarehouseControl"
        return request.post(url, body);
    },
    supplier: (body) => {
        const url = "Supplier/SupplierControl"
        return request.post(url, body);
    },
    asset: (body) => {
        const url = "Asset/AssetControl"
        return request.post(url, body);
    },
    config: (body) => {
        const url = "Config/ConfigControl"
        return request.post(url, body);
    },
    ticket: (body) => {
        const url = "Tickets/TicketsControl"
        return request.post(url, body);
    },
    notification: (body) => {
        const url = "Notification/NotificationControl"
        return request.post(url, body);
    },
    report: (body) => {
        const url = "Report/ReportControl"
        return request.post(url, body);
    }
}

export default AMS_API;