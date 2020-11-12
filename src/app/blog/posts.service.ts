import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Post } from './post';
import { Archives } from './blog-archives/blog-archives.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../messages/message/message.component';
import { imagesMap } from '../util/imageMap';
const ROUTE = '/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router, private messageBar: MatSnackBar) { }
  private posts: Post[] = [];
  private stream = new Subject<{ posts: Post[], max: number }>();
  getPosts(left: number = 0, items: number = 5, year?: number, month?: number): Observable<{ posts: Post[], max: number }> {
    const query = `?left=${left}&items=${items}${year ? '&year=' + year : ''}${month ? '&month=' + month : ''}`;

    return this.http.get<{ posts: Post[], max: number }>(ROUTE + query).pipe(
      imagesMap('thumbnailPath')
    );
  }
  populatePosts(left: number = 0, items: number = 5, year?: number, month?: number): void {
    this.getPosts(left, items, year, month)
      .subscribe((res) => {
        this.posts = res.posts;
        this.stream.next({ posts: [...this.posts], max: res.max });
      });
  }
  getArchives() {
    return this.http.get<Archives[]>(`${ROUTE}/archives`);
  }
  getStream() {
    return this.stream.asObservable();
  }
  getPost(slug: string) {
    return this.http.get<Post>(`${ROUTE}/${slug}`).pipe(
      imagesMap('thumbnailPath')
    );
  }
  addPost(
    title: string,
    markdown: string,
    labels: string[],
    icon?: string,
    thumbnail?: string,
    description?: string,
  ): void {
    const data = new FormData();
    data.append('title', title);
    data.append('date', new Date().toISOString());
    data.append('markdown', markdown);
    data.append('labels', JSON.stringify(labels));
    if (icon) { data.append('icon', icon); }
    if (thumbnail) { data.append('thumbnail', thumbnail); }
    if (description) { data.append('description', description); }
    this.http.post<{ message: string, post: Post }>(ROUTE, data).subscribe((res) => {
      this.messageBar.openFromComponent(
        MessageComponent,
        { data: { message: res.message, action: 'Post', redirect: `blog/${res.post.slug}` } }
      );
      this.router.navigate(['/'], { state: { done: true } });
    }, (e) => {
      this.stream.next(e);
    });
  }
  editPost(
    id: string,
    title: string,
    date: Date,
    markdown: string,
    labels: string[],
    icon: string,
    thumbnail?: string,
    description?: string
  ): void {
    const data = new FormData();
    data.append('_id', id);
    data.append('title', title);
    data.append('date', new Date(date).toISOString());
    data.append('markdown', markdown);
    data.append('labels', JSON.stringify(labels));
    data.append('icon', icon);
    data.append('modified', new Date().toISOString());
    if (thumbnail) { data.append('thumbnail', thumbnail); }
    if (description) { data.append('description', description); }
    this.http.put<{ message: string, slug: string }>(`${ROUTE}/${id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(
        MessageComponent,
        { data: { message: res.message, action: 'Post', redirect: `blog/${res.slug}` } }
      );
      this.router.navigate(['/'], { state: { done: true } });
    }, (e) => {
      this.stream.next(e);
    });
  }
  delPost(id: string) {
    return this.http.delete<{ message: string }>(`${ROUTE}/${id}`);
  }
}
