// angular-specific
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// app-modules
import { AppRoutingModule } from './app-routing.module';

// app-components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    WelcomeComponent,
    RoomComponent,
  ],
  imports: [
    RouterModule.forRoot(AppRoutingModule),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    MessagesModule,
    ToastModule,
    InputTextModule,
    CardModule,
    ButtonModule
  ],
  providers: [UserService, MessageService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
