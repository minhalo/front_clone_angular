import { Component, OnInit, TemplateRef } from '@angular/core';
import { cart } from '../model/other';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AuthAPIService } from '../services/auth-api.service';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.scss'],
})
export class CartComponentComponent implements OnInit {
  cart: cart[] = [];
  index: number = 0;
  modalRef?: BsModalRef;
  constructor(
    private AuthAPIService: AuthAPIService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.AuthAPIService.historyCart(localStorage.getItem('token')).subscribe(
      (response) => {
        this.cart = response;
      }
    );
  }

  deleteCart(id: number) {
    console.log();
    this.AuthAPIService.deleteCart(id).subscribe((response) => {
      this.modalRef?.hide();
      this.AuthAPIService.historyCart(localStorage.getItem('token')).subscribe(
        (response) => {
          this.cart = response;
        }
      );
    });
  }

  openModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
