import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { RoomComponent } from "./pages/room/room.component";
import { RoomsListComponent } from "./pages/rooms-list/rooms-list.component";

export const AppRoutingModule: Routes = [
    {
        path: 'login', component: LoginComponent, resolve: {}
    },
    {
        path: 'room/:id', component: RoomComponent, resolve: {}
    },
    {
        path: 'rooms-list', component: RoomsListComponent, resolve: {}
    },
    {
        path: '', component: WelcomeComponent, resolve: {}
    },
  ];
  
  