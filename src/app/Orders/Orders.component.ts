import { Component, OnInit } from '@angular/core';
import { Order } from '../_models/Order';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { AuthService } from '../_services/auth/AuthService.service';
import { CartService } from '../_services/cart/cart.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-Orders',
  templateUrl: './Orders.component.html',
  styleUrls: ['./Orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Array<any>;
  progresBarVisible = true;
  constructor(private router: Router, private alertify: AlertifyService,
    public authService: AuthService, public cartService: CartService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const params = new HttpParams()
      .set('status', 'Open');
    this.cartService.getOrders(params).subscribe((orders: Order[]) => {
      this.orders = orders;
      console.log(this.orders);
      this.progresBarVisible = false;
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
