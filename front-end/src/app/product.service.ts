import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Product} from '../app/model/product.model';


const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'http://localhost:8085/api/getAllUser';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<Product[]>{
    return this.httpClient.get<Product[]>(apiUrl).pipe(
    )
  }
}
