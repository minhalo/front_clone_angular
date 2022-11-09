import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../model/product';
import { AuthAPIService } from '../services/auth-api.service';
import { Observable } from 'rxjs';
import { AppStateInterface } from '../model/appState.interface';
import { select, Store } from '@ngrx/store';
import { tokenSelector } from '../state/auth/auth.selector';
import * as formAction from '../state/auth/auth.actions';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  id: number = 0;
  private sub: any;
  errReg: number = 0;
  errMessage: string = '';
  num: number = 0;
  check: boolean = false;
  detailProp: product = {
    discount: 0,
    id: 0,
    image: '',
    name: '',
    note: '',
    price: 0,
    status: 0,
    timeleft: 0,
    title: '',
    type: '',
  };

  token$: Observable<String | null>;
  constructor(
    private route: ActivatedRoute,
    private AuthAPIService: AuthAPIService,
    private store: Store<AppStateInterface>
  ) {
    this.token$ = this.store.pipe(select(tokenSelector));
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.AuthAPIService.getDetailProduct(this.id).subscribe((response) => {
      this.detailProp = response;
    });
  }

  addCarts() {
    if (this.num > 0) {
      this.AuthAPIService.addCart(
        localStorage.getItem('token'),
        this.id,
        this.detailProp.discount * this.num
      ).subscribe((response) => {
        this.errReg = response.errCode;
        this.errMessage = response.errMessage;
        console.log(response);
        if (response.errCode == 0) {
          this.check = true;
          this.store.dispatch(
            formAction.updateRequest({
              coin:
                Number(localStorage.getItem('coin')) -
                this.detailProp.discount * this.num,
            })
          );
          localStorage.setItem(
            'coin',
            JSON.stringify(
              Number(localStorage.getItem('coin')) -
                this.detailProp.discount * this.num
            )
          );
          setTimeout(() => {
            this.check = false;
          }, 2000);

          this.num = 0;
        }
      });
    } else {
      this.errReg = 1;
      this.errMessage = 'Invalid num';
    }
  }
}
