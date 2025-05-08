import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, shareReplay, tap, of} from 'rxjs';

export class cacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, Observable<HttpEvent<any>>>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.method !== 'GET') return next.handle(req);

    const cachedResponse = this.cache.get(req.urlWithParams);
    if(cachedResponse) {
      return cachedResponse;
    }

    const request = next.handle(req).pipe(
      shareReplay(1),
      tap((event) => {
        if(event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, of(event));
        }
      })
    );
    this.cache.set(req.urlWithParams,request);
    return request;
  }

  
};
