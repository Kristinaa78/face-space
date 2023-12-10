import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-room-password',
  templateUrl: './room-password.component.html',
  styleUrls: ['./room-password.component.scss'],
})
export class RoomPasswordComponent implements OnInit {
  password: string = '';
  roomId: number = 0;
  webcamId: string = '';
  defaultMuteVideo!: boolean;
  defaultMuteChat!: boolean;

  constructor(
    private roomService: RoomService,
    public messageService: MessageService,
    public dynamicRef: DynamicDialogRef,
    private router: Router,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.roomId = this.config.data.roomId;
    this.webcamId = this.config.data.webcamId;
    console.log(this.config.data);
    this.defaultMuteVideo = this.config.data.defaultMuteVideo;
    this.defaultMuteChat = this.config.data.defaultMuteChat;
    console.log({ password: this.password, webcamId: this.webcamId, enableChat: this.defaultMuteChat, enableVideo: this.defaultMuteVideo });
  }

  checkPassword() {
    this.roomService
      .validateRoomPassword(this.roomId, this.password)
      .subscribe({
        next: (x) => {
          this.dynamicRef.close();
          this.router.navigate([
            '/room/' + this.roomId],
            { queryParams: { password: this.password, webcamId: this.webcamId, enableChat: this.defaultMuteChat, enableVideo: this.defaultMuteVideo } },
          );
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error,
          });
        },
      });
  }
}
