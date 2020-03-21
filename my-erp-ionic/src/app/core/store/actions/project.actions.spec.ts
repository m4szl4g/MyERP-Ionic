import * as fromProject from "./project.actions";
import { Project } from "src/app/shared/models/project.model";
import { Update } from "@ngrx/entity";

describe("Project Actions", () => {
  describe("GetAll Actions", () => {
    describe("GetAll", () => {
      it("should create an action", () => {
        const action = new fromProject.GetAll();

        expect({ ...action }).toEqual({
          type: fromProject.PROJECT_GET_ALL,
          payload: null
        });
      });
    });

    describe("GetAllFail", () => {
      it("should create an action", () => {
        const payload = "error";
        const action = new fromProject.GetAllFail(payload);

        expect({ ...action }).toEqual({
          type: fromProject.PROJECT_GET_ALL_FAIL,
          payload: payload
        });
      });
    });

    describe("GetAllSuccess", () => {
      it("should create an action", () => {
        const payload: Project[] = [
          {
            id: 1,
            name: "Project #1",
            projectManager: "Steve",
            startDate: new Date(),
            endDate: new Date()
          },
          {
            id: 2,
            name: "Project #2",
            projectManager: "Mike",
            startDate: new Date(),
            endDate: new Date()
          }
        ];
        const action = new fromProject.GetAllSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromProject.PROJECT_GET_ALL_SUCCESS,
          payload
        });
      });
    });
  });

  describe("GetById Actions", () => {
    describe("GetById", () => {
      it("should create an action", () => {
        const payload = 1;
        const action = new fromProject.GetById(payload);

        expect({ ...action }).toEqual({
          type: fromProject.PROJECT_GET_BY_ID,
          payload
        });
      });
    });

    describe("GetById Fail", () => {
      it("should create an action", () => {
        const payload = { message: "Create Error" };
        const action = new fromProject.GetByIdFail(payload);

        expect({ ...action }).toEqual({
          type: fromProject.PROJECT_GET_BY_ID_FAIL,
          payload
        });
      });
    });

    describe("GetById Success", () => {
      it("should create an action", () => {
        const payload: Project = {
          id: 1,
          name: "Project @1",
          projectManager: "Steve",
          endDate: new Date(),
          startDate: new Date()
        };
        const action = new fromProject.GetByIdSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromProject.PROJECT_GET_BY_ID_SUCCESS,
          payload
        });
      });
    });
  });

  describe("Update Actions", () => {
    describe("Update", () => {
      it("should create an action", () => {
        const payload: Update<Project> = {
          id: 2,
          changes: {
            id: 2,
            name: "Project #1",
            projectManager: "Steve",
            startDate: new Date(),
            endDate: null
          }
        };
        const action = new fromProject.Updated({ project: payload });

        expect({ ...action }).toEqual({
          type: fromProject.PROJECT_UPDATE,
          payload: { project: payload }
        });
      });
    });

    describe("UpdateFail", () => {
      it("should create an action", () => {
        const payload = { message: "Update Error" };
        const action = new fromProject.UpdateFail(payload);

        expect({ ...action }).toEqual({
          type: fromProject.PROJECT_UPDATE_FAIL,
          payload
        });
      });
    });

    describe("UpdateSuccess", () => {
      it("should create an action", () => {
        const project: Update<Project> = {
          id: 1,
          changes: {
            id: 1,
            name: "Project @1",
            projectManager: "Steve",
            endDate: new Date(),
            startDate: new Date()
          }
        };
        const action = new fromProject.UpdateSuccess({ project: project });

        expect({ ...action }).toEqual({
          type: fromProject.PROJECT_UPDATE_SUCCESS,
          payload: { project: project }
        });
      });
    });
  });
});
