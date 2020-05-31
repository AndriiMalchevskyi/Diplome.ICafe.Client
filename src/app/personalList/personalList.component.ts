import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { UserService } from '../_services/user/user.service';
import { AuthService } from '../_services/auth/AuthService.service';

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
  constructor(private alertify: AlertifyService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.loadPersonalList('waiter');
  }

  isAdmin() {
    const token = this.authService.DecodedToken();
    if (token !== null) {
      const roleList = token.role as Array<any>;
      return roleList.indexOf('root') !== -1 || roleList.indexOf('sysadmin') !== -1 ||
      roleList.indexOf('admin') !== -1;
    }

    return false;
  }

  loadPersonalList(role: string) {
    console.log('loadPersonalList ' + role);
    this.userService.getUsers(role).subscribe((users: User[]) => {
      this.users = users;
      this.progresBarVisible = false;
    }, error => {
      this.alertify.error(error);
    });
  }
}
