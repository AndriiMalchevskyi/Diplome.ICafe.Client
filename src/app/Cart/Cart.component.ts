import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {
  products: Array<Product>;
  constructor(private router: Router) { }

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
}
