import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProjectEffects } from './store/effects/project.effects';
import * as fromProject from './store/reducers/project.reducers';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouterEffects } from './store/effects/router.effect';
import { HttpClientModule } from '@angular/common/http';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot({
      project: fromProject.reducer,
      router: routerReducer
    }),
    EffectsModule.forRoot([ProjectEffects, RouterEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 100 }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [SafariViewController]
})
export class CoreModule {}
