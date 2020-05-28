import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth/AuthService.service';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { Product } from '../_models/Product';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private alertify: AlertifyService, public authService: AuthService) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  isEmptyCart(): boolean {
    return this.CountOfItemsInCart() === 0;
  }

  CountOfItemsInCart(): number {
    const cart = JSON.parse(localStorage.getItem('cart')) as Array<Product>;
    return cart !== null ? cart.length : 0;
  }

  IsPersonal() {
    const roleList = this.authService.DecodedToken().role as Array<any>;
    return roleList.indexOf('root') !== -1 || roleList.indexOf('sysadmin') !== -1 ||
    roleList.indexOf('admin') !== -1 || roleList.indexOf('waiter') !== -1 || roleList.indexOf('cook') !== -1;
  }
}
