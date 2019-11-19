import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;

  constructor() { }

  public startConnection = async () => {
    debugger;
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:5000/chatHub')
                            .build();

    try {
      await this.hubConnection.start();
      this.hubConnection.on('ReceiveMessage', (message: string) => {
        debugger;
        console.log('Message is ' + message);
      });
    } catch (error) {
      console.log('Error while starting connection: ' + error);
    }
   }
}
