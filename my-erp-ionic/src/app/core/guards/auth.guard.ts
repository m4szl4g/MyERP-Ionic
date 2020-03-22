import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { Platform } from '@ionic/angular';

import * as projectState from '../store/reducers/project.reducers';
import * as RouterActions from '../store/actions/router.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<projectState.ProjectState>,
    private auth: AuthService,
    private platform: Platform
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    if (this.platform.is('cordova')) {
      if (!this.auth.loggedIn) {
        this.auth.login();
        return false;
      } else {
        return this.auth.loggedIn;
      }
    }

    // local testing in browser not on device, Auth0 uses cordova plugins which are available on real device.
    return true;
  }
}
