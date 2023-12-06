import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  joinRoom() {
    console.log('debug');
  }

  createOwnRoom() {
    console.log('debug');
  }
}
