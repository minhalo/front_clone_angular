import { Component, OnInit, TemplateRef } from '@angular/core';
import { genders } from '../model/gender';
import { role } from '../model/role';
import { AuthAPIService } from '../services/auth-api.service';
import { FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnInit {
  role: role[] = [];
  gender: genders[] = [];
  address: genders[] = [];
  modalRef?: BsModalRef;
  errReg: number = 0;
  errMessage: string = '';
  constructor(
    private AuthAPIService: AuthAPIService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {}

  deleteRole(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  createNewAddress(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  createNewRole(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createNewGender(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  deleteGender(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateRole(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.AuthAPIService.getRole(localStorage.getItem('token')).subscribe(
      (response) => {
        this.role = response;
      }
    );
    this.AuthAPIService.getGender().subscribe((response) => {
      this.gender = response;
    });
    this.AuthAPIService.getAddress().subscribe((response) => {
      this.address = response;
    });
  }
  searchAddressForm = this.formBuilder.group({
    name: '',
  });
  searchRoleForm = this.formBuilder.group({
    name: '',
  });

  createNewGenderr = this.formBuilder.group({
    name: '',
  });

  searchGenderForm = this.formBuilder.group({
    name: '',
  });

  createNewRoles = this.formBuilder.group({
    name: '',
  });

  updateRoles = this.formBuilder.group({
    name: '',
  });
  createNewAddresses = this.formBuilder.group({
    name: '',
  });

  onSearchGender() {
    if (this.searchGenderForm.value.name) {
      this.AuthAPIService.searchGenders(
        this.searchGenderForm.value.name as string
      ).subscribe((response) => {
        this.gender = response;
      });
    } else {
      this.AuthAPIService.getGender().subscribe((response) => {
        this.gender = response;
      });
    }
  }

  onSearchAddress() {
    if (this.searchAddressForm.value.name) {
      this.AuthAPIService.searchAddress(
        this.searchAddressForm.value.name as string
      ).subscribe((response) => {
        this.address = response;
      });
    } else {
      this.AuthAPIService.getAddress().subscribe((response) => {
        this.address = response;
      });
    }
  }

  onCreateAddress() {
    this.AuthAPIService.createAddressed(
      localStorage.getItem('token'),
      this.createNewAddresses.value.name as string
    ).subscribe((response) => {
      this.errReg = response.errCode;
      this.errMessage = response.errMessage;
      if (response.errCode == 0) {
        this.modalRef?.hide();
        this.createNewAddresses.reset();
        this.AuthAPIService.getAddress().subscribe((response) => {
          this.address = response;
        });
      }
    });
  }

  onCreateGender() {
    this.AuthAPIService.createGendersr(
      localStorage.getItem('token'),
      this.createNewGenderr.value.name as string
    ).subscribe((response) => {
      this.errReg = response.errCode;
      this.errMessage = response.errMessage;
      if (response.errCode == 0) {
        this.modalRef?.hide();
        this.createNewGenderr.reset();
        this.AuthAPIService.getGender().subscribe((response) => {
          this.gender = response;
        });
      }
    });
  }

  onCreateRoles() {
    this.AuthAPIService.createRoles(
      localStorage.getItem('token'),
      this.createNewRoles.value.name as string
    ).subscribe((response) => {
      this.errReg = response.errCode;
      this.errMessage = response.errMessage;
      if (response.errCode == 0) {
        this.modalRef?.hide();
        this.createNewRoles.reset();
        this.AuthAPIService.getRole(localStorage.getItem('token')).subscribe(
          (response) => {
            this.role = response;
          }
        );
      }
    });
  }

  onSearchRole() {
    if (this.searchRoleForm.value.name) {
      this.AuthAPIService.searchRoles(
        localStorage.getItem('token'),
        this.searchRoleForm.value.name as string
      ).subscribe((response) => {
        this.role = response;
      });
    } else {
      this.AuthAPIService.getRole(localStorage.getItem('token')).subscribe(
        (response) => {
          this.role = response;
        }
      );
    }
  }

  deleteGenderByAdmin(id: number) {
    this.AuthAPIService.deleteGender(
      localStorage.getItem('token'),
      id
    ).subscribe((response) => {
      this.modalRef?.hide();
      if (this.searchGenderForm.value.name) {
        this.AuthAPIService.searchGenders(
          this.searchRoleForm.value.name as string
        ).subscribe((response) => {
          this.gender = response;
        });
      } else {
        this.AuthAPIService.getGender().subscribe((response) => {
          this.gender = response;
        });
      }
    });
  }

  deleteRoleByAdmin(id: number) {
    this.AuthAPIService.deleteRole(localStorage.getItem('token'), id).subscribe(
      (response) => {
        this.modalRef?.hide();
        if (this.searchRoleForm.value.name) {
          this.AuthAPIService.searchRoles(
            localStorage.getItem('token'),
            this.searchRoleForm.value.name as string
          ).subscribe((response) => {
            this.role = response;
          });
        } else {
          this.AuthAPIService.getRole(localStorage.getItem('token')).subscribe(
            (response) => {
              this.role = response;
            }
          );
        }
      }
    );
  }
}
