import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from './../services/auth-api.service';
import { cate } from '../model/cate';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss'],
})
export class LeftbarComponent implements OnInit {
  categot: cate[] = [];

  constructor(private AuthAPIService: AuthAPIService) {}

  ngOnInit(): void {
    this.AuthAPIService.category().subscribe((response) => {
      this.categot = response;
    });
  }
}
