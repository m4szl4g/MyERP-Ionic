import { ProjectService } from "../../services/project.service";
import { Actions } from "@ngrx/effects";
import { empty, Observable, of } from "rxjs";
import * as fromEffects from "./project.effects";
import * as fromActions from "../actions/project.actions";
import * as fromReducers from "../reducers/project.reducers";
import { Project } from "src/app/shared/models/project.model";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { hot, cold } from "jasmine-marbles";
import { Store, StoreModule } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { RouterNavigationAction } from "@ngrx/router-store";

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe("ProjectEffets", () => {
  let actions$: TestActions;
  let service: ProjectService;
  let effects: fromEffects.ProjectEffects;

  const projects: Project[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(fromReducers.reducer)
      ],
      providers: [
        ProjectService,
        fromEffects.ProjectEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(ProjectService);
    effects = TestBed.get(fromEffects.ProjectEffects);

    spyOn(service, "getAll").and.returnValue(of(projects));
    spyOn(service, "get").and.returnValue(of(projects[0]));
    spyOn(service, "update").and.returnValue(of(projects[0]));
  });

  describe("getAll$", () => {
    it("should return all projects", () => {
      const action = new fromActions.GetAll();
      const completion = new fromActions.GetAllSuccess(projects);

      actions$.stream = hot("-a", { a: action });
      const expected = cold("-b", { b: completion });

      expect(effects.getAll$).toBeObservable(expected);
    });
  });

  describe("update$", () => {
    it("should work", () => {
      const project: Update<Project> = {
        id: projects[0].id,
        changes: projects[0]
      };
      const action = new fromActions.Updated({ project });
      const completion = new fromActions.UpdateSuccess({ project });

      actions$.stream = hot("-a", { a: action });
      const expected = cold("-c", { c: completion });

      expect(effects.update$).toBeObservable(expected);
    });
  });

  describe("getById$", () => {
    it("should work", () => {
      const projectId = 1;
      const action = new fromActions.GetById(projectId);
      const completion = new fromActions.GetByIdSuccess(projects[0]);

      actions$.stream = hot("-a", { a: action });
      const expected = cold("-c", { c: completion });

      expect(effects.getById$).toBeObservable(expected);
    });
  });
});
