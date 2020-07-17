import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Post } from "./post";
import { environment } from "../../environments/environment";
const apiPosts = environment.host + '/api/posts'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router) { }
  private posts: Post[] = []
  private stream = new Subject<{posts: Post[], max: number}>()

  populatePosts(left: number, items: number): void {
    const query = `?left=${left}&items=${items}`
    this.http.get<{ posts: Post[], max: number }>(apiPosts+query).subscribe((res) => {
      this.posts = res.posts
      this.stream.next({posts: [...this.posts], max: res.max})
    })
  }
  getStream() {
    return this.stream.asObservable()
  }
  addPost(title: string, thumbnail: File | string | null, thumbnailName: string | null, icon: string | null, markdown: string, description: string | null, labels: string[]): void {
    let data: FormData | Post;
    if (typeof thumbnail === "object") {
      data = new FormData()
      data.append('title', title)
      data.append('thumbnail', thumbnail, thumbnailName)
      data.append('icon', icon)
      data.append('markdown', markdown)
      data.append('description', description)
      data.append('labels', JSON.stringify(labels))
    } else {
      data = { _id: null, title, slug: null, date: new Date(), thumbnail, icon, markdown, description, modified: null, labels, reading: null }
    }
    this.http.post<{ message: string, post: Post, max: number}>(apiPosts, data).subscribe((res) => {
      console.log(res.message)
      this.posts.push(res.post)
      this.stream.next({posts: [...this.posts], max: res.max})
      this.router.navigate(['/'])
    })
  }
  getPost(slug: string) {
    return this.http.get<{post: Post}>(`${apiPosts}/${slug}`)
  }
  editPost(_id: string, title: string, slug: string, date: Date, thumbnail: string | null, thumbnailName: string | null, icon: string, markdown: string, description: string | null, labels: string[]): void {
    let data: FormData | Post;
    if (typeof thumbnail === "object") {
      data = new FormData()
      data.append('_id', _id)
      data.append('title', title)
      data.append('date', date.toISOString())
      data.append('thumbnail', thumbnail, thumbnailName)
      data.append('icon', icon)
      data.append('markdown', markdown)
      data.append('description', description)
      data.append('modified', new Date().toISOString())
      data.append('labels', JSON.stringify(labels))
    } else {
      data = { _id, title, slug, date, thumbnail, icon, markdown, description, modified: new Date(), labels, reading: null }
    }
    this.http.put<{ message: string }>(`${apiPosts}/${_id}`, data).subscribe((res) => {
      console.log(res.message)
      this.router.navigate(['/'])
    })
  }
  delPost(id: string) {
    return this.http.delete<{ message: string }>(`${apiPosts}/${id}`)
  }
}
