import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from 'src/app/shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private backendUrl: string;

  constructor(private http: HttpClient) {
    this.backendUrl = environment.useMockBackend
      ? environment.mockBackendUrl
      : environment.backendUrl;
    this.backendUrl += '/project';
  }

  public get(projectId: number): Observable<Project> {
    const url = `${this.backendUrl}/${projectId}`;
    return this.http.get<Project>(url).pipe(
      map(data => {
        data.startDate = new Date(data.startDate);
        data.endDate = new Date(data.endDate);
        return data;
      })
    );
  }

  public getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.backendUrl).pipe(
      map(data => {
        data.forEach(val => {
          val.startDate = new Date(val.startDate);
          val.endDate = new Date(val.endDate);
        });
        return data;
      })
    );
  }

  public update(project: Project) {
    const url = `${this.backendUrl}/${project.id}`;
    return this.http.put(url, project);
  }
}
