import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from '../../services/auth-api.service';
import { profile } from '../../model/profile';
import { genders } from 'src/app/model/gender';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  name: string = '';
  age: number | null = 0;
  image: number = 0;

  genderer: number = 0;
  address: number = 0;

  gmail: string | null = '';

  genders: genders[] = [];
  addresss: genders[] = [];
  check: boolean | null = false;
  constructor(
    private AuthAPIService: AuthAPIService,
    private formBuilder: FormBuilder
  ) {}
  checkoutFormu = this.formBuilder.group({
    name: '',
    age: 0,
    gender: 1,
    address: 1,
    gmail: '',
  });

  onSubmit() {
    this.AuthAPIService.updateMe(
      localStorage.getItem('token'),
      this.checkoutFormu.value.name as string,
      Number(this.checkoutFormu.value.address),
      Number(this.checkoutFormu.value.gender),
      this.checkoutFormu.value.gmail as string,
      Number(this.checkoutFormu.value.age)
    ).subscribe((response) => {
      this.check = false;
      this.AuthAPIService.profile(localStorage.getItem('token')).subscribe(
        (response: profile) => {
          this.name = response.name;
          this.age = response.age;
          this.image = response.image;
          this.genderer = response.GenderId;
          this.address = response.AddressId;
          this.gmail = response.gmail;
          this.checkoutFormu.reset({
            name: this.name,
            gmail: this.gmail,
            address: this.address,
            gender: this.genderer,
            age: this.age,
          });
        }
      );
    });
  }

  checked() {
    this.check = null;
    this.checkoutFormu.reset({
      name: this.name,
      gmail: this.gmail,
      address: this.address,
      gender: this.genderer,
      age: this.age,
    });
  }

  ngOnInit(): void {
    this.AuthAPIService.getGender().subscribe((response) => {
      this.genders = response;
    });
    this.AuthAPIService.getAddress().subscribe((response) => {
      this.addresss = response;
    });
    this.AuthAPIService.profile(localStorage.getItem('token')).subscribe(
      (response: profile) => {
        this.name = response.name;
        this.age = response.age;
        this.image = response.image;
        this.genderer = response.GenderId;
        this.address = response.AddressId;
        this.gmail = response.gmail;
      }
    );
  }
}
