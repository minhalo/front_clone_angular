import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from '../services/auth-api.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { user } from '../model/user';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  currentpage: number = 1;
  page: number = 1;
  userUn: user[] = [];
  pages: number = 1;
  constructor(private AuthAPIService: AuthAPIService) {}

  ngOnInit(): void {
    this.AuthAPIService.userManage(
      localStorage.getItem('token'),
      this.page
    ).subscribe((response) => {
      this.userUn = response;
    });

    this.AuthAPIService.userManagePage(localStorage.getItem('token')).subscribe(
      (response) => {
        this.pages = response.Total;
      }
    );
  }
  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
  }
}
