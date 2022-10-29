import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.scss'],
})
export class RightbarComponent implements OnInit {
  test: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  a: number[] = [1, 2, 3];

  constructor() {}

  ngOnInit(): void {}
}
