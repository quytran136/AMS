import { hubConnection } from 'signalr-no-jquery'
import {
    SERVER_SIGNALR
} from './server';
export const connection = hubConnection(SERVER_SIGNALR)
export const hubProxy = connection.createHubProxy('amshub')

export function initSignalR(userName, onRequest, onError) {
    connection.logging = true;
    connection.start({ transport: ['serverSentEvents', 'longPolling'] })
        .done(() => {
            hubProxy.invoke('RegistConnect', userName, connection.id);
        })
        .fail(() => {
            connection.stop();
        })
    hubProxy.on('OnNotification', (message) => {
        let notification1 = JSON.parse(message)
        if (!notification1.Message) {
            if (notification1.Response) {
                onRequest(notification1)
            }
        } else {
            onError(notification1)
        }
    })
    return connection;
}

export function sentMessage(body){
    hubProxy.invoke('SentChat', body);
}

export function receiveMessage(onAction){
    hubProxy.on('ReceiveChat', (message) => {
        onAction(message)
    })
}