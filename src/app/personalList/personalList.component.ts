import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { UserService } from '../_services/user/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-personalList',
  templateUrl: './personalList.component.html',
  styleUrls: ['./personalList.component.css']
})
export class PersonalListComponent implements OnInit {
  userTemp = <User>{id: 1, userName: 'Username', name: 'Name',
  surname: 'Surname'};
  users: User[];
  progresBarVisible = true;
  constructor(private alertify: AlertifyService, private userService: UserService) { }

  ngOnInit() {
    this.loadPersonalList();
  }


  loadPersonalList() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
      this.progresBarVisible = false;
    }, error => {
      this.alertify.error(error);
    });
  }
}
