import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, of, Subscriber } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { AuthAPIService } from '../../services/auth-api.service';
import { genders } from 'src/app/model/gender';

@Component({
  selector: 'app-model-prop',
  templateUrl: './model-prop.component.html',
  styleUrls: ['./model-prop.component.scss'],
})
export class ModelPropComponent implements OnInit {
  list: genders[] = [];
  errReg: number = 0;
  errMessage: string = '';
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private AuthAPIService: AuthAPIService
  ) {}

  myImage!: Observable<any>;
  base64code!: any;

  ngOnInit(): void {
    this.AuthAPIService.getList().subscribe((response) => {
      this.list = response;
    });
  }

  createNewProductr = this.formBuilder.group({
    name: '',
    title: '',
    status: 1,
    price: 0,
    discount: 0,
    time: 0,
    note: '',
    myImage: this.myImage,
    ListId: '1',
  });

  demo() {
    this.createNewProductr.reset({
      name: 'Anh luc dep trai',
      title: 'Anh luc ngu',
      status: 1,
      price: 0,
      discount: 0,
      time: 0,
      note: 'Yeu anh luc',
      myImage: this.myImage,
      ListId: '1',
    });
  }

  onCreateProduct() {
    if (this.createNewProductr.value.myImage) {
      this.AuthAPIService.createProducts(
        localStorage.getItem('token'),
        this.createNewProductr.value.name as string,
        Number(this.createNewProductr.value.ListId),
        this.createNewProductr.value.title as string,
        this.createNewProductr.value.note as string,
        Number(this.createNewProductr.value.time),
        Number(this.createNewProductr.value.discount),
        Number(this.createNewProductr.value.price),
        Number(this.createNewProductr.value.status),
        this.myImage
      ).subscribe((response) => {
        this.errReg = response.errCode;
        this.errMessage = response.errMessage;
        if (response.errCode === 0) {
          // this.modalRef?.hide();
          this.bsModalRef.hide();
        }
      });
    }
  }

  onChange = ($event: Event) => {
    if ($event.target) {
      const target = $event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.convertToBase64(file);
    }
  };

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      this.myImage = d;
      this.base64code = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };

    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }
}
