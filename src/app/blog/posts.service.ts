import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post";
import { Archives } from "./blog-archives/blog-archives.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageComponent } from "../messages/message/message.component";
import { environment } from "../../environments/environment";
const apiPosts = environment.server + '/posts'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router, private messageBar: MatSnackBar) { }
  private posts: Post[] = []
  private stream = new Subject<{ posts: Post[], max: number }>()
  getPosts(left: number = 0, items: number = 5, year?: number, month?: number): Observable<{ posts: Post[], max: number }> {
    const query = `?${year ? 'year=' + year + '&' : ''}${month ? 'month=' + month + '&' : ''}left=${left}&items=${items}`

    return this.http.get<{ posts: Post[], max: number }>(apiPosts + query).pipe(map(data => {
      data.posts = data.posts.map(post => {
        if (post.thumbnailPath && post.thumbnailPath.startsWith('/images')) post.thumbnailPath = environment.host + post.thumbnailPath
        return post
      })
      return data
    }))
  }
  populatePosts(left: number = 0, items: number = 5, year?: number, month?: number): void {
    this.getPosts(left, items, year, month)
      .subscribe((res) => {
        this.posts = res.posts
        this.stream.next({ posts: [...this.posts], max: res.max })
      })
  }
  getArchives() {
    return this.http.get<Archives[]>(`${apiPosts}/archives`)
  }
  getStream() {
    return this.stream.asObservable()
  }
  addPost(title: string, thumbnail: File | null, thumbnailName: string | null, icon: string | null, markdown: string, description: string | null, labels: string[]): void {
    let data = new FormData()
    data.append('title', title)
    data.append('date', new Date().toISOString())
    if (thumbnail) data.append('thumbnail', thumbnail, thumbnailName)
    if (icon) data.append('icon', icon)
    data.append('markdown', markdown)
    if (description) data.append('description', description)
    data.append('labels', JSON.stringify(labels))
    this.http.post<{ message: string, post: Post, max: number }>(apiPosts, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message, action: 'Post', redirect: `blog/${res.post.slug}` } })
      this.posts.push(res.post)
      this.stream.next({ posts: [...this.posts], max: res.max })
      this.router.navigate(['/'], { state: { done: true } })
    }, (e) => {
      this.stream.error(e)
    })
  }
  getPost(slug: string) {
    return this.http.get<Post>(`${apiPosts}/${slug}`).pipe(map(post => {
      if (post.thumbnailPath && post.thumbnailPath.startsWith('/images')) post.thumbnailPath = environment.host + post.thumbnailPath
      return post
    }))
  }
  editPost(_id: string, title: string, slug: string, date: Date, thumbnail: File | string | null, thumbnailName: string | null, icon: string, markdown: string, description: string | null, labels: string[]): void {
    let data = new FormData();
    data.append('_id', _id)
    data.append('title', title)
    data.append('date', new Date(date).toISOString())
    if (typeof thumbnail === "object") {
      data.append('thumbnail', thumbnail, thumbnailName)
    } else if (thumbnail) {
      data.append('thumbnailPath', thumbnail)
    }
    data.append('icon', icon)
    data.append('markdown', markdown)
    if (description) data.append('description', description)
    data.append('modified', new Date().toISOString())
    data.append('labels', JSON.stringify(labels))
    this.http.put<{ message: string }>(`${apiPosts}/${_id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message, action: 'Post', redirect: `blog/${slug}` } })
      this.router.navigate(['/'], { state: { done: true } })
    }, (e) => {
      this.stream.error(e)
    })
  }
  delPost(id: string) {
    return this.http.delete<{ message: string }>(`${apiPosts}/${id}`)
  }
}
