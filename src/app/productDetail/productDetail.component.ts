import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { AuthService } from '../_services/auth/AuthService.service';
import { ProductService } from '../_services/product/product.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/Photo';
import { stringify } from 'querystring';
import { isNullOrUndefined } from 'util';

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
  uploader: FileUploader;
  baseUrl =  environment.apiUrl;
  photos: Photo[] = [];
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private productService: ProductService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.id = id;
        this.loadProduct(this.id);
        this.initializeUploader();
        return;
      }
      this.product = new Product({title: 'Title', description: 'Description',
        category: 'Category', price: 1});
      this.isCreatedForm = true;
    });
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe((product: Product) => {
      this.product = product;
      console.log('PHOTOURL');
      console.log(this.product);
      if (!isNullOrUndefined(this.product.photoUrl)) {
        this.havePhoto = true;
      }
    }, error => {
      this.alertify.error(error);
    });
  }

  canBeUpdated() {
    const token = this.authService.DecodedToken();
    if (token !== null) {
    const roleList = token.role as Array<any>;
    return roleList.indexOf('root') !== -1 || roleList.indexOf('sysadmin') !== -1 ||
    roleList.indexOf('admin') !== -1;
  }
    return false;
  }

  Save() {
    if (!this.isCreatedForm) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.uploader.uploadAll();
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
        this.product.count = 1;
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

  initializeUploader() {
    console.log('initializeUploader');
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photo/product/' + this.id,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, responce, status, headers) => {
      if  (responce) {
        const res: Photo = JSON.parse(responce);
        const photo = {
          id: res.id,
          url: res.url,
          description: res.description,
        };
        this.photos.push(photo);
      }
    };
  }
}
