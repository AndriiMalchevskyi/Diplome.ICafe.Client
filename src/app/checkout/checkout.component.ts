import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/Product';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth/AuthService.service';
import { CartService } from '../_services/cart/cart.service';
import { Order } from '../_models/Order';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: Array<Product>;
  description: string;
  constructor(private router: Router, private alertify: AlertifyService,
    public authService: AuthService, public cartService: CartService) { }

  ngOnInit() {
    this.loadCart();
  }

  sum(): number {
    let sum = 0;
    const cart = JSON.parse(localStorage.getItem('cart')) as Array<Product>;
    cart.forEach(element => {
      sum += element.price * element.count;
    });
    return sum;
  }

  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cart')) as Array<Product>;
    console.log(this.products);
    if (this.products.length < 1) {
      this.router.navigate(['menu']);
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  createOrder() {
    let order = new Order();
    console.log(this.description);
    order.description = this.description;
    order.orderSummary = this.sum();
    order.productsIds = this.initProductIds();
    console.log(order.productsIds);
    this.cartService.addOrder(order).subscribe(next => {
      this.alertify.success('Created');
      localStorage.setItem('cart', '[]');
      this.router.navigate(['/menu']);
    }, error => {
      this.alertify.error(error);
    });
  }

  initProductIds(): any {
    let array = {};
      this.products.forEach(elem =>{
        array[elem.id] = elem.count;
      });
      console.log('initPro');
    
    return array;
  }
}
