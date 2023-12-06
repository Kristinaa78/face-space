import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  rooms!: any[];
  constructor(private roomService: RoomService,
    private router: Router) { }

  ngOnInit() {
    this.reloadRooms();
  }

  reloadRooms() {
    this.roomService.getRooms().subscribe(x => {
      this.rooms = x;
    });
  }

  joinRoom(roomId: number) {
    this.router.navigate(["/room/" + roomId]);
  }

  createOwnRoom() {
    this.roomService.createRoom("roomecka").subscribe(x => {
      this.reloadRooms();
    });
  }
}
