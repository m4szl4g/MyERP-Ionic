import { Component, OnInit, Input } from "@angular/core";
import { Project } from "src/app/shared/models/project.model";
import { Store } from "@ngrx/store";

import * as projectState from "../../../core/store/reducers/project.reducers";
import * as RouterActions from "../../../core/store/actions/router.actions";

@Component({
  selector: "project-tile",
  templateUrl: "./project-tile.component.html",
  styleUrls: ["./project-tile.component.scss"]
})
export class ProjectTileComponent implements OnInit {
  @Input() project: Project;

  public constructor(private store: Store<projectState.ProjectState>) {}

  public ngOnInit(): void {}

  public navigate(projectId: number): void {
    this.store.dispatch(
      new RouterActions.Go({
        path: ["/project", projectId]
      })
    );
  }
}
