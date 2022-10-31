import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from '../model/auth';
import { cate } from '../model/cate';
import { product } from '../model/product';
import { page } from '../model/page';
import { profile } from '../model/profile';
import { user } from '../model/user';
import { total } from '../model/total';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIService {
  constructor(private http: HttpClient) {}

  public account(email: string, password: string) {
    return this.http.post<login>('http://localhost:8081/api/login', {
      email: email,
      password: password,
    });
  }

  public logout(token: string | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    const requestOptions = { headers: headers };

    return this.http.get('http://localhost:8081/api/logout', requestOptions);
  }

  public register(email: string, password: string, cpassword: string) {
    return this.http.post<{ errCode: Number; message: string }>(
      'http://localhost:8081/api/register',
      {
        email: email,
        password: password,
        cpassword: cpassword,
      }
    );
  }

  public category() {
    return this.http.get<cate[]>('http://localhost:8081/api/category');
  }

  public productPage(page?: number) {
    return this.http.get<product[][]>(
      `http://localhost:8081/api/product/page?page=${page}`
    );
  }

  public page() {
    return this.http.get<page>(`http://localhost:8081/api/page`);
  }

  public profile(token: String | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<profile>(
      `http://localhost:8081/api/user/profile`,
      requestOptions
    );
  }

  public userManage(token: String | null, page?: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<user[]>(
      `http://localhost:8081/api/user/page?page=${page}`,
      requestOptions
    );
  }

  public userManagePage(token: String | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<total>(
      `http://localhost:8081/api/user/page/searchAll`,
      requestOptions
    );
  }
}
