import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Project } from '../shared/models/project.model';
import { Store, select } from '@ngrx/store';

import * as projectActions from '../core/store/actions/project.actions';
import * as projectState from '../core/store/reducers/project.reducers';
import * as projectSelectors from '../core/store/selectors/project.selectors';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss']
})
export class ProjectPage implements OnInit {
  public projects$: Observable<Project[]>;

  constructor(private store: Store<projectState.ProjectState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new projectActions.GetAll());
    this.projects$ = this.store.pipe(
      select(projectSelectors.selectAllProjects)
    );
  }
}
