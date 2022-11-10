import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AuthAPIService } from '../services/auth-api.service';
import { product } from '../model/product';
import { page } from '../model/page';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.scss'],
})
export class RightbarComponent implements OnInit {
  products: product[][] = [];
  a: number[] = [1, 2, 3, 4];
  currentpage: number = 1;
  page: number = 1;
  pageon: number = 1;

  prodit: product[] = [];
  constructor(private AuthAPIService: AuthAPIService) {}

  ngOnInit(): void {
    this.AuthAPIService.productPage(this.page).subscribe((response) => {
      this.products = response;
    });
    // // page
    this.AuthAPIService.page().subscribe((response) => {
      this.pageon = response.page;
    });
    this.AuthAPIService.getSugg().subscribe((response) => {
      this.prodit = response;
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;

    this.AuthAPIService.productPage(this.page).subscribe((response) => {
      this.products = response;
    });
  }
}
