import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: any;
  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }
  async showLoader(message: string) {
    this.loading = await this.loadingController.create({
      message
    });
    await this.loading.present();
  }
  async hideLoader() {
    await this.loading.dismiss();
  }
  async showAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
