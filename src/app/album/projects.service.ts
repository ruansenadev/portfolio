import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Project } from "./project";
import { environment } from "../../environments/environment";
const apiProjects = environment.host + '/projects'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient, private router: Router) { }
  private projects: Project[] = []
  private stream = new Subject<Project[]>()

  populateProjects(): void {
    this.http.get<Project[]>(apiProjects).subscribe((res) => {
      this.projects = res
      this.stream.next([...this.projects])
    })
  }
  getStream() {
    return this.stream.asObservable()
  }
  addProject(name: string, status: string, thumbnail: File | null, thumbnailName: string | null, description: string, technologies: string[], url: string, homepage: string | null, keywords: string[]): void {
    const data = new FormData()
    data.append('name', name)
    data.append('status', status)
    if (thumbnail) data.append('thumbnail', thumbnail, thumbnailName)
    data.append('description', description)
    data.append('technologies', JSON.stringify(technologies))
    data.append('url', url)
    if (homepage) data.append('homepage', homepage)
    data.append('keywords', JSON.stringify(keywords))
    this.http.post<{ message: string, project: Project }>(apiProjects, data).subscribe((res) => {
      this.projects.push(res.project)
      this.stream.next([...this.projects])
      console.log(res.message, res.project)
      this.router.navigate(['/'])
    })
  }

}
