import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DecryptionService } from '../services/decryption.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private decrypt: DecryptionService,
    private toastr: ToastrService,
    private api: ApiService,
    private common: CommonService

  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse && event.body?.data) {
          try {
            const decryptedData = JSON.parse(
              this.decrypt.decrypt(event.body.data)
            );            
            return event.clone({ body: decryptedData });
          } catch (error) { }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let message = JSON.parse(
          this.decrypt.decrypt(error.error.data)
        ).message;
        this.toastr.error(message);
        if (
          message == 'Unauthorized request' ||
          message == 'Invalid access token' ||
          message == 'invalid token' ||
          message == 'jwt expired' ||
          error.status === 401
        ) {
          this.api.logOut().subscribe({
            next: (res: any) => { },
          });
          this.common.permissions = null;
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
