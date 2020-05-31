import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/Product';
import { Photo } from '../_models/Photo';
import { ProductService } from '../_services/product/product.service';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { AuthService } from '../_services/auth/AuthService.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-menulist',
  templateUrl: './menuList.component.html',
  styleUrls: ['./menuList.component.css']
})
export class MenuListComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  products = new Array<Product>();
  progresBarVisible = true;
  // productTemp = <Product>{id: 0, title: 'Product',
  // description: 'Boy favourable day can introduced sentiments entreaties. Noisier carried of in warrant because.',
  // price: 10, category: 'type', count: 1};
  constructor(private productService: ProductService, private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    //this.productTemp = <Product>{Title: 'Product', Description: 'Description', Price: 10, Category: 'type'};
    this.loadProducts('Soup');
  }

  loadProducts(category: string) {
    this.productService.getProducts(category).subscribe((products: Product[]) => {
      this.initProducts(products);
      this.progresBarVisible = false;
    }, error => {
      this.alertify.error(error);
    });
  }

  initProducts(products: Product[]) {
    this.products = new Array<Product>();
    products.forEach(elem => {
      this.products.push(new Product(elem));
    });
  }

  canBeCreated() {
    const token = this.authService.DecodedToken();
    if (token !== null) {
      const roleList = token.role as Array<any>;
      return roleList.indexOf('root') !== -1 || roleList.indexOf('sysadmin') !== -1 ||
      roleList.indexOf('admin') !== -1;
    }

    return false;
  }
}
