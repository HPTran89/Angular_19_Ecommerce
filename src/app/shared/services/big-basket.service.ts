import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../models/APIResponseModel'; // Adjust the path as necessary
import { CartModel, Customer, LoginCustomer } from '../models/BigBasketModels';

@Injectable({
  providedIn: 'root'
})
export class BigBasketService {
  apiUrl = 'https://freeapi.miniprojectideas.com/api/BigBasket'; // URL to web api

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + '/GetAllProducts');
  }

  getAllCategory(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + '/GetAllCategory');
  }

  getProductByCategory(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + '/GetAllProductsByCategoryId?id=' + id);
  }

  registerNewCustomer(obj: Customer): Observable<APIResponseModel> {
    const url = `${this.apiUrl}/RegisterCustomer`;
    return this.http.post<APIResponseModel>(url, obj);
  }

  loginCustomer(obj: LoginCustomer): Observable<APIResponseModel> {
    const url = `${this.apiUrl}/Login`;
    return this.http.post<APIResponseModel>(url, obj);
  }

  addToCart(obj: CartModel): Observable<APIResponseModel> {
    const url = `${this.apiUrl}/AddToCart`;
    return this.http.post<APIResponseModel>(url, obj);
  }

  clickOnOrder = () => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>console.log(json))
  }

}
