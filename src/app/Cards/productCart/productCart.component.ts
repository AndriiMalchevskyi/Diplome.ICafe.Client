import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/_models/Product';

@Component({
  selector: 'app-productcart',
  templateUrl: './productCart.component.html',
  styleUrls: ['./productCart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input() public product: Product;
  @Output() public onDeleted = new EventEmitter<boolean>();

  havePhoto = false;
  constructor() { }

  ngOnInit() {
  }

  RemoveFromCart(event: any) {
    let cart = this.getCartArray();
    if (cart !== null) {
      const index = this.indexOf(cart, this.product.id);
      if (index !== -1) {
        cart.splice(index, 1);
        this.saveCartArray(cart);
        this.deletedItemeFromCart(true);
      }
    }
  }

  changedCount(event: any) {
    let value = event.target.value;
    let cart = this.getCartArray();
    const index = this.indexOf(cart, this.product.id);
    cart[index].count = value;
    this.saveCartArray(cart);
  }

  indexOf(array: Array<Product>, id: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return i;
      }
    }

    return -1;
  }

  decreaseCount() {
    this.product.count -= 1;
  }

  increaseCount() {
    this.product.count += 1;
  }

  getCartArray(): Array<Product> {
    return JSON.parse(localStorage.getItem('cart')) as Array<Product>;
  }

  deletedItemeFromCart(deleted: boolean) {
    this.onDeleted.emit(deleted);
  }
  
  saveCartArray(array: Array<Product>) {
    const cartJSON = JSON.stringify(array);
    localStorage.setItem('cart', cartJSON);
  }
}
