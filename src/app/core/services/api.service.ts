import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DecryptionService } from './decryption.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private api: DecryptionService,
    private cookieService: CookieService
  ) { }

  login(data: any) {
    data = this.api.encrypt(data);
    return this.http.post(`${this.baseurl}/users/login`, data, {
      withCredentials: true,
    });
  }

  loggedInUser() {
    return this.http.post(
      `${this.baseurl}/roles/user-info`,
      {},
      { withCredentials: true }
    );
  }
}
