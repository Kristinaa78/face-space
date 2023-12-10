import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Room } from 'src/app/services/room/room';
import { RoomService } from 'src/app/services/room/room.service';
import { RoomPasswordComponent } from '../room-password/room-password.component';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
  providers: [DialogService],
})
export class WaitingRoomComponent implements OnInit {
  roomId: number = 0;
  room!: Room;
  ref: DynamicDialogRef | undefined;
  showWebcam = false;
  webcamId = "";
  webcams!: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.room = data['resolvedData'];
    });
    navigator.mediaDevices.enumerateDevices().then(x => {
      console.log(x);
      this.webcams = x.filter(x => x.kind.endsWith("videoinput"));
    });
  }

  joinRoom() {
    console.log(this.webcamId);
    if (this.room.hasPassword) {
      this.ref = this.dialogService.open(RoomPasswordComponent, {
        header: 'Room password',
        data: {
          roomId: this.room.id,
          webcamId: this.webcamId,
          defaultMuteVideo: this.room.enableVideo,
          defaultMuteChat: this.room.enableChat
        },
        width: '400px',
        contentStyle: { overflow: 'auto' },
        maximizable: false,
        modal: true,
      });
    } else {
      this.router.navigate(['/room/' + this.room.id]);
    }
  }
}
