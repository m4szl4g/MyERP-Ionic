import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectPage } from './container/project.page';
import { RouterModule } from '@angular/router';
import { ProjectTileComponent } from './components/project-tile/project-tile.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectDetailDirective } from './directives/project-detail.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ProjectPage }])
  ],
  declarations: [
    ProjectPage,
    ProjectTileComponent,
    ProjectDetailComponent,
    ProjectDetailDirective
  ]
})
export class ProjectPageModule {}
