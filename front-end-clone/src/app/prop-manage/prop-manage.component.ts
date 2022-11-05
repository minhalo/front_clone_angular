import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModelPropComponent } from './model-prop/model-prop.component';
@Component({
  selector: 'app-prop-manage',
  templateUrl: './prop-manage.component.html',
  styleUrls: ['./prop-manage.component.scss'],
})
export class PropManageComponent implements OnInit {
  modalRef?: BsModalRef;
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  createNewProduct() {
    this.bsModalRef = this.modalService.show(ModelPropComponent);
  }
  ngOnInit(): void {}
}
