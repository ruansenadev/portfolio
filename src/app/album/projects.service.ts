import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Project } from './project';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../messages/message/message.component';
import { imagesMap } from '../util/imageMap';
const ROUTE = '/projects';

export interface Sequences {
  projects: Map<number, string>;
  available: Map<number, boolean>;
  next: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient, private router: Router, private messageBar: MatSnackBar) { }
  private projects: Project[] = [];
  private stream = new Subject<{ projects: Project[], hasMore: boolean }>();

  getProjects(behind: number = 0, items: number = 3): Observable<{ projects: Project[], hasMore: boolean }> {
    const query = `?behind=${behind}&items=${items}`;
    return this.http.get<{ projects: Project[], hasMore: boolean }>(ROUTE + query).pipe(
      imagesMap('thumbnailPath')
    );
  }
  getSequences(): Observable<Sequences> {
    return this.http.get<{ name: string; seq: number; }[]>(ROUTE + '/seqs').pipe(map(data => {
      const projects = data.reduce((seqs, p) => {
        seqs.set(p.seq, p.name);
        return seqs;
      }, new Map());
      const next = (Array.from(projects.keys()).pop() + 1) || 0;
      const available = new Map<number, boolean>();
      for (let i = 0; i <= next; i++) {
        available.set(i, Boolean(projects.get(i)));
      }
      return { projects, available, next };
    }));
  }
  populateProjects(behind: number = 0, items: number = 3): void {
    this.getProjects(behind, items)
      .subscribe((res) => {
        this.projects = res.projects;
        this.stream.next({ projects: [...this.projects], hasMore: res.hasMore });
      });
  }
  getStream() {
    return this.stream.asObservable();
  }
  getProject(seq: number) {
    return this.http.get<Project>(`${ROUTE}/${seq}`).pipe(
      imagesMap('thumbnailPath'));
  }
  addProject(
    name: string,
    seq: number,
    status: string,
    description: string,
    overview: string,
    technologies: string[],
    url: string,
    keywords: string[],
    thumbnail?: string,
    homepage?: string,
  ): void {
    const data = new FormData();
    data.append('name', name);
    data.append('seq', '' + seq);
    data.append('status', status);
    data.append('description', description);
    data.append('overview', overview);
    data.append('technologies', JSON.stringify(technologies));
    data.append('url', url);
    data.append('keywords', JSON.stringify(keywords));
    if (thumbnail) { data.append('thumbnailPath', thumbnail); }
    if (homepage) { data.append('homepage', homepage); }
    this.http.post<{ message: string, project: Project }>(ROUTE, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message, action: 'Projeto', redirect: `album/${res.project.seq}` } });
      this.router.navigate(['/album'], { state: { done: true } });
    }, (e) => {
      this.stream.next(e);
    });
  }
  editProject(
    id: string,
    name: string,
    seq: number,
    status: string,
    description: string,
    overview: string,
    technologies: string[],
    url: string,
    keywords: string[],
    thumbnail?: string,
    homepage?: string,
  ): void {
    const data = new FormData();
    data.append('_id', id);
    data.append('name', name);
    data.append('seq', seq + '');
    data.append('status', status);
    data.append('description', description);
    data.append('overview', overview);
    data.append('technologies', JSON.stringify(technologies));
    data.append('url', url);
    data.append('keywords', JSON.stringify(keywords));
    if (thumbnail) { data.append('thumbnailPath', thumbnail); }
    if (homepage) { data.append('homepage', homepage); }
    this.http.put<{ message: string }>(`${ROUTE}/${id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message, action: 'Projeto', redirect: `album/${seq}` } });
      this.router.navigate(['/album'], { state: { done: true } });
    }, (e) => {
      this.stream.next(e);
    });
  }
  delProject(id: string) {
    return this.http.delete<{ message: string }>(`${ROUTE}/${id}`);
  }
}
