import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectsService, Sequences } from "./projects.service";

@Injectable({ providedIn: 'root' })
export class SequencesResolver implements Resolve<Sequences> {
  constructor(private projectsService: ProjectsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Sequences> {
    return this.projectsService.getSequences()
  }
}
