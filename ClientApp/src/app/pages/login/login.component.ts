import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  public submitLogin() {
    this.userService.login(this.user).subscribe((x) => {
      this.userService.user = x.username;
      window.location.href="";
    });
  }

  public submitRegistration() {
    this.userService.register(this.user).subscribe((x) => {
      this.userService.user = x.username;

      window.location.href="";
    });
  }

  public switchToRegistration() {
    this.registration = true;
  }
}
