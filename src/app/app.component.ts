import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductsComponent } from './pages/products-old/products.component';
import { Customer, LoginCustomer } from './shared/models/BigBasketModels';
import { BigBasketService } from './shared/services/big-basket.service';
import { Constants } from './shared/constants/constant';
import { LocalStorageService } from './shared/services/local-storage.service';
import { FooterComponent } from './shared/components/footer/footer/footer.component';
import { HeaderComponent } from "./shared/components/header/header/header.component";
import {  DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, FooterComponent, HeaderComponent, DividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Angular_19_Ecommerce';
  @ViewChild("registerModal") registerModal: ElementRef | undefined;
  @ViewChild("loginModal") loginModal: ElementRef | undefined;
  loginObj: LoginCustomer = new LoginCustomer();
  resgisterObj: Customer = new Customer();
  masterService = inject(BigBasketService);
  localStorageService = inject(LocalStorageService);
  loggedUserData: Customer = new Customer();

  ngOnInit(): void {
    // const isUser = localStorage.getItem(Constants.LOCAL_STORAGE_USER);
    // if (isUser != null) {
    //   this.loggedUserData = JSON.parse(isUser);
    // }
    
    this.loggedUserData = JSON.parse(this.localStorageService.getItem(Constants.LOCAL_STORAGE_USER) || '{}');
  }

  openRegisterModalFunction() {
    if (this.registerModal) {
      this.registerModal.nativeElement.style.display = "block";
      this.registerModal.nativeElement.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
  }

  closeRegisterModalFunction() {
    if (this.registerModal) {
      this.registerModal.nativeElement.style.display = "none";
    }
  }
  onRegister() {
    this.masterService.registerNewCustomer(this.resgisterObj).subscribe((data) => {
      if (data.result) {
        alert("Customer Registered Successfully");
        this.closeRegisterModalFunction();
      } else {
        alert(`Error Occured: ${data.message}`);
      }
    });
  }

  openLoginModalFunction() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = "block";
      this.loginModal.nativeElement.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
  }

  closeLoginModalFunction() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = "none";
    }
  }

  onLogin() {
    this.masterService.loginCustomer(this.loginObj).subscribe((data) => {
      if (data.result) {
        this.loggedUserData = data.data;
        localStorage.setItem(Constants.LOCAL_STORAGE_USER, JSON.stringify(data.data));
        this.closeLoginModalFunction();
      } else {
        alert(`Error Occured: ${data.message}`);
      }
    });
  }

  logout() {
    this.localStorageService.removeItem(Constants.LOCAL_STORAGE_USER);
    this.loggedUserData = new Customer();
  }
}
