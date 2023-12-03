import { formatDate } from '@angular/common';
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

  public recording = false;

  @ViewChild('videoPlayer') localvideoPlayer!: ElementRef;
  stream: any;
  peer: any;
  videos: Set<MediaStream> = new Set<MediaStream>();
  mediaRecorder: MediaRecorder | null = null;
  recordedBlobs: any[] = [];
  recordingName: string = "";
  
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

  public startRecording() {
    if (this.recording) {
      return;
    }

    this.recordedBlobs = [];

    this.recordingName = 'faceSPACE_' + formatDate(new Date(), 'yyyyMMddhhmmss', 'en-US');

    let options = { mimeType: 'video/webm'};
    this.mediaRecorder = new MediaRecorder(this.stream, options);

    // these lambdas are used on purpose so that `this` refers to RoomComponent in the functions
    this.mediaRecorder.ondataavailable = event => this.onRecorderDataAvailable(event);
    this.mediaRecorder.onstop = () => {
      this.storeRecording();

      this.recordedBlobs = []; // free up space
      this.recording = false;
    };

    this.mediaRecorder.start();

    this.recording = true;
  }

  public stopRecording() {
    if (!this.recording) {
      return;
    }

    this.mediaRecorder?.stop();
  }

  onRecorderDataAvailable(event: BlobEvent) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }

  storeRecording() {
    let options = { type: 'video/webm'};
    let blob = new Blob(this.recordedBlobs, options);

    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = this.recordingName + ".webm";
    link.click();
    link.remove();
  }

  addOtherUserVideo(stream: MediaStream) {
    this.videos.add(stream);
  }

  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }
}
