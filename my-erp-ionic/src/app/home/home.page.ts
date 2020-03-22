import { Component } from '@angular/core';
import { AuthService } from '../core/services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(
    public auth: AuthService,
    public alertController: AlertController
  ) {}

  public async logout(): Promise<void> {
    await this.showLogoutAlert();
  }

  private async showLogoutAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: () => {
            this.auth.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}
