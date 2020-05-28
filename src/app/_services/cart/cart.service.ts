import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/_models/Order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl =  environment.apiUrl + 'order/';
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json;',  });
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    const token = localStorage.getItem('token');
    this.headers = headers.set('Authorization', token);
  }

  getOrder(id: number) {
    this.createAuthorizationHeader(this.headers);
    return this.http.get(this.baseUrl + id, {headers: this.headers});
  }

  getOrders(parameters: HttpParams) {
    this.createAuthorizationHeader(this.headers);
    console.log(parameters);
    return this.http.get(this.baseUrl, {headers: this.headers, params: parameters});
  }

  updateOrder(product: Order) {
    this.createAuthorizationHeader(this.headers);
    return this.http.put(this.baseUrl, product, {headers: this.headers});
  }

  addOrder(product: Order) {
    this.createAuthorizationHeader(this.headers);
    console.log(this.headers);
    return this.http.post(this.baseUrl, product, {headers: this.headers});
  }

  deleteOrder(id: number) {
    this.createAuthorizationHeader(this.headers);
    return this.http.delete(this.baseUrl + id, {headers: this.headers});
  }
}
