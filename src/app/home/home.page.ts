import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { TestmodalComponent } from '../testmodal/testmodal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  prop: string;
  constructor(
    private actionSheetctrl: ActionSheetController,
    private toastctrl: ToastController,
    private modalctrl: ModalController,
    private alertctrl: AlertController
  ) { }

  ngOnInit() {
    this.prop = 'toto';
  }

  async openActionSheet(){
    const myAS = await this.actionSheetctrl.create({
      header: 'Actions',
      buttons : [
        {
          text : 'click',
          handler: () => alert('toto')
        },
        {
          text: 'changeValue',
          handler: () => this.prop = 'salut'
        },
        // {
        //   text : 'toast',
        //   handler: () => this.openToast()
        // },
        {
          text : 'modal',
          handler: () => this.openModal()
        },
        {
          text : 'Alert',
          handler: () => this.openAlert()
        },
        {
          text : 'CofirmAlert',
          handler: () => this.confirmAlert()
        }
      ]
    });
    myAS.present();
  }

  async openAlert() {
    const alert = await this.alertctrl.create({
      header:'mon Alerte',
      message: 'Du super texte qui veut rien dire',
      buttons: ['ok']
    });
    alert.present();
  }

  async confirmAlert() {
    const alert = await this.alertctrl.create({
      header: 'confirm box',
      message: 'Voulez vous confirmer ?',
      buttons: [
        {
          text : 'Oui',
          handler : () => this.confirmToast(true)
        },
        {
          text:'Non',
          role: 'cancel',
          handler: () => this.confirmToast(false)
        }
      ]
    });
    alert.present();
  }

  confirmToast(value: boolean){
    this.toastctrl.create({
      duration : 3000, message : 'Etat de la confirmation', color : value ? 'success' : 'danger'
    }).then(t => t.present());
  }

  openToast(texte: string) {
    this.toastctrl.create({
      duration : 3000, message : texte, color : 'success', position : 'middle'
    }).then(t => t.present());
  }

  async openModal() {
    const modal = await this.modalctrl.create({
      component: TestmodalComponent,
      componentProps: { myProp : 'Salut tout le monde'}
    });
    modal.present();
    modal.onWillDismiss().then(eventFromModal => this.openToast(eventFromModal.data));
  }
}
