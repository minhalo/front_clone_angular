import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, of, Subscriber } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-model-prop',
  templateUrl: './model-prop.component.html',
  styleUrls: ['./model-prop.component.scss'],
})
export class ModelPropComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) {}
  myImage!: Observable<any>;
  base64code!: any;
  ngOnInit(): void {}
  createNewProductr = this.formBuilder.group({
    myImage: this.myImage,
  });

  onCreateProduct() {}

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
