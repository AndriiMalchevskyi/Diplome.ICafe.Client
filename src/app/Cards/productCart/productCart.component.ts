import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/Product';

@Component({
  selector: 'app-productcart',
  templateUrl: './productCart.component.html',
  styleUrls: ['./productCart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input() public product: Product;
  havePhoto = false;
  constructor() { }

  ngOnInit() {
  }

  RemoveFromCart(event: any) {
    let cart = this.getCartArray();
    if (cart !== null) {
      const index = this.indexOf(cart, this.product.Id);
      if (index !== -1) {
        cart.splice(index, 1);
        this.saveCartArray(cart);
      }
    }
  }

  changedCount(event: any) {
    let value =event.target.value;
    console.log(value);
    let cart = this.getCartArray();
    const index = this.indexOf(cart, this.product.Id);
    cart[index].Count = value;
    this.saveCartArray(cart);
  }

  indexOf(array: Array<Product>, id: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].Id === id) {
        return i;
      }

      return -1;
    }
  }

  getCartArray(): Array<Product> {
    return JSON.parse(localStorage.getItem('cart')) as Array<Product>;
  }

  saveCartArray(array: Array<Product>) {
    const cartJSON = JSON.stringify(array);
    localStorage.setItem('cart', cartJSON);
  }
}
