import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { DummyJsonService } from '../../../services/dummy-json.service';
import { FormsModule } from '@angular/forms';import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { AuthComponent } from "../../../../pages/auth/auth/auth.component";
import { LoginComponent } from "../../../../pages/auth/login/login.component";

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/';
@Component({
  selector: 'app-home',
  imports: [FormsModule, DropdownModule, CalendarModule, CommonModule, DatePickerModule, SelectModule, AuthComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 
  // private readonly apiURL: string = 'https://fakestoreapi.com/products';
  private readonly apiURL:string = 'https://dummyjson.com/products?limit=0&skip=0';
  private id = signal(1);
  countries: any[] = [];
  selectedCountry: any

  ngOnInit(): void {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
  ];
  }

  protected myResource = resource({
    request: () => ({ id: this.id() }),
    loader: ({ request }) =>
      fetch(BASE_URL + request.id).then((response) => response.json()),
  });

  protected fetchNext(): void {
    this.id.update((id) => id + 1);
  }

  protected myResource2 = resource({
    // request: () => ({ id: this.id() }),
    // loader: ({ request }) =>
    //   fetch(this.apiURL + `/${request.id}`).then((response) => response.json()),
    loader: () =>
      fetch(this.apiURL).then((response) => response.json()),
  });
}
