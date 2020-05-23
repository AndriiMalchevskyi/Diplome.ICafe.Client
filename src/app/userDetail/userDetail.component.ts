import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../_services/user/user.service';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { AuthService } from '../_services/auth/AuthService.service';

@Component({
  selector: 'app-userDetail',
  templateUrl: './userDetail.component.html',
  styleUrls: ['./userDetail.component.css']
})
export class UserDetailComponent implements OnInit {
  id: number;
  user: User;
  havePhoto = false;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.loadUser(this.id);
  }

  loadUser(id: number) {
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = new User(user);
      console.log(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

  canBeUpdated() {
    console.log(this.authService.DecodedToken());
    let roleList = this.authService.decodedToken().role as Array<any>;
    return this.authService.DecodedToken().nameid === this.id ||
      roleList.indexOf('root') !== -1 || roleList.indexOf('sysadmin') !== -1 ||
    roleList.indexOf('admin') !== -1;
  }

  Save() {

  }
}
