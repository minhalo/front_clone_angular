import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model'

interface userData {
  errCode: number,
  user: {
    id: number,
    status: number,
    roleId:number,
    token:string
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  datas: userData
  user: string[] = []
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAll();

  }
  show(){
    console.log(this.datas.user);
  }
  getAll(){
    this.productService.getAll().subscribe((res:any)=>{
      this.datas = res
    })
  }
}
