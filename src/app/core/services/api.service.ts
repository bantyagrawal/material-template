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

  logOut() {
    return this.http.post(
      `${this.baseurl}/users/logout`,
      {},
      { withCredentials: true }
    );
  }

  getUser(data: any) {
    const option = {
      operation: 'read',
      module: 'Users Management',
    };
    let body: any = { ...option, ...data };
    body = this.api.encrypt(body);

    return this.http.post(`${this.baseurl}/users/getUser`, body, {
      withCredentials: true,
    });
  }

  getRole(data: any) {
    const option = {
      operation: 'read',
      module: 'Role Management',
    };
    let body: any = { ...option, ...data };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/roles/getRole`, body, {
      withCredentials: true,
    });
  }


  postLevel(url: any, data: any) {
    let body: any = { ...data };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/levels/${url}`, body, {
      withCredentials: true,
    });
  }

  getLevel(data: any = {}) {
    const option = {
      operation: 'read',
      module: 'Level Management',
    };
    let body: any = { ...option, ...data };
    body = this.api.encrypt(body);

    return this.http.post(
      `${this.baseurl}/levels/getLevel`,
      body,
      { withCredentials: true }
    );
  }

  createLevel(data: any) {
    const option = {
      operation: 'write',
      module: 'Level Management',
    };
    let body: any = { ...option, ...data };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/levels/createLevel`, body, {
      withCredentials: true,
    });
  }

  addRole(data: any) {
    const option = {
      operation: 'write',
      module: 'Role Management',
    };
    let body: any = { ...data, ...option };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/roles/createTestRole`, body, {
      withCredentials: true,
    });
  }

  PostRole(url: any) {
    const option = {
      operation: 'write',
      module: 'Role Management',
    };
    let body: any = { ...option };
    body = this.api.encrypt(body);

    return this.http.post(`${this.baseurl}/roles/${url}`, body, {
      withCredentials: true,
    });
  }


  updateRole(data: any) {
    const option = {
      operation: 'update',
      module: 'Role Management',
    };
    let body: any = { ...data, ...option };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/roles/updateRole`, body, {
      withCredentials: true,
    });
  }

  loggedInUsers(url: any) {
    return this.http.post(
      `${this.baseurl}/roles/${url}`,
      {},
      { withCredentials: true }
    );
  }

  deleteRole(data: any) {
    const option = {
      operation: 'delete',
      module: 'Role Management',
    };
    let body: any = { ...data, ...option };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/roles/deleteRole`, body, {
      withCredentials: true,
    });
  }

  getModules(data: any) {
    const option = {
      operation: 'delete',
      module: 'Module Management',
    };
    let body: any = { ...data, ...option };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/modules/getModule`, body, {
      withCredentials: true,
    });
  }

  AddModule(data: any) {
    const option = {
      operation: 'write',
      module: 'Module Management',
    };
    let body: any = { ...data, ...option };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/modules/createModule`, body, {
      withCredentials: true,
    });
  }

  AddUser(data: any) {
    const option = {
      operation: 'write',
      module: 'Users Management',
    };
    let body: any = { ...data, ...option };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/users/addUser`, body, {
      withCredentials: true,
    });
  }

  getChildRole() {
    const option = {
      operation: 'write',
      module: 'Users Management',
    };
    let body: any = { ...option };
    body = this.api.encrypt(body);
    return this.http.post(`${this.baseurl}/roles/getChildRole`, body, {
      withCredentials: true,
    });
  }
}
