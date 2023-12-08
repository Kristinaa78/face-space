import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Room } from 'src/app/services/room/room';
import { RoomService } from 'src/app/services/room/room.service';
import { RoomSettingsComponent } from './room-settings/room-settings.component';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  providers: [DialogService],
})
export class RoomsListComponent implements OnInit {
  rooms!: Room[];
  ref: DynamicDialogRef | undefined;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.reloadRooms();
  }

  reloadRooms() {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

  joinRoom(roomId: number) {
    this.router.navigate(['/room/' + roomId]);
  }

  createOwnRoom() {
    this.ref = this.dialogService.open(RoomSettingsComponent, {
      header: "Conference room settings",
      width: '600px',
      contentStyle: { overflow: 'auto' },
      maximizable: false,
      modal: true,
    });

    this.ref.onClose.subscribe((data) => {
      this.reloadRooms();
    });

    // this.roomService.createRoom('roomecka').subscribe((x) => {
    //   this.reloadRooms();
    // });
  }
}
