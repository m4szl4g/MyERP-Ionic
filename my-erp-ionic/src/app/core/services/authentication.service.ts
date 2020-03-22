import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';

import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';

import * as projectState from '../../core/store/reducers/project.reducers';
import * as RouterActions from '../../core/store/actions/router.actions';
import { Store } from '@ngrx/store';

declare let cordova: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Auth0 = new auth0.WebAuth(environment.auth0);
  Client = new Auth0Cordova(environment.auth0);
  accessToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;

  constructor(
    public zone: NgZone,
    private storage: Storage,
    private safariViewController: SafariViewController,
    private store: Store<projectState.ProjectState>
  ) {
    this.storage.get('profile').then(user => (this.user = user));
    this.storage.get('access_token').then(token => (this.accessToken = token));
    this.storage.get('expires_at').then(exp => {
      this.loggedIn = Date.now() < JSON.parse(exp);
      this.loading = false;
    });
  }

  login() {
    this.loading = true;
    const options = {
      scope: 'openid profile offline_access'
    };
    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        this.zone.run(() => (this.loading = false));
        throw err;
      }
      // Set access token
      this.storage.set('access_token', authResult.accessToken);
      this.accessToken = authResult.accessToken;
      // Set access token expiration
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      this.storage.set('expires_at', expiresAt);
      // Set logged in
      this.loading = false;
      this.loggedIn = true;
      // Fetch user's profile info
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }
        this.storage
          .set('profile', profile)
          .then(val => this.zone.run(() => (this.user = profile)));
        this.store.dispatch(new RouterActions.Go({ path: ['/'] }));
      });
    });
  }

  logout() {
    this.accessToken = null;
    this.user = null;
    this.loggedIn = false;
    this.safariViewController.isAvailable().then((available: boolean) => {
      const domain = environment.auth0.domain;
      const clientId = environment.auth0.clientId;
      const pkgId = environment.auth0.packageIdentifier;
      const url = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${pkgId}://${domain}/cordova/${pkgId}/callback`;

      if (available) {
        this.safariViewController.show({ url }).subscribe(
          (result: any) => {
            if (result.event === 'opened') console.log('Opened');
            else if (result.event === 'closed') console.log('Closed');

            if (result.event === 'loaded') {
              console.log('Loaded');
              this.storage.remove('profile');
              this.storage.remove('access_token');
              this.storage.remove('expires_at');
              this.safariViewController.hide();
            }
          },
          (error: any) => console.error(error)
        );
      } else {
        // use fallback browser
        cordova.InAppBrowser.open(url, '_system');
      }
    });
  }
}
