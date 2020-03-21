import { StoreModule, Store, combineReducers } from "@ngrx/store";
import { ROUTER_NAVIGATION } from "@ngrx/router-store";

import { TestBed } from "@angular/core/testing";
import { Project } from "src/app/shared/models/project.model";

import * as fromReducers from "../reducers/project.reducers";
import * as fromActions from "../actions/project.actions";
import * as fromSelectors from "../selectors/project.selectors";

describe("Project Selectors", () => {
  let store: Store<fromReducers.ProjectState>;

  const project1: Project = {
    id: 1,
    name: "Project #1",
    projectManager: "Steve",
    startDate: new Date(),
    endDate: new Date()
  };

  const project2: Project = {
    id: 2,
    name: "Project #2",
    projectManager: "Mike",
    startDate: new Date(),
    endDate: new Date()
  };

  const projects: Project[] = [project1, project2];

  const entities = {
    1: projects[0],
    2: projects[1]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ project: fromReducers.reducer })]
    });

    store = TestBed.get(Store);
  });

  describe("getAll", () => {
    it("should return projects", () => {
      let result;

      store.select(fromSelectors.selectAllProjects).subscribe(value => {
        result = value;
      });

      expect(result).toEqual([]);

      store.dispatch(new fromActions.GetAllSuccess(projects));

      expect(result).toEqual(projects);
    });
  });
});
