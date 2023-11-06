import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    username: "",
    password: "",
  }
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public submitRegistration() {
    this.userService.register(this.user).subscribe();
  }
}
