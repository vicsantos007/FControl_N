import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({ providedIn: 'root' })
export class SignalrService {
    constructor(
        ) { }


    hubConnection!: signalR.HubConnection;

    startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:44362/monitoramento', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();
    
        this.hubConnection
        .start()
        .then(() => {
            console.log('Hub Connection Started!');
        })
        .catch(err => console.log('Error while starting connection: ' + err))


        return this.hubConnection;
    }

    askServer() {
        this.hubConnection.invoke("receberMonitoramento", "hi", "00000000001")
            .catch(err => console.error(err));
  }
}























