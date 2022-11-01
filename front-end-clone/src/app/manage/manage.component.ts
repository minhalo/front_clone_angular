import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthAPIService } from '../services/auth-api.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FormBuilder } from '@angular/forms';

import { user } from '../model/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { role } from '../model/role';
import { err } from '../model/err';

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
  modalRef?: BsModalRef;
  role: role[] = [];
  errReg: number = -1;
  errMes: string = '';
  constructor(
    private AuthAPIService: AuthAPIService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteUser(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.AuthAPIService.userManage(
      localStorage.getItem('token'),
      this.page
    ).subscribe((response) => {
      this.userUn = response;
    });

    this.AuthAPIService.getRole(localStorage.getItem('token')).subscribe(
      (response) => {
        this.role = response;
      }
    );
    this.AuthAPIService.userManagePage(localStorage.getItem('token')).subscribe(
      (response) => {
        this.pages = response.Total;
      }
    );
  }
  checkoutForm = this.formBuilder.group({
    search: '',
  });

  createNewAcc = this.formBuilder.group({
    email: '',
    password: '',
    cpassword: '',
    role: '1',
  });

  onCreate() {
    this.AuthAPIService.adminCreate(
      localStorage.getItem('token'),
      this.createNewAcc.value.email as string,
      this.createNewAcc.value.password as string,
      this.createNewAcc.value.cpassword as string,
      Number(this.createNewAcc.value.role)
    ).subscribe((response) => {
      (this.errReg = response.errCode), (this.errMes = response.message);
    });

    if (this.errReg === 0) {
      this.modalRef?.hide();
      this.AuthAPIService.userManage(
        localStorage.getItem('token'),
        this.page
      ).subscribe((response) => {
        this.userUn = response;
      });
      this.AuthAPIService.userManagePage(
        localStorage.getItem('token')
      ).subscribe((response) => {
        this.pages = response.Total;
      });
    }
  }

  deleteUsers(id: number) {
    this.AuthAPIService.deleteUser(localStorage.getItem('token'), id).subscribe(
      (response) => {
        this.modalRef?.hide();
        this.AuthAPIService.userManage(
          localStorage.getItem('token'),
          this.page
        ).subscribe((response) => {
          this.userUn = response;
        });

        this.AuthAPIService.userManagePage(
          localStorage.getItem('token')
        ).subscribe((response) => {
          this.pages = response.Total;
        });
      }
    );
  }

  banUsers(id: number) {
    this.AuthAPIService.banUser(localStorage.getItem('token'), id).subscribe(
      (response) => {
        this.AuthAPIService.userManage(
          localStorage.getItem('token'),
          this.page
        ).subscribe((response) => {
          this.userUn = response;
        });

        this.AuthAPIService.userManagePage(
          localStorage.getItem('token')
        ).subscribe((response) => {
          this.pages = response.Total;
        });
      }
    );
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    if (this.checkoutForm.value.search) {
      this.AuthAPIService.userManage(
        localStorage.getItem('token'),
        this.page
      ).subscribe((response) => {
        this.userUn = response;
      });
    } else {
      this.AuthAPIService.search(
        localStorage.getItem('token'),
        this.page,
        this.checkoutForm.value.search || ''
      ).subscribe((response) => {
        this.userUn = response;
      });
    }
  }

  onSubmit() {
    this.page = 1;
    if (this.checkoutForm.value.search) {
      this.AuthAPIService.search(
        localStorage.getItem('token'),
        this.page,
        this.checkoutForm.value.search
      ).subscribe((response) => {
        this.userUn = response;
      });
      this.AuthAPIService.pageVal(
        localStorage.getItem('token'),
        this.checkoutForm.value.search
      ).subscribe((response) => {
        this.pages = response.Total;
        console.log(response);
      });
    } else {
      this.AuthAPIService.userManagePage(
        localStorage.getItem('token')
      ).subscribe((response) => {
        this.pages = response.Total;
      });
      this.AuthAPIService.userManage(
        localStorage.getItem('token'),
        this.page
      ).subscribe((response) => {
        this.userUn = response;
      });
    }
  }
}
