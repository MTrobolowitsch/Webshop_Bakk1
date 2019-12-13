import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpInterceptor } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('id_token');

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    idToken)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
