import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ProjectState } from "../reducers/project.reducers";
import * as fromReducer from "../reducers/project.reducers";

export const projectFeature = (state: ProjectState) => state;
export const getProjectState = createFeatureSelector<ProjectState>("project");

export const selectAllProjects = createSelector(
  getProjectState,
  fromReducer.selectAllProject
);

export const getProjectEntities = createSelector(
  getProjectState,
  fromReducer.getProjectEntities
);

export const selectProjectById = createSelector(
  getProjectEntities,
  fromReducer.selectRouteParameters,
  (entities, params) => {
    return entities[params["id"]];
  }
);
