import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/Product';
import { Photo } from '../_models/Photo';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-menulist',
  templateUrl: './menuList.component.html',
  styleUrls: ['./menuList.component.css']
})
export class MenuListComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  productTemp = <Product>{Id: 0, Title: 'Product',
  Description: 'Boy favourable day can introduced sentiments entreaties. Noisier carried of in warrant because.',
  Price: 10, Category: 'type' };
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    //this.productTemp = <Product>{Title: 'Product', Description: 'Description', Price: 10, Category: 'type'};
  }

}
