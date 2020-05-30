import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { isNullOrUndefined } from 'util';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-menucard',
  templateUrl: './menuCard.component.html',
  styleUrls: ['./menuCard.component.css']
})
export class MenuCardComponent implements OnInit {
  @Input() public product: Product;
  havePhoto = false;
  constructor() {

   }

  ngOnInit() {
    if (!isNullOrUndefined(this.product.photoUrl)) {
     this.havePhoto = true;
    }
  }

  AddToCart(event: any) {
    let cart = JSON.parse(localStorage.getItem('cart')) as Array<Product>;
    if (cart == null) {
      cart = new Array<Product>();
    }

    const index = this.indexOf(cart, this.product.id);

    if (cart !== null) {
      if (index === -1) {
        cart.push(this.product);
      } else {
        cart[index].count += 1;
      }
    } else {
      cart = new Array<Product>();
      cart.push(this.product);
    }

    const cartJSON = JSON.stringify(cart);
    localStorage.setItem('cart', cartJSON);
    console.log(localStorage.getItem('cart'));
  }

  indexOf(array: Array<Product>, id: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return i;
      }
    }

    return -1;
  }
}
