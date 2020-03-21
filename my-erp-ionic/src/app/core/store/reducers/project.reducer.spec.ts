import * as fromProject from "./project.reducers";
import * as fromActions from "../actions/project.actions";
import { Project } from "src/app/shared/models/project.model";
import { Update } from "@ngrx/entity";

describe("ProjectReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialState } = fromProject;
      const action = {} as any;
      const state = fromProject.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe("Project Get All action", () => {
    it("should set loading flag", () => {
      const { initialState } = fromProject;
      const action = new fromActions.GetAll();
      const state = fromProject.reducer(initialState, action);

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });

  describe("Project Get All Success action", () => {
    it("should return the projects array", () => {
      const projects: Project[] = [
        {
          id: 1,
          name: "Project #1",
          projectManager: "Steve",
          startDate: new Date(),
          endDate: null
        },
        {
          id: 2,
          name: "Project #2",
          projectManager: "Mike",
          startDate: new Date(),
          endDate: null
        }
      ];
      const entities = {
        1: projects[0],
        2: projects[1]
      };
      const { initialState } = fromProject;
      const action = new fromActions.GetAllSuccess(projects);
      const state = fromProject.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe("Project Get All Success action", () => {
    it("should set error flag", () => {
      const { initialState } = fromProject;
      const errorMessage = "Error";
      const action = new fromActions.GetAllFail(errorMessage);
      const state = fromProject.reducer(initialState, action);

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
      expect(state.hasGetAllFailed).toEqual(true);
    });
  });

  describe("Project Get By Id action", () => {
    it("should set loading flag", () => {
      const { initialState } = fromProject;
      const projectId: number = 1;
      const action = new fromActions.GetById(projectId);
      const state = fromProject.reducer(initialState, action);

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });

  describe("Project Get By Id Success action", () => {
    it("should set the given project", () => {
      const { initialState } = fromProject;
      const payload: Project = {
        id: 2,
        name: "Project #1",
        projectManager: "Steve",
        startDate: new Date(),
        endDate: null
      };
      const action = new fromActions.GetByIdSuccess(payload);
      const state = fromProject.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.hasGetFailed).toEqual(false);
      expect(state.entities[payload.id]).toEqual(payload);
    });
  });

  describe("Project Get By Id Fail action", () => {
    it("should set error flag", () => {
      const { initialState } = fromProject;

      const errorMessage = "error";
      const action = new fromActions.GetByIdFail(errorMessage);
      const state = fromProject.reducer(initialState, action);

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
      expect(state.hasGetFailed).toEqual(true);
    });
  });

  describe("Project Update action", () => {
    it("should set updating flag", () => {
      const { initialState } = fromProject;

      const proj: Update<Project> = {
        id: 2,
        changes: {
          id: 2,
          name: "Project #1",
          projectManager: "Steve",
          startDate: new Date(),
          endDate: null
        }
      };

      const action = new fromActions.Updated({ project: proj });
      const state = fromProject.reducer(initialState, action);

      expect(state.updating).toEqual(true);
      expect(state.updated).toEqual(false);
      expect(state.hasUpdateFailed).toEqual(false);
    });
  });

  describe("Project Update Fail action", () => {
    it("should set error flag", () => {
      const { initialState } = fromProject;

      const errorMessage = "Error";
      const action = new fromActions.UpdateFail(errorMessage);
      const state = fromProject.reducer(initialState, action);

      expect(state.updating).toEqual(false);
      expect(state.updated).toEqual(false);
      expect(state.hasUpdateFailed).toEqual(true);
    });
  });

  describe("Project Update Success action", () => {
    it("should update the given project", () => {
      const { initialState } = fromProject;
      initialState.entities = {
        2: {
          id: 2,
          name: "Project #1",
          projectManager: "Mike",
          startDate: new Date(),
          endDate: null
        }
      };

      const proj: Update<Project> = {
        id: 2,
        changes: {
          id: 2,
          name: "Project #1",
          projectManager: "Steve",
          startDate: new Date(),
          endDate: null
        }
      };

      const action = new fromActions.UpdateSuccess({ project: proj });
      const state = fromProject.reducer(initialState, action);

      expect(state.updating).toEqual(false);
      expect(state.updated).toEqual(true);
      expect(state.entities[proj.id].projectManager).toEqual("Steve");
    });
  });
});
