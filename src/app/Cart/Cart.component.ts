import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/Product';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {
  products: Array<Product>;
  constructor() { }

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart')) as Array<Product>;
  }

  sum(): number {
    let sum = 0;
    const cart = JSON.parse(localStorage.getItem('cart')) as Array<Product>;
    cart.forEach(element => {
      sum += element.Price * element.Count;
    });
    return sum;
  }
}
