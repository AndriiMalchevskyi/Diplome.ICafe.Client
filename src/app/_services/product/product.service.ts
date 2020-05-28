import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/_models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl =  environment.apiUrl + 'product/';
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json;',  });
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    const token = localStorage.getItem('token');
    this.headers = headers.set('Authorization', token);
  }

  getProduct(id: number) {
    this.createAuthorizationHeader(this.headers);
    return this.http.get(this.baseUrl + id, {headers: this.headers});
  }

  getProducts(parameters: any) {
    this.createAuthorizationHeader(this.headers);
    const params = new HttpParams().set('param', parameters);
    console.log(params);
    return this.http.get(this.baseUrl, {headers: this.headers, params: params});
  }

  updateProduct(product: Product) {
    this.createAuthorizationHeader(this.headers);
    return this.http.put(this.baseUrl, product, {headers: this.headers});
  }

  addProduct(product: Product) {
    this.createAuthorizationHeader(this.headers);
    return this.http.post(this.baseUrl, product, {headers: this.headers});
  }

  deleteProduct(id: number) {
    this.createAuthorizationHeader(this.headers);
    return this.http.delete(this.baseUrl + id, {headers: this.headers});
  }
}
