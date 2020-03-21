import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { map, mergeMap, catchError, tap, filter } from "rxjs/operators";
import { ProjectService } from "src/app/core/services/project.service";
import * as RouterActions from "src/app/core/store/actions/router.actions";
import * as projectActions from "../actions/project.actions";
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { ProjectState } from "../reducers/project.reducers";
import { Store } from "@ngrx/store";

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private store: Store<ProjectState>
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.PROJECT_GET_ALL),
      mergeMap(() =>
        this.projectService.getAll().pipe(
          map(projects => {
            return new projectActions.GetAllSuccess(projects);
          }),
          catchError(error => {
            return of(new projectActions.GetAllFail(error));
          })
        )
      )
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.PROJECT_GET_BY_ID),
      mergeMap((id: any) =>
        this.projectService.get(id.payload).pipe(
          map(project => {
            return new projectActions.GetByIdSuccess(project);
          }),
          catchError(error => {
            return of(new projectActions.GetByIdFail(error));
          })
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.PROJECT_UPDATE),
      mergeMap((data: any) =>
        this.projectService.update(data.payload.project).pipe(
          map(() => new projectActions.UpdateSuccess(data.payload)),
          catchError(error => {
            return of(new projectActions.UpdateFail(error));
          })
        )
      )
    )
  );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$.pipe(
    ofType(projectActions.PROJECT_UPDATE_SUCCESS),
    tap(() =>
      this.store.dispatch(
        new RouterActions.Go({
          path: ["/project"]
        })
      )
    )
  );

  @Effect() routedDetail$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((action: RouterNavigationAction) =>
      new RegExp("^/project/[0-9]+").test(action.payload.routerState.url)
    ),
    map(
      action =>
        new projectActions.GetById(
          action.payload.routerState.root.firstChild.params["id"]
        )
    )
  );
}
