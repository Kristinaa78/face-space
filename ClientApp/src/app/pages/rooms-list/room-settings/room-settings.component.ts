import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.scss'],
})
export class RoomSettingsComponent implements OnInit {
  roomSettingsForm!: FormGroup;
  users!: User[];

  constructor(
    public dynamicRef: DynamicDialogRef,
    private userService: UserService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // initialize room settings form -- as in RoomSettings interface
    this.roomSettingsForm = this.fb.group({
      id: new FormControl(0),
      roomName: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      roomPassword: new FormControl(null),
      participants: new FormControl(5, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      enableVideo: new FormControl(true, Validators.required),
      enableChat: new FormControl(true, Validators.required),
      invitedUsers: new FormControl(null),
    });

    this.userService.getAllUsers().subscribe((x) => {
      this.users = x.filter((h) => h.id != this.userService.user.id);
    });
  }

  createRoom() {
    console.log(this.roomSettingsForm.value);
  }
}
