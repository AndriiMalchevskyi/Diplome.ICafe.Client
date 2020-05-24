import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { AuthService } from '../_services/auth/AuthService.service';
import { ProductService } from '../_services/product/product.service';

@Component({
  selector: 'app-productDetail',
  templateUrl: './productDetail.component.html',
  styleUrls: ['./productDetail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product;
  havePhoto = false;
  isCreatedForm = false;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private productService: ProductService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.id = id;
        this.loadProduct(this.id);
        return;
      }
      this.isCreatedForm = true;
      this.product = new Product({title: 'Title', description: 'Description',
        category: 'Category', price: 1});
    });
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe((product: Product) => {
      this.product = new Product(product);
    }, error => {
      this.alertify.error(error);
    });
  }

  canBeUpdated() {
    const roleList = this.authService.DecodedToken().role as Array<any>;
    return roleList.indexOf('root') !== -1 || roleList.indexOf('sysadmin') !== -1 ||
    roleList.indexOf('admin') !== -1;
  }

  Save() {
    if (!this.isCreatedForm) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.alertify.success('Updated');
      }, error => {
        this.alertify.error(error);
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.alertify.success('Added');
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  AddToCart(event: any) {
    let cart = JSON.parse(localStorage.getItem('cart')) as Array<Product>;
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

  Delete(id: number) {
    if (confirm("Are you serious? Think twice and do once!")) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.alertify.success('Deleted');
        this.router.navigate(['menu']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  onChangePrice(event: any) {
    let value = event.target.value;
    this.product.price = value;
  }
}
