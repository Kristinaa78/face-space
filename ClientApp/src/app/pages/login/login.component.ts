import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit() {}

  public submitLogin() {
    this.userService
      .login(this.user)
      .subscribe((x) => (this.userService.user = x.username));
  }

  public submitRegistration() {
    this.userService
      .register(this.user)
      .subscribe((x) => (this.userService.user = x.username));
  }

  public switchToRegistration() {
    this.registration = true;
  }
}
