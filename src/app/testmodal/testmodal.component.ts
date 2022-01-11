import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-testmodal',
  templateUrl: './testmodal.component.html',
  styleUrls: ['./testmodal.component.scss'],
})
export class TestmodalComponent implements OnInit {

  @Input() myProp: string;

  constructor(
    private modalctrl: ModalController
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modalctrl.dismiss('Kaamelott');
  }
}
