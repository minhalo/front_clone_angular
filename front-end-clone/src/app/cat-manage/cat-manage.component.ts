import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthAPIService } from '../services/auth-api.service';
import { FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { genders } from '../model/gender';

@Component({
  selector: 'app-cat-manage',
  templateUrl: './cat-manage.component.html',
  styleUrls: ['./cat-manage.component.scss'],
})
export class CatManageComponent implements OnInit {
  modalRef?: BsModalRef;
  errReg: number = 0;
  errMessage: string = '';
  category: genders[] = [];
  list: genders[] = [];

  constructor(
    private AuthAPIService: AuthAPIService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {}

  createNewCategory(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createNewList(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteCategory(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  deleteList(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.AuthAPIService.getCategory().subscribe((response) => {
      this.category = response;
    });

    this.AuthAPIService.getList().subscribe((response) => {
      this.list = response;
    });
  }

  searchCategoryForm = this.formBuilder.group({
    name: '',
  });
  createNewCategorys = this.formBuilder.group({
    name: '',
  });
  searchListForm = this.formBuilder.group({
    name: '',
  });
  createNewLists = this.formBuilder.group({
    name: '',
    category: '1',
  });

  onSearchList() {
    if (this.searchListForm.value.name) {
      this.AuthAPIService.searchLists(
        localStorage.getItem('token'),
        this.searchListForm.value.name as string
      ).subscribe((response) => {
        this.list = response;
      });
    } else {
      this.AuthAPIService.getList().subscribe((response) => {
        this.list = response;
      });
    }
  }

  onSearchCategory() {
    if (this.searchCategoryForm.value.name) {
      this.AuthAPIService.searchCategorys(
        localStorage.getItem('token'),
        this.searchCategoryForm.value.name as string
      ).subscribe((response) => {
        this.category = response;
      });
    } else {
      this.AuthAPIService.getCategory().subscribe((response) => {
        this.category = response;
      });
    }
  }

  onCreateLists() {
    this.AuthAPIService.createLists(
      localStorage.getItem('token'),
      this.createNewLists.value.name as string,
      Number(this.createNewLists.value.category)
    ).subscribe((response) => {
      this.errReg = response.errCode;
      this.errMessage = response.errMessage;
      if (response.errCode == 0) {
        this.modalRef?.hide();
        this.createNewLists.reset({
          name: '',
          category: '1',
        });
        this.AuthAPIService.getList().subscribe((response) => {
          this.list = response;
        });
      }
    });
  }

  onCreateCategorys() {
    this.AuthAPIService.createCategory(
      localStorage.getItem('token'),
      this.createNewCategorys.value.name as string
    ).subscribe((response) => {
      this.errReg = response.errCode;
      this.errMessage = response.errMessage;
      if (response.errCode == 0) {
        this.modalRef?.hide();
        this.createNewCategorys.reset();
        this.AuthAPIService.getCategory().subscribe((response) => {
          this.category = response;
        });
      }
    });
  }

  deleteCategoryByAdmin(id: number) {
    this.AuthAPIService.deleteCategory(
      localStorage.getItem('token'),
      id
    ).subscribe((response) => {
      this.modalRef?.hide();
      if (this.searchCategoryForm.value.name) {
        this.AuthAPIService.searchCategorys(
          localStorage.getItem('token'),
          this.searchCategoryForm.value.name as string
        ).subscribe((response) => {
          this.category = response;
        });
      } else {
        this.AuthAPIService.getCategory().subscribe((response) => {
          this.category = response;
        });
      }
    });
  }

  deleteListByAdmin(id: number) {
    this.AuthAPIService.deleteList(localStorage.getItem('token'), id).subscribe(
      (response) => {
        this.modalRef?.hide();
        if (this.searchListForm.value.name) {
          this.AuthAPIService.searchLists(
            localStorage.getItem('token'),
            this.searchListForm.value.name as string
          ).subscribe((response) => {
            this.list = response;
          });
        } else {
          this.AuthAPIService.getList().subscribe((response) => {
            this.list = response;
          });
        }
      }
    );
  }
}
