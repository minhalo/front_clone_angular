import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from '../model/auth';
import { cate } from '../model/cate';
import { product } from '../model/product';
import { page } from '../model/page';
import { profile } from '../model/profile';
import { user } from '../model/user';
import { total } from '../model/total';
import { role } from '../model/role';
import { err, errCcc } from '../model/err';
import { genders } from '../model/gender';
import { userUpdate } from '../model/updateUser';
import { NumberSymbol } from '@angular/common';

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

  public pageVal(token: String | null, name: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<total>(
      `http://localhost:8081/api/user/page/search/page?name=${name}`,
      requestOptions
    );
  }

  public getRole(token: String | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<role[]>(
      `http://localhost:8081/api/getAllRole`,
      requestOptions
    );
  }

  public getCategory() {
    return this.http.get<genders[]>(`http://localhost:8081/api/category`);
  }

  public getList() {
    return this.http.get<genders[]>(`http://localhost:8081/api/list`);
  }

  public search(token: String | null, page: number, name: string) {
    return this.http.post<user[]>(
      `http://localhost:8081/api/user/page/search`,
      {
        name: name,
        authorization: `${token} bearer`,
        page: page,
      }
    );
  }

  public adminCreate(
    token: String | null,
    email: string,
    password: string,
    cpassword: string,
    role: number
  ) {
    return this.http.post<err>(`http://localhost:8081/api/createNewUser`, {
      email: email,
      authorization: `${token} bearer`,
      password: password,
      cpassword: cpassword,
      role: role,
    });
  }

  public addCart(userId: string | null, productId: number, total: number) {
    return this.http.post<errCcc>(`http://localhost:8081/api/addToCart`, {
      userId: userId,
      productId: productId,
      total: total,
    });
  }

  public banUser(token: String | null, id: number) {
    return this.http.patch<err>(`http://localhost:8081/api/banUser`, {
      authorization: `${token} bearer`,
      id: id,
    });
  }

  public getUpdateUser(token: String | null, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    const requestOptions = { headers: headers };
    return this.http.post<userUpdate>(
      `http://localhost:8081/api/getUpdateUser?id=${id}`,
      {
        authorization: `${token} bearer`,
      }
    );
  }

  public getDetailProduct(id: number) {
    return this.http.get<product>(
      `http://localhost:8081/api/user/product/detail?id=${id}`
    );
  }

  public searchRoles(token: String | null, name: string) {
    return this.http.post<role[]>(`http://localhost:8081/api/searchRole`, {
      authorization: `${token} bearer`,
      name: name,
    });
  }

  public searchCategorys(token: String | null, name: string) {
    return this.http.post<genders[]>(
      `http://localhost:8081/api/searchCategory`,
      {
        authorization: `${token} bearer`,
        name: name,
      }
    );
  }

  public searchLists(token: String | null, name: string) {
    return this.http.post<genders[]>(`http://localhost:8081/api/searchList`, {
      authorization: `${token} bearer`,
      name: name,
    });
  }

  public searchGenders(name: string) {
    return this.http.post<genders[]>(`http://localhost:8081/api/searchGender`, {
      name: name,
    });
  }

  public searchAddress(name: string) {
    return this.http.post<genders[]>(
      `http://localhost:8081/api/searchAddress`,
      {
        name: name,
      }
    );
  }

  public createRoles(token: String | null, name: string) {
    return this.http.post<errCcc>(`http://localhost:8081/api/createRole`, {
      authorization: `${token} bearer`,
      name: name,
    });
  }

  public createProducts(
    token: String | null,
    name: string,
    ListId: number,
    title: string,
    note: string,
    time: number,
    discount: number,
    price: number,
    status: number,
    myImage: any
  ) {
    return this.http.post<errCcc>(`http://localhost:8081/api/createProduct`, {
      authorization: `${token} bearer`,
      name: name,
      id: ListId,
      title: title,
      note: note,
      time: time,
      discount: discount,
      price: price,
      status: status,
      image: myImage,
    });
  }

  public createLists(token: String | null, name: string, id: number) {
    return this.http.post<errCcc>(`http://localhost:8081/api/createList`, {
      authorization: `${token} bearer`,
      name: name,
      id: id,
    });
  }

  public createAddressed(token: String | null, name: string) {
    return this.http.post<errCcc>(`http://localhost:8081/api/createAddress`, {
      authorization: `${token} bearer`,
      name: name,
    });
  }

  public createGendersr(token: String | null, name: string) {
    return this.http.post<errCcc>(`http://localhost:8081/api/createGender`, {
      authorization: `${token} bearer`,
      name: name,
    });
  }

  public createCategory(token: String | null, name: string) {
    return this.http.post<errCcc>(`http://localhost:8081/api/createCategory`, {
      authorization: `${token} bearer`,
      name: name,
    });
  }

  public deleteRole(token: String | null, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    return this.http.delete(`http://localhost:8081/api/deleteRole?id=${id}`, {
      headers: headers,
    });
  }

  public deleteGender(token: String | null, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    return this.http.delete(`http://localhost:8081/api/deleteGender?id=${id}`, {
      headers: headers,
    });
  }

  public deleteCategory(token: String | null, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    return this.http.delete(
      `http://localhost:8081/api/deleteCategory?id=${id}`,
      {
        headers: headers,
      }
    );
  }

  public deleteList(token: String | null, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    return this.http.delete(`http://localhost:8081/api/deleteList?id=${id}`, {
      headers: headers,
    });
  }

  public deleteAddress(token: String | null, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    return this.http.delete(
      `http://localhost:8081/api/deleteAddress?id=${id}`,
      {
        headers: headers,
      }
    );
  }

  public deleteUser(token: String | null, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `${token} bearer`,
    });

    const requestOptions = { headers: headers };
    return this.http.delete(`http://localhost:8081/api/deleteUser?id=${id}`, {
      headers: headers,
    });
  }

  public getGender() {
    return this.http.get<genders[]>(`http://localhost:8081/api/getGender`);
  }

  public getAddress() {
    return this.http.get<genders[]>(`http://localhost:8081/api/getAddress`);
  }

  public updateUser(
    token: String | null,
    name: string,
    address: number,
    age: number,
    gmail: string,
    role: number,
    id: number,
    gender: number,
    coin: number
  ) {
    return this.http.put<errCcc>(`http://localhost:8081/api/updateUser`, {
      name: name,
      address: address,
      gender: gender,
      age: age,
      gmail: gmail,
      id: id,
      role: role,
      authorization: `${token} bearer`,
      coin: coin,
    });
  }
}
