import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RoomComponent } from './pages/rooms-list/room/room.component';
import { RoomsListComponent } from './pages/rooms-list/rooms-list.component';
import { WaitingRoomComponent } from './pages/rooms-list/waiting-room/waiting-room.component';
import { RoomResolver } from './resolvers/room.resolver';

export const AppRoutingModule: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: {},
  },
  {
    path: 'room/:id',
    component: RoomComponent,
    resolve: {},
  },
  {
    path: 'rooms-list',
    component: RoomsListComponent,
    resolve: {},
  },
  {
    path: 'waiting-room',
    component: WaitingRoomComponent,
    resolve: {
      resolvedData: RoomResolver,
    },
  },
  {
    path: '',
    component: WelcomeComponent,
    resolve: {},
  },
];
