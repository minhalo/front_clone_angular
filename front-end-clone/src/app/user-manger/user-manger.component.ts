import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from '../services/auth-api.service';
@Component({
  selector: 'app-user-manger',
  templateUrl: './user-manger.component.html',
  styleUrls: ['./user-manger.component.scss'],
})
export class UserMangerComponent implements OnInit {
  constructor(private AuthAPIService: AuthAPIService) {}
  num: number = 1;
  ngOnInit(): void {}
  change(id: number) {
    this.num = id;
  }
}
