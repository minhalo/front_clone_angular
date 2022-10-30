import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from '../model/auth';
import { cate } from '../model/cate';
import { product } from '../model/product';
import { page } from '../model/page';

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
}
