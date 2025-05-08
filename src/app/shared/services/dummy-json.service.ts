import { HttpClient } from '@angular/common/http';
import { Injectable, resource, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/DummyJSONModels';

@Injectable({
  providedIn: 'root'
})
export class DummyJsonService {
  readonly apiURL: string = 'https://dummyjson.com/products?limit=0&skip=0';
  constructor(private http: HttpClient) { }


  private id = signal(1);

  getAllProducts() {
    let myResource = resource({
      request: () => ({ id: this.id() }),
      loader: ({ request }) =>
        fetch(this.apiURL + request.id).then((response) => response.json()),
    });
    console.log('myresource status', myResource.status())
    console.log('myresource value', myResource.value())
    return myResource;
  }

  getAllProducts2(): Observable<any> {
    return this.http.get(this.apiURL);
    return of([]);

  }
}
