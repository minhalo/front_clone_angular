import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../model/product';
import { AuthAPIService } from '../services/auth-api.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  id: number = 0;
  private sub: any;
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
  constructor(
    private route: ActivatedRoute,
    private AuthAPIService: AuthAPIService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.AuthAPIService.getDetailProduct(this.id).subscribe((response) => {
      this.detailProp = response;
    });
  }
}
