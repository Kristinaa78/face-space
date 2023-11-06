import { Component, OnInit } from '@angular/core';
import { ConferenceHubService } from 'src/app/services/conference/conference-hub.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public newMessage = "";

  constructor(public conferenceHubService: ConferenceHubService) { }

  ngOnInit() {
    this.conferenceHubService.createHubConnection("1");
  }

  public sendMessage() {
    this.conferenceHubService.sendMessage(this.newMessage);
    this.newMessage = "";
  }
}
