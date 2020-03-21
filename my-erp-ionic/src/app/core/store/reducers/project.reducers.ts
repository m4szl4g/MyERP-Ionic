import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromProjectAction from "../actions/project.actions";
import { Project } from "src/app/shared/models/project.model";
import * as fromRouter from "@ngrx/router-store";
import { createFeatureSelector } from "@ngrx/store";

export interface ProjectState extends EntityState<Project> {
  router: fromRouter.RouterReducerState<any>;
  loading: boolean;
  loaded: boolean;
  updated: boolean;
  updating: boolean;
  hasUpdateFailed: boolean;
  hasGetAllFailed: boolean;
  hasGetFailed: boolean;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();
export const initialState: ProjectState = adapter.getInitialState({
  router: null,
  loading: false,
  loaded: false,
  updated: false,
  updating: false,
  hasUpdateFailed: false,
  hasGetAllFailed: false,
  hasGetFailed: false
});

export function reducer(
  state = initialState,
  action: fromProjectAction.ProjectActions
): ProjectState {
  switch (action.type) {
    case fromProjectAction.PROJECT_GET_ALL:
      return { ...state, loading: true };
    case fromProjectAction.PROJECT_GET_ALL_SUCCESS:
      return adapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false,
        hasGetAllFailed: false
      });
    case fromProjectAction.PROJECT_GET_ALL_FAIL:
      return { ...state, loading: false, hasGetAllFailed: true };
    case fromProjectAction.PROJECT_GET_BY_ID:
      return { ...state, loading: true };
    case fromProjectAction.PROJECT_GET_BY_ID_SUCCESS:
      return adapter.upsertOne(action.payload, {
        ...state,
        loaded: true,
        loading: false,
        hasGetFailed: false
      });
    case fromProjectAction.PROJECT_GET_BY_ID_FAIL:
      return { ...state, loading: false, hasGetFailed: true };
    case fromProjectAction.PROJECT_UPDATE:
      return { ...state, updating: true };
    case fromProjectAction.PROJECT_UPDATE_SUCCESS:
      return adapter.updateOne(action.payload.project, {
        ...state,
        updated: true,
        updating: false,
        hasUpdateFailed: false
      });
    case fromProjectAction.PROJECT_UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        hasUpdateFailed: true
      };
    default:
      return state;
  }
}

export const selectRouter = createFeatureSelector<
  ProjectState,
  fromRouter.RouterReducerState<any>
>("router");

const {
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl // select the current url
} = fromRouter.getSelectors(selectRouter);

const { selectAll } = adapter.getSelectors();
export const selectAllProject = selectAll;
export const selectRouteParameters = selectRouteParams;
export const getProjectEntities = (state: ProjectState) => state.entities;
