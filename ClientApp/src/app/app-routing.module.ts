import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { RegisterComponent } from "./pages/register/register.component";
import { RoomComponent } from "./pages/room/room.component";

export const AppRoutingModule: Routes = [
    {
        path: 'login', component: LoginComponent, resolve: {}
    },
    {
        path: 'register', component: RegisterComponent, resolve: {}
    },
    {
        path: 'room', component: RoomComponent, resolve: {}
    },
    {
        path: '', component: WelcomeComponent, resolve: {}
    },
  ];
  
  