import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  user!: { name: string };
  avatar!: any;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUser().subscribe((x) => {
      this.userService.user = x.name;
      this.user = x;
    });
  }

  signOut() {
    this.userService.signOut().subscribe(x => window.location.href="/login");
  }
}
