import { inject, Injectable } from '@angular/core';
import { IApiBaseActions, ParamsType } from './api-base-actions.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { APIError } from '../../models/api-error.model';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService implements IApiBaseActions {

  httpClient = inject(HttpClient);
  constructor() { }
  Get(url: string, params?: ParamsType): Observable<any> {
    throw new Error('Method not implemented.');
  }
  GetAll(url: string, params?: ParamsType): Observable<any> {
    return this.httpClient
    .get(url, { params: this.createParams(params) })
    .pipe(
      catchError(error => this.handleError(error))
    );
  }
  Post(url: string, data: unknown, params?: ParamsType): Observable<any> {
    throw new Error('Method not implemented.');
  }
  Delete(url: string, data?: unknown, params?: ParamsType): Observable<any> {
    return this.httpClient
    .put(url, data, { params: this.createParams(params) })
    .pipe(
      catchError(error => this.handleError(error))
    );
  }
  Put(url: string, data: unknown, params?: ParamsType): Observable<any> {
    return this.httpClient
      .put(url, data, { params: this.createParams(params) })
      .pipe(
        catchError(error => this.handleError(error))
      );

  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const apiError: APIError = {
      status: error.status,
      message: error.error?.message || 'An unexpected error occurred.',
      details: error.message
    };
    // show primeng toastr
    return throwError(() => apiError);

  }

  createParams(params?: ParamsType) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.append(key, value);
      });
    }
    return httpParams;
  }
}
