import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');
    if(token) {
      const cloned = req.clone({
        setHeaders: {
          Authorziation: `Bearer ${token}`
        },
      });
      return next.handle(cloned);
    }
    
    return next.handle(req);
  }
};
