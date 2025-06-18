import { Component, OnInit, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { Rating } from 'primeng/rating';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/';
@Component({
  selector: 'app-home',
  imports: [ CommonModule, DataView, Rating,  ButtonModule, Tag, SelectButton,FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 
  // private readonly apiURL: string = 'https://fakestoreapi.com/products';
  private readonly apiURL:string = 'https://dummyjson.com/products?limit=0&skip=0';
  // private id = signal(1);
  products = signal<any>([]);
  loading = signal(true);
  countries: any[] = [];
  selectedCountry: any

  // to set the layout of the dataview
  layout: string = 'grid';
  options = ['list', 'grid'];

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
    fetch(this.apiURL)
      .then((response) => response.json())
      .then((data) => {
        this.products.set(data.products);
        this.loading.set(false);
      })
      .catch((error) => { })
  }


  getSeverity(product: any) {
    switch (product.availabilityStatus) {
        case 'In Stock':
            return 'success';

        case 'Low Stock':
            return 'warn';

        case 'Out of Stock':
            return 'danger';

        default:
            return null;
    }
};

  // protected myResource = resource({
  //   request: () => ({ id: this.id() }),
  //   loader: ({ request }) =>
  //     fetch(BASE_URL + request.id).then((response) => response.json()),
  // });

  // protected fetchNext(): void {
  //   this.id.update((id) => id + 1);
  // }

  // protected myResource2 = resource({
  //   // request: () => ({ id: this.id() }),
  //   // loader: ({ request }) =>
  //   //   fetch(this.apiURL + `/${request.id}`).then((response) => response.json()),
  //   loader: () =>
  //     fetch(this.apiURL).then((response) => response.json()),
  // });
}
