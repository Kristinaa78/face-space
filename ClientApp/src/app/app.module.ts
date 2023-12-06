// angular-specific
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { RoomComponent } from './pages/room/room.component';

// app-services
import { UserService } from './services/user/user.service';

// primeng-related
import { MessagesModule } from 'primeng/messages';
import { MessageService, SharedModule } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RoomsListComponent } from './pages/rooms-list/rooms-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    WelcomeComponent,
    RoomComponent,
    RoomsListComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutingModule),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    MessagesModule,
    ToastModule,
    InputTextModule,
    CardModule,
    ButtonModule,
  ],
  providers: [UserService, MessageService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
