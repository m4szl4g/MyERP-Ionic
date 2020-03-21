import { Action } from "@ngrx/store";
import { Project } from "src/app/shared/models/project.model";
import { Update } from "@ngrx/entity";

export const PROJECT_GET_ALL = "[Project] Get All";
export const PROJECT_GET_ALL_SUCCESS = "[Project] Get All Success";
export const PROJECT_GET_ALL_FAIL = "[Project] Get All Fail";
export const PROJECT_GET_BY_ID = "[Project] Get By Id";
export const PROJECT_GET_BY_ID_SUCCESS = "[Project] Get By Id Success";
export const PROJECT_GET_BY_ID_FAIL = "[Project] Get By Id Fail";
export const PROJECT_UPDATE = "[Project] Update";
export const PROJECT_UPDATE_SUCCESS = "[Project] Update Success";
export const PROJECT_UPDATE_FAIL = "[Project] Update Fail";

export class GetAll implements Action {
  readonly type = PROJECT_GET_ALL;

  constructor(public payload = null) {}
}

export class GetAllSuccess implements Action {
  readonly type = PROJECT_GET_ALL_SUCCESS;

  constructor(public payload: Project[]) {}
}

export class GetAllFail implements Action {
  readonly type = PROJECT_GET_ALL_FAIL;

  constructor(public payload: any) {}
}

export class GetById implements Action {
  readonly type = PROJECT_GET_BY_ID;

  constructor(public payload: number) {}
}

export class GetByIdSuccess implements Action {
  readonly type = PROJECT_GET_BY_ID_SUCCESS;

  constructor(public payload: Project) {}
}

export class GetByIdFail implements Action {
  readonly type = PROJECT_GET_BY_ID_FAIL;

  constructor(public payload: any) {}
}

export class Updated implements Action {
  readonly type = PROJECT_UPDATE;

  constructor(public payload: { project: Update<Project> }) {}
}

export class UpdateSuccess implements Action {
  readonly type = PROJECT_UPDATE_SUCCESS;

  constructor(public payload: { project: Update<Project> }) {}
}

export class UpdateFail implements Action {
  readonly type = PROJECT_UPDATE_FAIL;

  constructor(public payload: any) {}
}

export type ProjectActions =
  | GetById
  | GetByIdSuccess
  | GetByIdFail
  | GetAll
  | GetAllSuccess
  | GetAllFail
  | Updated
  | UpdateSuccess
  | UpdateFail;
