// angular-specific
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// app-modules
import { AppRoutingModule } from './app-routing.module';

// app-components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RoomComponent } from './pages/rooms-list/room/room.component';
import { RoomsListComponent } from './pages/rooms-list/rooms-list.component';
import { RoomSettingsComponent } from './pages/rooms-list/room-settings/room-settings.component';
import { WaitingRoomComponent } from './pages/rooms-list/waiting-room/waiting-room.component';
import { RoomPasswordComponent } from './pages/rooms-list/room-password/room-password.component';

// app-services
import { UserService } from './services/user/user.service';

// primeng-related
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageService, SharedModule } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';


// other
import {WebcamModule} from 'ngx-webcam';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    WelcomeComponent,
    RoomComponent,
    RoomsListComponent,
    RoomSettingsComponent,
    WaitingRoomComponent,
    RoomPasswordComponent,
  ],
  imports: [
    RouterModule.forRoot(AppRoutingModule),
    BrowserAnimationsModule,
    WebcamModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MessagesModule,
    ToastModule,
    InputTextModule,
    CardModule,
    DynamicDialogModule,
    ChipModule,
    CheckboxModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    TooltipModule
  ],
  providers: [UserService, MessageService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
