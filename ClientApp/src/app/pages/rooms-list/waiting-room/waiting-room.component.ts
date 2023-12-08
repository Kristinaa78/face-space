import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Room } from 'src/app/services/room/room';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit {
  roomId: number = 0;
  room!: Room;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.room = data['resolvedData'];
    });
  }
}
