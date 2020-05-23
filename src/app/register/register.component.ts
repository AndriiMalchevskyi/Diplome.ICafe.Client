import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/AuthService.service';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { Router } from '@angular/router';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    console.log('init');
  }

  register() {
    this.authService.register(this.user).subscribe((value) => {
      if (value.hasOwnProperty('mess')) {
        this.alertify.success(value['mess']);
      } else {
        this.alertify.success('');
      }
    }, error => {
      this.alertify.error(error);
    }, () => {
      const userToLogin = { login: this.user.email, password: this.user.password };
      this.authService.login(userToLogin).subscribe(() => {
        this.router.navigate(['/home']);
      });
    });
  }
}
