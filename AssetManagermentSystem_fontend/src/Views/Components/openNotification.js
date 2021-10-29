import {notification } from 'antd';

const openNotification = (code, title, description, icon) => {
    notification.open({
        message: title,
        description: code + ' ' + description,
        className: 'custom-class',
        placement: 'bottomRight',
        icon: icon,
    });
};

export default openNotification;