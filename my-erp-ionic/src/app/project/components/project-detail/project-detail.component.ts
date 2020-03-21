import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Updated } from '../../../core/store/actions/project.actions';
import * as projectState from '../../../core/store/reducers/project.reducers';
import { selectProjectById } from '../../../core/store/selectors/project.selectors';
import * as RouterActions from '../../../core/store/actions/router.actions';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  public project$: Observable<Project>;

  public detailForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    projectManager: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('')
  });

  constructor(private store: Store<projectState.ProjectState>) {}

  public ngOnInit(): void {
    this.project$ = this.store.select(selectProjectById);
  }

  public navigate(): void {
    this.store.dispatch(new RouterActions.Back());
  }

  public save(): void {
    const project = this.detailForm.value;

    //navigates back from the store
    this.store.dispatch(new Updated({ project }));
  }
}
