import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Peer from 'peerjs';
import { ConferenceHubService } from 'src/app/services/conference/conference-hub.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public newMessage = "";

  @ViewChild('videoPlayer') localvideoPlayer!: ElementRef;
  stream: any;
  peer: any;
  videos: Set<MediaStream> = new Set<MediaStream>();
  
  constructor(public conferenceHubService: ConferenceHubService,
              private userService: UserService) { }

  ngOnInit() {
    this.conferenceHubService.createHubConnection("1");
    this.createLocalStream();

    this.peer = new Peer(this.userService.user);

    this.peer.on('call', (call: any) => {
      call.answer(this.stream);

      call.on('stream', (otherUserVideoStream: MediaStream) => {
        this.addOtherUserVideo(otherUserVideoStream);
      });
    });
  }

  public callThem() {
    console.log(this.conferenceHubService.usersInRoom);
    this.videos.clear();
    this.conferenceHubService.usersInRoom.forEach((user: any) => {
      const call = this.peer.call(user, this.stream, {
        metadata: { userId: this.userService.user },
      });
      call.on('stream', (otherUserVideoStream: MediaStream) => {
        this.addOtherUserVideo(otherUserVideoStream);
      });
    });
  }

  public sendMessage() {
    this.conferenceHubService.sendMessage(this.newMessage);
    this.newMessage = "";
  }

  async createLocalStream() {
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localvideoPlayer.nativeElement.srcObject = this.stream;
    this.localvideoPlayer.nativeElement.load();
    this.localvideoPlayer.nativeElement.play();
  }

  addOtherUserVideo(stream: MediaStream) {
    this.videos.add(stream);
  }

  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }
}
