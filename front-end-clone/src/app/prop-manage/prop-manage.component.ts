import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-prop-manage',
  templateUrl: './prop-manage.component.html',
  styleUrls: ['./prop-manage.component.scss'],
})
export class PropManageComponent implements OnInit {
  myImage!: Observable<any>;
  base64code!: any;
  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {}

  createNewProduct(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {}

  createNewProductr = this.formBuilder.group({
    myImage: this.myImage,
  });

  onCreateProduct() {}

  onChange = ($event: Event) => {
    if ($event.target) {
      const target = $event.target as HTMLInputElement;

      const file: File = (target.files as FileList)[0];
      // console.log(file);

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
