import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-waitersList',
  templateUrl: './waitersList.component.html',
  styleUrls: ['./waitersList.component.css']
})
export class WaitersListComponent implements OnInit {
  userTemp = <User>{id: 1, userName: 'Username', name: 'Name',
  surname: 'Surname'};
  users: User[];
  progresBarVisible = true;
  constructor(private alertify: AlertifyService, private userService: UserService) { }

  ngOnInit() {
    this.loadPersonalList();
  }

  loadPersonalList() {
    this.userService.getUsers('waiter').subscribe((users: User[]) => {
      this.users = users;
      this.progresBarVisible = false;
    }, error => {
      this.alertify.error(error);
    });
  }
}
