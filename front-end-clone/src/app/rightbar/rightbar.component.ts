import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AuthAPIService } from '../services/auth-api.service';
import { product } from '../model/product';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.scss'],
})
export class RightbarComponent implements OnInit {
  products: product[][] = [];
  a: number[] = [1, 2, 3];
  currentpage: number = 1;
  page: number = 1;
  constructor(private AuthAPIService: AuthAPIService) {}

  ngOnInit(): void {
    this.AuthAPIService.productPage(this.page).subscribe((response) => {
      this.products = response;
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    console.log(this.page);
  }
}
