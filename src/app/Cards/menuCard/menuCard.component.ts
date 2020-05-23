import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/Product';

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
    console.log(this.product);
    // tslint:disable-next-line: comment-format
    //if (this.product.Photo.Url.length !== 0) {
    //  this.havePhoto = true;
    //}
  }

  AddToCart(event: any) {
    console.log('add to cart ' + event);
  }
}
