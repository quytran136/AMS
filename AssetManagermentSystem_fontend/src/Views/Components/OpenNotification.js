import {notification } from 'antd';

const OpenNotification = (code, title, description, icon) => {
    notification.open({
        message: title,
        description: code + ' ' + description,
        className: 'custom-class',
        placement: 'bottomRight',
        icon: icon,
    });
};

export default OpenNotification;