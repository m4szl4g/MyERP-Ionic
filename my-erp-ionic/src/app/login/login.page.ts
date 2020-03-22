import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private auth: AuthService) {}

  public ngOnInit(): void {}

  ionViewDidEnter() {
    console.log('LOGIN ON LOGINPAGE');
    this.auth.login();
  }
}
