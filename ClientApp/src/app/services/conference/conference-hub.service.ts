import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ConferenceHubService {

  private hubConnection!: HubConnection;
  public messages: any = [];
  public usersInRoom: any = [];

  constructor() { }

  createHubConnection(roomId: string){
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('hub?roomId=' + roomId, {}).withAutomaticReconnect().build()

    this.hubConnection.start().catch(err => console.log(err));

    this.hubConnection.on('NewMessage', message => {
      this.messages.push(message);
    });

    this.hubConnection.on('AllConnected', message => {
      this.usersInRoom = message;
    });
  }

  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }

  async sendMessage(content: string){
    return this.hubConnection.invoke('SendMessage', content)
      .catch(error => console.log(error));
  }
}
