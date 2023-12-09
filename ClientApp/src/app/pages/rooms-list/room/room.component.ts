import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import Peer from 'peerjs';
import { ConferenceHubService } from 'src/app/services/conference/conference-hub.service';
import { Room } from 'src/app/services/room/room';
import { RoomService } from 'src/app/services/room/room.service';
import { UserService } from 'src/app/services/user/user.service';

type Video = {
  stream: MediaStream;
  user: string;
};

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  public newMessage = '';
  public recording = false;
  public screenSharing = false;
  room!: Room;

  @ViewChild('videoPlayer') localvideoPlayer!: ElementRef;
  stream: any;
  shareScreenStream: any;
  peer: any;
  shareScreenPeer: any;
  videos: Video[] = [];

  sharingTo: any[] = [];
  mediaRecorder: MediaRecorder | null = null;
  recordedBlobs: any[] = [];
  recordingName: string = '';
  enableVideo = true;
  enableAudio = true;
  webcamId!: string;

  password!: string;
  id!: string;

  size: number = 600; // basic size

  constructor(
    public conferenceHubService: ConferenceHubService,
    private roomService: RoomService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.password = this.route.snapshot.queryParams['password'];
    this.webcamId = this.route.snapshot.queryParams['webcamId'];

    this.roomService.getRoomById(Number(this.id)).subscribe((x) => {
      this.room = x;

      this.joinRoom();
      this.innerWidth = window.innerWidth;
      this.calculateVideoSize();
    });
  }

  joinRoom() {
    this.conferenceHubService.createHubConnection(this.id, this.password);
    this.createLocalStream();

    this.peer = new Peer(this.userService.user);

    this.peer.on('call', (call: any) => {
      call.answer(this.stream);

      call.on('stream', (otherUserVideoStream: MediaStream) => {
        this.addOtherUserVideo(otherUserVideoStream, call.metadata.userId);
      });
    });

    this.shareScreenPeer = new Peer('screen_' + this.userService.user);

    this.shareScreenPeer.on('call', (call: any) => {
      call.answer(this.shareScreenStream);

      call.on('stream', (otherUserVideoStream: MediaStream) => {
        this.shareScreenStream = otherUserVideoStream;
        this.sharingStarted();
      });

      call.on('close', () => this.sharingStopped());
    });
  }

  public callThem() {
    console.log(this.conferenceHubService.usersInRoom);
    this.videos = [];
    this.conferenceHubService.usersInRoom.forEach((user: any) => {
      setTimeout(() => {
        const call = this.peer.call(user, this.stream, {
          metadata: { userId: this.userService.user },
        });
        call.on('stream', (otherUserVideoStream: MediaStream) => {
          this.addOtherUserVideo(otherUserVideoStream, user);
        });
      }, 1000);
    });
  }

  public innerWidth: any;

  @ViewChild('webcamGrid') webcamGrid: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.calculateVideoSize();
  }

  public calculateVideoSize() {
    switch (this.videos.length + 1) {
      case 1: {
        this.size = this.innerWidth / 2;
        break;
      }
      case 2: {
        this.size = this.innerWidth / 3.8;
        break;
      }
      case 3: {
        this.size = this.innerWidth / 5.6;
        break;
      }
      case 4: {
        this.size = this.innerWidth / 5.6;
        break;
      }
      case 5: {
        this.size = this.innerWidth / 5.6;
        break;
      }
      case 6: {
        this.size = this.innerWidth / 5.6;
        break;
      }
      case 7: {
        this.size = this.innerWidth /  6.1;
        break;
      }
      case 8: {
        this.size = this.innerWidth / 6.1;
        break;
      }
      case 9: {
        this.size = this.innerWidth / 6.1;
        break;
      }
      default: {
        this.size = 300;
        break;
      }
    }
  }

  public sendMessage() {
    this.conferenceHubService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  async createLocalStream() {
    if (this.webcamId == null || this.webcamId == '')
    {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
    } else {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: this.webcamId }
        }
      });
    }
    this.localvideoPlayer.nativeElement.srcObject = this.stream;
    this.localvideoPlayer.nativeElement.load();
    this.localvideoPlayer.nativeElement.play();
  }

  public startRecording() {
    if (this.recording) {
      return;
    }

    this.recordedBlobs = [];

    this.recordingName =
      'faceSPACE_' + formatDate(new Date(), 'yyyyMMddhhmmss', 'en-US');

    let options = { mimeType: 'video/webm' };
    this.mediaRecorder = new MediaRecorder(this.stream, options);

    // these lambdas are used on purpose so that `this` refers to RoomComponent in the functions
    this.mediaRecorder.ondataavailable = (event) =>
      this.onRecorderDataAvailable(event);
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

  async shareScreen() {
    if (this.screenSharing) {
      return;
    }

    let options = {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
      video: true,
    };

    let mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
    this.shareScreenStream = mediaStream;

    this.sharingTo = [];
    this.videos.forEach((v) => {
      const call = this.shareScreenPeer.call('screen_' + v.user, mediaStream);
      this.sharingTo.push(call);
    });

    mediaStream.getVideoTracks()[0].addEventListener('ended', () => {
      this.sharingTo.forEach((v) => v.close());
      this.sharingStopped();
    });

    this.sharingStarted();
  }

  onRecorderDataAvailable(event: BlobEvent) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }

  storeRecording() {
    let options = { type: 'video/webm' };
    let blob = new Blob(this.recordedBlobs, options);

    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = this.recordingName + '.webm';
    link.click();
    link.remove();
  }

  sharingStarted() {
    this.screenSharing = true;
  }

  sharingStopped() {
    this.screenSharing = false;
  }

  addOtherUserVideo(stream: MediaStream, user: string) {
    this.calculateVideoSize();
    if (!this.videos.map((x) => x.user).includes(user)) {
      this.videos.push({ stream, user });
    }
  }

  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }

  muteVideo() {
    this.enableVideo = !this.enableVideo;
    if (this.stream.getVideoTracks()[0]) {
      this.stream.getVideoTracks()[0].enabled = this.enableVideo;
    }
  }

  muteAudio() {
    this.enableAudio = !this.enableAudio;
    if (this.stream.getAudioTracks()[0]) {
      this.stream.getAudioTracks()[0].enabled = this.enableAudio;
    }
  }
}
