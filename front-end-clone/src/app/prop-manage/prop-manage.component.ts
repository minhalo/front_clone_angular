import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-prop-manage',
  templateUrl: './prop-manage.component.html',
  styleUrls: ['./prop-manage.component.scss'],
})
export class PropManageComponent implements OnInit {
  myImage!: Observable<any>;
  base64code!: any;
  constructor() {}

  ngOnInit(): void {}

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file);
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
