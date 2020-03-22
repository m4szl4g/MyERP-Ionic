import { Component } from '@angular/core';
import { AuthService } from '../core/services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as projectState from '../core/store/reducers/project.reducers';
import * as RouterActions from '../core/store/actions/router.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(
    public auth: AuthService,
    private alertController: AlertController,
    private store: Store<projectState.ProjectState>
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
            this.store.dispatch(new RouterActions.Go({ path: ['/login'] }));
          }
        }
      ]
    });

    await alert.present();
  }
}
