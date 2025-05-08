import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BigBasketService } from '../../shared/services/big-basket.service';
import { CartModel, Category, Customer, ProductModel } from '../../shared/models/BigBasketModels';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Constants } from '../../shared/constants/constant';
import { APIResponseModel } from '../../shared/models/APIResponseModel';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy{
  // productList: ProductModel[] = []; // old way
  categoryList$: Observable<Category[]> = new Observable<Category[]>(); // old way
  
  // categoryList$ = signal<Category[]>([]); // new way
  productList = signal<ProductModel[]>([]); // new way
  apiService = inject(BigBasketService);
  loggedUserData = new Customer();
  localStorageService = inject(LocalStorageService);

  constructor() { 
    // const isUser = localStorage.getItem(Constants.LOCAL_STORAGE_USER);
    this.loggedUserData = JSON.parse(this.localStorageService.getItem(Constants.LOCAL_STORAGE_USER) || '{}');

  }
  
  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList$ = this.apiService.getAllCategory().pipe(map((response) => response.data));
  }
  
  ngOnDestroy(): void {
    if (this.categoryList$) {
      //this.categoryList$.subscribe().unsubscribe();
    }
  }



  loadAllProducts() {
    this.apiService.getAllProducts().subscribe((response) => {
      const pattern =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

      response.data.forEach((product: ProductModel) => {
        if (!pattern.test(product.productImageUrl)) {
          product.productImageUrl = Constants.IMAGE_URL;
        }
      });
      this.productList.set(response.data);
    });
  }

  // addToCart() {}
  addToCart(productId: number) {
    const newCart = new CartModel();
    newCart.ProductId = productId;
    newCart.CustId  = this.loggedUserData.custId ?? 1;
    this.apiService.addToCart(newCart).subscribe((response: APIResponseModel) => {
      if (response.result) {
        alert('Product added to cart successfully');
      } else {
        alert(`Error Occured: ${response.message}`);
      }
    });
  }

  getProductByCateoryId(categoryId: number) {
    this.apiService.getProductByCategory(categoryId).subscribe((response: APIResponseModel) => {
      this.productList.set(response.data);
    });
  }

}
