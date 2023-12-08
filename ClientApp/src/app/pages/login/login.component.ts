import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
    email: '',
  };

  submitted: boolean = false;
  registration: boolean = false;
  restorePassword: boolean = false;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.registration = params?.['registration'];
    });
  }

  public submitLogin() {
    this.userService.login(this.user).subscribe({
      next: (x) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login was successful.',
        });
        this.userService.user = x.username;
        window.location.href = '';
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
      },
    });
  }

  public submitRegistration() {
    this.userService.register(this.user).subscribe({
      next: (x) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration was successful.',
        });
        this.userService.user = x.username;
        window.location.href = '';
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
      },
    });
  }

  public switchToRegistration() {
    this.registration = true;
  }

  public forgottenPassword() {
    this.restorePassword = true;
    this.registration = false;
  }

  public resetPassword() {
    this.userService.resetPassword(this.user).subscribe({
      next: (x) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password was successfully updated.',
        });
        this.restorePassword = false;
        this.registration = false;
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
      },
    });
  }
}
