import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProjectEffects } from './store/effects/project.effects';
import * as fromProject from './store/reducers/project.reducers';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouterEffects } from './store/effects/router.effect';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({
      project: fromProject.reducer,
      router: routerReducer
    }),
    EffectsModule.forRoot([ProjectEffects, RouterEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 100 }),
    StoreRouterConnectingModule.forRoot()
  ]
})
export class CoreModule {}
